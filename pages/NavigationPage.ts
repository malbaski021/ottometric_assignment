import { Page, test } from '@playwright/test';
import { NavigationPageElements } from '../elements/NavigationPageElements';

export class NavigationPage extends NavigationPageElements {

    /**
     * Constructor for NavigationPage class.
     * @param {Page} page - The Playwright Page object.
     */
    constructor(page: Page) {
        super(page);
    }

    /**
     * Verifies that the user is successfully logged in by checking logo visibility and URL.
     */
    async verifyUserIsLogedIn() {
        await test.step(`Verifying that user successfully loged in`, async () => {
            await this.waitForElementToBeVisibleAndClickable(this.logo);
            await this.urlContains('/reporting/ingestion-report');
        });
    }

    /**
     * Clicks the program dropdown to show available programs.
     */
    async clickProgramDropdown() {
        await test.step(`Clicking program dropdown`, async () => {
            await this.waitForElementToBeVisibleAndClickable(this.programDropdown);
            await this.click(this.programDropdown);
        });
    }

    /**
     * Chooses a program from the dropdown by its name.
     * @param {string} _option - Name of the program to select.
     */
    async choseProgram(_option: string) {
        await test.step(`Chosing program ${_option}`, async () => {
            await this.waitForElementToBeVisible(this.programDropdown);
            let found = false;
            const items = await this.programItem.all();
            for(let it of items){
                const option = await it.innerText();
                if (option.includes(_option)){
                    this.click(it);
                    found = true;
                    break;
                }
            }
            if(!found){
                throw new Error(`No program "${_option}" found or maybe you should check spelling.`);
            }
        });
    }

    /**
     * Verifies that the selected program page is opened by checking logo and URL.
     * @param {string} _option - Name of the program to verify.
     */
    async verifyProgramIsChosen(_option: string) {
        await test.step(`Verifying program ${_option} page is opened`, async () => {
            await this.waitForElementToBeVisibleAndClickable(this.logo);
            const parts = _option.split(" ");
            const lastPart = parts[parts.length - 1];
            await this.urlContains(lastPart);
        });
    }

    /**
     * Clicks the KPI sensor button to navigate to KPI sensor page.
     */
    async clickKPIsensor() {
        await test.step(`Clicking KPI sensor`, async () => {
            await this.waitForElementToBeVisibleAndClickable(this.KPISenzorButton);
            await this.click(this.KPISenzorButton);
        });
    }

    /**
     * Clicks the KPI feature button to navigate to KPI feature page.
     */
    async clickKPIfeature() {
        await test.step(`Clicking KPI feature`, async () => {
            await this.waitForElementToBeVisibleAndClickable(this.KPIFeatureButton);
            await this.click(this.KPIFeatureButton);
        });
    }

    /**
     * Clicks the KPI sensor option and optionally a sub-option.
     * @param {string} _option - Main option to select.
     * @param {string} [_subOption] - Optional sub-option to select.
     */
    async clickKPIsensorOption(_option: string, _subOption?: string) {
        await test.step(`Clicking option ${_option}${_subOption ? ' sub option ' + _subOption : ''}`, async () => {
            const option = this.page.locator(`button:has-text("${_option}")`)
            await this.waitForElementToBeVisibleAndClickable(option);
            await this.click(option);

            if(_subOption){
                const subOption = this.page.locator(`button:has-text("${_subOption}")`);
                await this.waitForElementToBeVisibleAndClickable(subOption);
                await this.click(subOption);
            }
        });
    }

    /**
     * Clicks the KPI feature option and optionally a sub-option.
     * @param {string} _option - Main option to select.
     * @param {string} [_subOption] - Optional sub-option to select.
     */
    async clickKPIfeatureOption(_option: string, _subOption?: string) {
        await test.step(`Clicking option ${_option}${_subOption ? ' sub option ' + _subOption : ''}`, async () => {
            const option = this.page.locator(`button:has-text("${_option}")`)
            await this.waitForElementToBeVisibleAndClickable(option);
            await this.click(option);

            if(_subOption){
                const subOption = this.page.locator(`button:has-text("${_subOption}")`);
                await this.waitForElementToBeVisibleAndClickable(subOption);
                await this.click(subOption);
            }
        });
    }

    /**
     * Clicks the user account button to open user account options.
     */
    async clickUserAccountButton() {
        await test.step(`Clicking user account button`, async () => {
            await this.waitForElementToBeVisibleAndClickable(this.userAccountButton);
            await this.click(this.userAccountButton);
        });
    }

    /**
     * Clicks the logout button to log out the user.
     */
    async clickLogoutButton() {
        await test.step(`Clicking logout button`, async () => {
            await this.waitForElementToBeVisibleAndClickable(this.logoutButton);
            await this.click(this.logoutButton);
        });
    }
}