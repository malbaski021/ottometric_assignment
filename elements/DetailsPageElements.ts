import { Locator, Page } from '@playwright/test';
import { BasePageElements } from './BasePageElements';

export class DetailsPageElements extends BasePageElements {

    readonly frontCameraframe: Locator;
    readonly mapframe: Locator;
    readonly timelineframe: Locator;

    constructor(page: Page) {
        super(page);

        this.frontCameraframe = page.locator('.dp-container').locator('div').nth(1).locator('div').nth(0);
        this.mapframe = page.locator('.dp-container').locator('div').nth(1).locator('div').nth(1);
        this.timelineframe = page.locator('.dp-container > div.MuiGrid-container > div').nth(2);
    }

    getTimelineFrameTableByPosition(_tablePosition: string): Locator {
        return this.timelineframe.locator(`.vis-timeline .vis-${_tablePosition}`);
    }
}