import { Locator, Page } from '@playwright/test';
import { BasePageElements } from './BasePageElements';

export class KPIFeaturePageElements extends BasePageElements {

    readonly title: Locator;
    readonly seeDetailButton: Locator;

    constructor(page: Page) {
        super(page);

        this.title = page.locator('h6');
        this.seeDetailButton = page.locator(`button[data-testid="sendToDetails"]`);
    }

    getTableByPositionAndType(_tablePosition: string, _tableType: string): Locator {
        return this.page.locator(`table[position="${_tablePosition.toLowerCase()}"] ${_tableType.toLowerCase()} tr`);
    }
}