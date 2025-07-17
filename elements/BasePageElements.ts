import { Page, Locator, expect, test } from '@playwright/test';

/**
 * This class is inherited from my previous projects
 * BasePageElements provides wrapper methods around Playwright's built-in functions for element interaction and assertions.
 * Only this class should use the 'expect' assertion method directly, allowing global control over behaviors such as timeouts and error handling.
 * By centralizing these wrappers, you can easily adjust global settings (e.g., timeouts) and ensure consistent test logic across all page objects.
 * Additional benefits include easier debugging, retry logic, and custom soft assertions.
 * Extend this class for all page objects to inherit these capabilities.
 */
export class BasePageElements {
    readonly page: Page;
    protected softAssert: SoftAssertHelper;

    private timeout: number;
    private waitTimeout: number;

    constructor(page: Page) {
        this.page = page;
        this.softAssert = new SoftAssertHelper();

        this.timeout = 10000;
        this.waitTimeout = 30000;
    }

    async retry<T>(fn: () => Promise<T>, retries = 2, delayMs = 1000): Promise<T> {
        let lastError;
        for (let i = 0; i <= retries; i++) {
            try {
                return await fn();
            } catch (e) {
                lastError = e;
                if (i === retries) throw e;
                await this.page.waitForTimeout(delayMs);
            }
        }
        throw lastError;
    }

    async waitForIdleStateOfSite() {
        let footerCount = 0;
        // await this.page.waitForLoadState('networkidle');
        await this.page.waitForLoadState('load');
        try { footerCount = await this.page.locator('footer').count(); } catch { }
        if (footerCount > 0) { await this.page.waitForSelector('footer', { timeout: 15000 }); }
        await this.page.waitForSelector('.loader, .spinner', { state: 'detached', timeout: 15000 });
        await this.page.waitForTimeout(300);
    }

    async goTo(_url: string) {
        await this.page.goto(_url, { waitUntil: 'networkidle' });
    }

    /**
     * Waits for the page URL to match the provided URL.
     * @param {string} _url - The URL or pattern to wait for.
     * @param {number} [timeout] - Optional timeout in ms.
     */
    async waitForURL(_url: string, timeout?: number) {
        await this.page.waitForURL(_url, { timeout: timeout ?? this.waitTimeout });
    }

    /**
     * Asserts that the current page URL contains the given string or pattern.
     * @param {string} _url - The substring or regex to check in the URL.
     * @param {number} [timeout] - Optional timeout in ms.
     */
    async urlContains(_url: string, timeout?: number) {
        await this.waitForIdleStateOfSite();
        await expect(this.page).toHaveURL(new RegExp(_url), { timeout: timeout ?? this.timeout });
    }

    async verifyPageTitle(_title: string) {
        await this.waitForIdleStateOfSite();
        expect(await this.page.title()).toBe(_title);
    }

    /**
     * Waits for the element to be visible.
     * @param {Locator} locator - The Playwright locator for the element.
     * @param {number} [timeout] - Optional timeout in ms.
     */
    async waitForElementToBeVisible(locator: Locator, timeout?: number) {
        await this.waitForIdleStateOfSite();
        await test.step(`Waiting for element ${locator} to be visible`, async () => {
            await expect(locator).toBeVisible({ timeout: timeout ?? this.waitTimeout });
        });
    }

    /**
     * Waits for the element to be visible and clickable.
     * @param {Locator} locator - The Playwright locator for the element.
     * @param {number} [timeout] - Optional timeout in ms.
     */
    async waitForElementToBeVisibleAndClickable(locator: Locator, timeout?: number) {
        await this.waitForIdleStateOfSite();
        await test.step(`Waiting for element ${locator} to be visible and clickable`, async () => {
            await expect(locator).toBeVisible({ timeout: timeout ?? this.waitTimeout });
            await expect(locator).toBeEnabled({ timeout: timeout ?? this.waitTimeout });
            await locator.click({ trial: true });
        });
    }

    /**
     * Waits for the nth element to be visible and clickable.
     * @param {Locator} locator - The Playwright locator for the element.
     * @param {number} _nth - The index of the element.
     * @param {number} [timeout] - Optional timeout in ms.
     */
    async waitForNthElementToBeVisibleAndClickable(locator: Locator, _nth: number, timeout?: number) {
        await this.waitForIdleStateOfSite();
        await test.step(`Waiting for element ${locator} to be visible and clickable`, async () => {
            await expect(locator.nth(_nth)).toBeVisible({ timeout: timeout ?? this.waitTimeout });
            await expect(locator.nth(_nth)).toBeEnabled({ timeout: timeout ?? this.waitTimeout });
            await locator.nth(_nth).click({ trial: true });
        });
    }

    /**
     * Waits for the first element to be visible.
     * @param {Locator} locator - The Playwright locator for the element.
     * @param {number} [timeout] - Optional timeout in ms.
     */
    async waitForFirstElementToBeVisible(locator: Locator, timeout?: number) {
        await this.waitForIdleStateOfSite();
        await test.step(`Waiting for first element ${locator} to be visible`, async () => {
            await expect(locator.first()).toBeVisible({ timeout: timeout ?? this.waitTimeout });
        });
    }

    /**
     * Scrolls the element into view and waits for it to be visible.
     * @param {Locator} locator - The Playwright locator for the element.
     * @param {number} [timeout] - Optional timeout in ms.
     */
    async scrollIntoView(locator: Locator, timeout?: number) {
        await this.waitForIdleStateOfSite();
        await test.step(`Scrolling element ${locator} into view`, async () => {
            await locator.scrollIntoViewIfNeeded({ timeout: timeout ?? this.timeout });
            await locator.waitFor({ state: 'visible', timeout: timeout ?? this.waitTimeout });
        });
    }

    /**
     * Waits for the nth element to be visible.
     * @param {Locator} locator - The Playwright locator for the element.
     * @param {number} _index - The index of the element.
     * @param {number} [timeout] - Optional timeout in ms.
     */
    async waitForNthElementToBeVisible(locator: Locator, _index: number, timeout?: number) {
        await this.waitForIdleStateOfSite();
        await test.step(`Waiting for first element ${locator} to be visible`, async () => {
            await expect(locator.nth(_index)).toBeVisible({ timeout: timeout ?? this.waitTimeout });
        });
    }

    /**
     * Waits for the element to be enabled.
     * @param {Locator} locator - The Playwright locator for the element.
     * @param {number} [timeout] - Optional timeout in ms.
     */
    async waitForElementToBeEnabled(locator: Locator, timeout?: number) {
        await this.waitForIdleStateOfSite();
        await test.step(`Waiting for element ${locator} to be enabled`, async () => {
            await expect(locator).toBeEnabled({ timeout: timeout ?? this.waitTimeout });
        });
    }

    /**
     * Waits for the element to be disabled.
     * @param {Locator} locator - The Playwright locator for the element.
     * @param {number} [timeout] - Optional timeout in ms.
     */
    async waitForElementToBeDisabled(locator: Locator, timeout?: number) {
        await this.waitForIdleStateOfSite();
        await test.step(`Waiting for element ${locator} to be disabled`, async () => {
            await expect(locator).toBeDisabled({ timeout: timeout ?? this.waitTimeout });
        });
    }

    /**
     * Waits for the element to be hidden.
     * @param {Locator} locator - The Playwright locator for the element.
     * @param {number} [timeout] - Optional timeout in ms.
     */
    async waitForElementToBeHidden(locator: Locator, timeout?: number) {
        await this.waitForIdleStateOfSite();
        await test.step(`Waiting for element ${locator} to be hidden`, async () => {
            await expect(locator).toBeHidden({ timeout: timeout ?? this.waitTimeout });
        });
    }

    /**
     * Waits for the element to be clickable.
     * @param {Locator} locator - The Playwright locator for the element.
     * @param {number} [timeout] - Optional timeout in ms.
     */
    async waitForElementToBeClickable(locator: Locator, timeout?: number) {
        await this.waitForIdleStateOfSite();
        await test.step(`Waiting for element ${locator} to be clickable`, async () => {
            await expect(locator).toBeEnabled({ timeout: timeout ?? this.waitTimeout });
            await locator.click({ trial: true });
        });
    }

    async hover(locator: Locator) {
        await this.waitForIdleStateOfSite();
        await test.step(`Hovering over element ${locator}`, async () => {
            await this.retry(() => locator.hover({ force: true, timeout: this.timeout }));
        });
    }

    async click(locator: Locator) {
        await this.waitForIdleStateOfSite();
        await test.step(`Clicking element ${locator}`, async () => {
            await this.retry(() => locator.click({ force: true, timeout: this.timeout }));
        });
    }

    async clickFirst(locator: Locator) {
        await this.waitForIdleStateOfSite();
        await test.step(`Clicking first element ${locator}`, async () => {
            await this.retry(() => locator.first().click({ force: true, timeout: this.timeout }));
        });
    }

    async clickNth(locator: Locator, _nth: number) {
        await this.waitForIdleStateOfSite();
        await test.step(`Clicking ${_nth} element ${locator}`, async () => {
            await this.retry(() => locator.nth(_nth).click({ force: true, timeout: this.timeout }));
        });
    }

    async fill(locator: Locator, text: string) {
        await this.waitForIdleStateOfSite();
        await test.step(`Filling element ${locator} with text ${text}`, async () => {
            await this.retry(() => locator.fill(text, { force: true, timeout: this.timeout }));
        });
    }

    async elementContainsText(locator: Locator, text: string) {
        await this.waitForIdleStateOfSite();
        await test.step(`Waiting for element ${locator} to contain text ${text}`, async () => {
            await expect(locator).toContainText(text, { ignoreCase: true, timeout: this.waitTimeout });
        });
    }

    async nthElementContainsText(locator: Locator, text: string, index: number) {
        await this.waitForIdleStateOfSite();
        await test.step(`Waiting for element ${locator} to contain text ${text}`, async () => {
            await expect(locator.nth(index)).toContainText(text, { timeout: this.waitTimeout });
        });
    }

    async nthElementsAtributeContains(locator: Locator, attribute: string, text: string, index: number) {
        await this.waitForIdleStateOfSite();
        await test.step(`Waiting for element ${locator} to contain text ${text}`, async () => {
            expect(await locator.nth(index).getAttribute(attribute)).toContain(text);
        });
    }

    async expectBooleanToBETrue(_value: boolean) {
        await this.waitForIdleStateOfSite();
        await test.step(`Expecting value to be TRUE`, async () => {
            expect(_value).toBe(true);
        });
    }

    async clearInput(locator: Locator) {
        await this.waitForIdleStateOfSite();
        await test.step(`Clearing input ${locator}`, async () => {
            await this.retry(() => locator.click({ force: true, timeout: this.timeout }));
            await this.retry(() => locator.fill('', { force: true, timeout: this.timeout }));
        });
    }

    async selectOptionFromDropdown(locator: Locator, option: string) {
        await this.waitForIdleStateOfSite();
        await test.step(`Selecting option ${option.toUpperCase()} from dropdown ${locator}`, async () => {
            await this.retry(() => locator.selectOption({ label: option }, { force: true, timeout: this.timeout }));
        });
    }

    async isElementVisible(locator: Locator): Promise<boolean> {
        await this.waitForIdleStateOfSite();
        let result = false;
        await test.step(`Verifying if element ${locator} is visible`, async () => {
            try {
                result = await locator.isVisible();
            } catch (error) {
                result = false;
            }
        });
        return result;
    }

    async verifyTextColor(_locator: Locator, _color: string) {
        await this.waitForIdleStateOfSite();
        await test.step(
            `Verifying text color of element ${_locator} is ${_color.toUpperCase()}`,
            async () => {
                const computedColor = await _locator.evaluate(el => getComputedStyle(el).color);

                let expectedColor = this.COLOR_MAP[_color.toLowerCase()] || _color;

                if (expectedColor.startsWith('#')) {
                    expectedColor = await this.hexToRgb(expectedColor);
                }

                expect(computedColor).toBe(expectedColor);
            }
        );
    }

    async verifyBackgroundColor(_locator: Locator, _color: string) {
        await this.waitForIdleStateOfSite();
        await test.step(
            `Verifying text color of element ${_locator} is ${_color.toUpperCase()}`,
            async () => {
                const computedColor = await _locator.evaluate(el => getComputedStyle(el).backgroundColor);

                let expectedColor = this.COLOR_MAP[_color.toLowerCase()] || _color;

                if (expectedColor.startsWith('#')) {
                    expectedColor = await this.hexToRgb(expectedColor);
                }

                expect(computedColor).toBe(expectedColor);
            }
        );
    }

    async hexToRgb(hex: string): Promise<string> {
        const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.replace('#', ''));
        if (!res) return hex;
        const [, r, g, b] = res;
        return `rgb(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)})`;
    }

    private COLOR_MAP: Record<string, string> = {
        red: "rgb(222, 55, 48)",
        green: "rgb(70, 211, 103)",
        blue: "rgb(0, 0, 255)",
        black: "rgb(0, 0, 0)",
        white: "rgb(255, 255, 255)",
        gray: "rgb(128, 128, 128)",
        yellow: "rgb(255, 255, 0)",
        purple: "rgb(232, 0, 231)"
    };

    async stringContainsText(_string: string, _substring: string) {
        await this.waitForIdleStateOfSite();
        await test.step(`Verifying string ${_string} contains ${_substring}`, async () => {
            expect(_string.toLowerCase()).toContain(_substring.toLowerCase());
        });
    }

    async verifyStringNotEqual(a: string, b: string, message = '') {
        await test.step(`Check that "${a}" !== "${b}". ${message}`, async () => {
            expect(a).not.toBe(b);
        });
    }

    async numberIsEqualTo(_a: number, _b: number) {
        await this.waitForIdleStateOfSite();
        await test.step(`Verifying that ${_a} is equal to ${_b}`, async () => {
            expect(_a).toBe(_b);
        });
    }

    async numberIsLessThan(_a: number, _b: number) {
        await this.waitForIdleStateOfSite();
        await test.step(`Verifying that ${_a} is less than ${_b}`, async () => {
            expect(_a).toBeLessThan(_b);
        });
    }

    async numberIsGreaterThan(_a: number, _b: number) {
        await this.waitForIdleStateOfSite();
        await test.step(`Verifying that ${_a} is less than ${_b}`, async () => {
            expect(_a).toBeGreaterThan(_b);
        });
    }

    async verifyNotEqual(a: number, b: number, message = '') {
        await test.step(`Check that ${a} !== ${b}. ${message}`, async () => {
            expect(a).not.toBe(b);
        });
    }

    async timeStampIsRecent(_string: string) {
        await this.waitForIdleStateOfSite();
        await test.step(`Verifying timestamp is RECENT`, async () => {
            expect(
                _string.includes('just now') || _string.includes('second')
            ).toBeTruthy();
        });
    }

    async waitForElementsClassDoesntContain(locator: Locator, className: string, timeout = this.timeout): Promise<void> {
        await this.waitForIdleStateOfSite();
        const start = Date.now();

        while (Date.now() - start < timeout) {
            const count = await locator.count();
            if (count === 0) throw new Error('Element not found for class check');

            let stillHasClass = false;
            for (let i = 0; i < count; i++) {
                const current = locator.nth(i);
                const classes = (await current.getAttribute('class'))?.split(' ') || [];
                if (classes.includes(className)) {
                    stillHasClass = true;
                    break;
                }
            }
            if (!stillHasClass) return;
            await this.page.waitForTimeout(200);
        }

        throw new Error(`Element(s) still contain class "${className}" after ${timeout}ms`);
    }

    async getFirstVisible(locator: Locator): Promise<Locator> {
        await this.waitForIdleStateOfSite();
        const count = await locator.count();
        for (let i = 0; i < count; i++) {
            const current = locator.nth(i);
            if (await current.isVisible()) {
                return current;
            }
        }
        throw new Error('No visible element found for the provided locator.');
    }
}


/**
 * SoftAssertHelper provides soft assertion logic for Playwright tests.
 * Instead of failing immediately, errors are collected and thrown together at the end of the test.
 * Useful for validating multiple conditions in a single test run.
 */
export class SoftAssertHelper {
  private errors: string[] = [];

  /**
   * Softly asserts that expected and actual numbers are equal, otherwise collects an error message.
   * @param {number} _expected - The expected value.
   * @param {number} _actual - The actual value.
   * @param {string} _columnName - The name of the column or context for the assertion.
   */
  softExpectEqual(_expected: number, _actual: number, _columnName: string) {
    if (_actual !== _expected) {
        const error = `${_columnName}: Expected average: ${_expected}, but got ${_actual}`;
        this.errors.push(error);
    }
  }

  /**
   * Throws an error if any soft assertions failed, listing all collected errors.
   * Optionally logs errors to the console before throwing.
   * @param {boolean} [logErrors=false] - If true, logs errors to the console before throwing.
   */
  assertAll(logErrors: boolean = false) {
    if (this.errors.length > 0) {
      const all = this.errors.join('\n');
      if (logErrors) {
        // eslint-disable-next-line no-console
        console.error('Soft Assertion Failures:', all);
      }
      this.errors = [];
      throw new Error(`\nSoft Assertion Failures:\n${all}`);
    }
  }
}