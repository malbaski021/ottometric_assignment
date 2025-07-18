import { Page, test, Locator } from '@playwright/test';
import { KPIFeaturePageElements } from '../elements/KPIFeaturePageElements';

export class KPIFeaturePage extends KPIFeaturePageElements {

    constructor(page: Page) {
        super(page);
    }

    /**
     * Verifies that the KPI Feature page is opened and optionally checks the page title.
     * @param {string} [_title] - Optional title to verify on the page.
     */
    async verifyKPIFeaturePageIsOpened(_title?: string) {
        await test.step(`Verify that KPI Feature page is opened`, async () => {
            await this.waitForElementToBeVisible(this.title);
            await this.urlContains('/kpi-system');
            if (_title) {
                await this.elementContainsText(this.title, _title);
                await this.urlContains(`/${_title}`);
            }
        });
    }

    /**
     * Sorts the table values by the specified column and option.
     * @param {string} _columnName - Name of the main column header.
     * @param {string} _option - Name of the subheader option to sort by.
     */
    async sortTableValuesBy(_columnName: string, _option: string) {
        await test.step(`Sorting values by ${_columnName} >> ${_option}`, async () => {
            const headers = this.getTableByPositionAndType('center', 'thead');
            const index = await this.getColumnIndexByHeaderAndSubheader(_columnName, _option);
            const subHeader = headers.nth(1).locator('th').nth(index);

            await this.click(subHeader.locator('span input[type="radio"]'));
            await this.click(subHeader.locator('span button'));
            await this.page.waitForTimeout(2000);
        });
    }

    /**
     * Verifies that the table is sorted by the specified column and option.
     * @param {string} _columnName - Name of the main column header.
     * @param {string} _option - Name of the subheader option to check sorting for.
     */
    async verifyTableIsSorted(_columnName: string, _option: string) {
        await test.step(`Sorting values by ${_columnName} >> ${_option}`, async () => {
            const index = await this.getColumnIndexByHeaderAndSubheader(_columnName, _option);
            const rows = this.getTableByPositionAndType('center', 'tbody');
            
            let sortedValues: number[] = [];
            const rowCount = await rows.count();

            for (let i = 0; i < rowCount; i++) {
                const cellValue = await rows.nth(i).locator('td').nth(index).allTextContents();
                const numericValue = parseFloat(cellValue[0].replace('%', ''));
                sortedValues.push(numericValue);
            }
            
            let sorted: boolean;

            if(_option === 'FALSE'){
                sorted = sortedValues.every((val, i, arr) => i === 0 || arr[i - 1] >= val);
            } else {
                sorted = sortedValues.every((val, i, arr) => i === 0 || arr[i - 1] <= val);
            }
            await this.expectBooleanToBETrue(sorted);
        });
    }

    /**
     * Collects the number of events from the first N DTIDs in the table.
     * @param {number} _amount - Number of DTIDs to process.
     * @returns {Promise<number>} - Total number of events found.
     */
    async collectEventsFromFirstNthDTIDs(_amount: number): Promise<number> {
        let eventCount = 0;
        await test.step(`Collecting events from first ${_amount} DTIDs`, async () => {
            await this.waitForIdleStateOfSite();
            const indexDTID = await this.getColumnIndexByHeaderAndSubheader('Drive Trial Identification', 'DTID', 'left', 'thead');
            const headers = await this.getTableByPositionAndType('left', 'tbody').all();
            
            if(_amount > headers.length){
                _amount = headers.length;
            }

            let dtidCount = 0;
            for (let i = 0; i < _amount; i++){
                const rowId = await headers[i].locator('td').nth(indexDTID).innerText();
                const dtid = headers[i].locator('td').first().locator('button[type="button"]');
                await this.click(dtid);
                await this.waitForIdleStateOfSite();
                
                const events = await this.getTableByPositionAndType('left', 'tbody').all();
                for(let event of events){
                    const _class = await event.getAttribute('class');
                    if(_class?.includes(`row-${rowId}.`)) {
                        eventCount++;
                        dtidCount++;
                    }
                }
                await this.click(dtid);
                await this.waitForIdleStateOfSite();
                console.log(`Count of events for DTID id: ${rowId} is ${dtidCount}`);
                dtidCount = 0;
            }
        });
        return eventCount;
    }


    //Ova metoda ima duplikat u KPISensorPage, ostavio sam tako jer nisam pregledao ceo sajt
    //i ne znam prirodu svih tabela. Pod predpostavkom da su sve tabele na svim stranicam identicne
    //Ova metoda bi mogla da se prebaci u /heplers pa da bude jedna za sve tabele i da nema duplikata u kodu
    /**
     * Finds the column index by main header and subheader names.
     * @param {string} _columnName - Name of the main column header.
     * @param {string} _option - Name of the subheader option.
     * @param {string} [_tablePosition] - Optional table position (e.g., 'left', 'center').
     * @param {string} [_tabelType] - Optional table type (e.g., 'thead', 'tbody').
     * @returns {Promise<number>} - Index of the column in the table.
     */
    async getColumnIndexByHeaderAndSubheader(_columnName: string, _option: string, _tablePosition?: string, _tabelType?: string): Promise<number> {
        let headers: Locator;
        if(_tablePosition && _tabelType) {
            headers = this.getTableByPositionAndType(_tablePosition, _tabelType);
        } else {
            headers = this.getTableByPositionAndType('center', 'thead');
        }

        const mainHeadersNames = await headers.nth(0).locator('th').allTextContents();
        const mainHeadersSizes = await headers.nth(0).locator('th').all();
        let sizes: number[] = [];
        
        for(let size of mainHeadersSizes){
            const span = await size.getAttribute('colspan');
            sizes.push(Number(span));
        }
        
        const subHeaders = await headers.nth(1).locator('th').allTextContents();

        const columnMap: { name: string; sub: { name: string; index: number }[]; }[] = [];

        let _index = 0;
        for (let i = 0; i < mainHeadersNames.length; i++) {
            const _sub: {name: string; index: number }[] = [];
            
            for (let j = 0; j < sizes[i]; j++) {
                _sub.push({ name: subHeaders[_index], index: _index });
                _index++;
            }
            columnMap.push({ name: mainHeadersNames[i], sub: _sub });
        }

        let _position = 0;

        for (let _map of columnMap) {
            if (_map.name === _columnName) {
                for (let _sub of _map.sub) {
                    if (_sub.name === _option) {
                        _position = _sub.index;
                        break;
                    }
                }
            }
        }
        return _position;
    }
}

