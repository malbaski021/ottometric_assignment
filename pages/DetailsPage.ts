//DetailsPage
import { Page, test, Locator } from '@playwright/test';
import { DetailsPageElements } from '../elements/DetailsPageElements';

export class DetailsPage extends DetailsPageElements {

    /**
     * Constructor for DetailsPage class.
     * @param {Page} detailsPage - The Playwright Page object representing the new tab/page opened for details.
     */
    constructor(private readonly detailsPage: Page) {
        super(detailsPage);
    }

    /**
     * Verifies that the Details page is opened and optionally checks the page url.
     * @param {string} [_title] - Optional title to verify url of the page.
     */
    async verifyDetailsPageIsOpened(_title?: string) {
        await test.step(`Verify that Details page is opened`, async () => {
            const currentUrl = this.detailsPage.url();
            await this.stringContainsText(currentUrl, '/kpi-details');
            if (_title) {
                await this.stringContainsText(currentUrl, `/${_title}`);
            }
        });
    }

    /**
     * Counts the total number of events from the timeline for a specific event name.
     * @param {string} _eventName - The name of the event to count in the timeline.
     * @returns {Promise<number>} - The total count of events found in the timeline.
     */
    async countEventsFromTimeLine(_eventName: string): Promise<number> {
        let itemsCount = 0;
        await test.step(`Counting events for ${_eventName}`, async () => {
            await this.waitForElementToBeVisible(this.timelineframe);
            const timeLineVisible = this.timelineframe.locator('.timeline');

            if (!timeLineVisible) {
                const previewIcon = this.timelineframe.locator('button[data-testid="viewportMenu-3"] svg[data-testid="PreviewIcon"]')
                await this.click(previewIcon);
                const timelineIcon = this.page.locator('li[data-testid="viewportMenuItem-Timeline-3"]')
                await this.click(timelineIcon);
            }

            let position = await this.getRowIndexByEventName(_eventName, 'left');
            const timelineEvents = this.timelineframe.locator('.vis-timeline .vis-center .vis-foreground .vis-group').nth(position);

            const items = await timelineEvents.locator('.vis-item').all();
            for (let i = 0; i < items.length; i++) {
                const itemsClass = await items[i].getAttribute('class');
                if (itemsClass?.includes(`timeline-item-with-content`)) {
                    const itemWithContent = await items[i].locator('.vis-item-content').innerText();
                    itemsCount += Number(itemWithContent);
                } else {
                    itemsCount++;
                }
            }
        });
        return itemsCount;
    }

    /**
     * Finds the row index of a specific event by its name in the timeline table.
     * @param {string} _eventName - The name of the event to find in the timeline.
     * @param {string} [_tablePosition] - Optional table position (e.g., 'left', 'center'). Defaults to 'left'.
     * @returns {Promise<number>} - The index position of the event row in the timeline table.
     */
    async getRowIndexByEventName(_eventName: string, _tablePosition?: string,): Promise<number> {
        let position = 0;
        let table: Locator;
        if (_tablePosition) {
            table = this.getTimelineFrameTableByPosition(_tablePosition);
        } else {
            table = this.getTimelineFrameTableByPosition('left');
        }

        const events = await table.locator('.vis-label').all();

        for (let i = 0; i < events.length; i++) {
            const eventId = await events[i].locator('.vis-inner').getAttribute('data-testid');
            if (eventId?.includes(`|${_eventName}`)) {
                position = i;
                break;
            }
        }
        return position;
    }

}

