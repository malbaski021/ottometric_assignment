import { Locator, Page } from '@playwright/test';
import { BasePageElements } from './BasePageElements';

export class KPIFeaturePageElements extends BasePageElements {

    readonly title: Locator;

    constructor(page: Page) {
        super(page);

        this.title = page.locator('h6');
    }

    getTableByPositionAndType(_tablePosition: string, _tableType: string): Locator {
        return this.page.locator(`table[position="${_tablePosition.toLowerCase()}"] ${_tableType.toLowerCase()} tr`);
    }
}