import { Page, test, Locator } from '@playwright/test';
import { KPISensorPageElements } from '../elements/KPISensorPageElements';

export class KPISensorPage extends KPISensorPageElements {

    constructor(page: Page) {
        super(page);
    }

    /**
     * Verifies that the KPI Sensor page is opened and optionally checks the page title.
     * @param {string} [_title] - Optional title to verify on the page.
     */
    async verifyKPISensorPageIsOpened(_title?: string) {
        await test.step(`Verify that KPI Sensor page is opened`, async () => {
            await this.waitForElementToBeVisible(this.title);
            await this.urlContains('/kpi-sensor');
            if (_title) {
                await this.elementContainsText(this.title, _title);
                await this.urlContains(`/${_title}`);
            }
        });
    }

    /**
     * Verifies that the sum of all values in a column matches the average value in the table footer.
     * @param {string} _columnName - Name of the main column header.
     * @param {string} _option - Name of the subheader option.
     */
    async verifyTotalSumOfColumn(_columnName: string, _option: string) {
        await test.step(`Verify SUM of ${_columnName} for ${_option} side.`, async () => {
            const index = await this.getColumnIndexByHeaderAndSubheader(_columnName, _option);
            const rows = this.getTableByPositionAndType('center', 'tbody');
            const average = await this.getTableByPositionAndType('center', 'tfoot').locator('td').nth(index).allTextContents();
            
            const rowCount = await rows.count();

            let sum = 0;
            for (let i = 0; i < rowCount; i++) {
                const cellValue = await rows.nth(i).locator('td').nth(index).allTextContents();
                const numericValue = parseFloat(cellValue[0].replace('%', ''));
                sum += numericValue;
            }
            const averageNumericValue = parseFloat(average[0].replace('%', ''));
            this.softAssert.softExpectEqual(parseFloat((sum / rowCount).toFixed(1)), averageNumericValue, `${_columnName} >> ${_option}`);
        });
    }
    
    /**
     * Executes all soft assertions collected during the test.
     */
    async finalAssert() {
        await test.step(`FINAL ASSERTION`, async () => {
            this.softAssert.assertAll();
        });
    }

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

