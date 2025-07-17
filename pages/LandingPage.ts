import { Page, test } from '@playwright/test';
import { LandingPageElements } from '../elements/LandingPageElements';

export class LandingPage extends LandingPageElements {

    constructor(page: Page) {
        super(page);
    }

    /**
     * Verifies that the Landing page is opened and checks the page title.
     */
    async verifyLandingPageIsOpen() {
        await test.step(`Verify that Landing page is opened`, async () => {
            await this.waitForElementToBeVisible(this.logo);
            await this.verifyPageTitle('Ottoviz');
        });
    }

    /**
     * Enters the provided email into the email input field.
     * @param {string} _email - Email address to enter.
     */
    async enterEmail(_email: string) {
        await test.step(`Entering email ${_email}`, async () => {
            await this.waitForElementToBeVisibleAndClickable(this.emailInput);
            await this.clearInput(this.emailInput)
            await this.fill(this.emailInput, _email);
        });
    }

    /**
     * Enters the provided password into the password input field.
     * @param {string} _password - Password to enter.
     */
    async enterPassword(_password: string) {
        await test.step(`Entering password ${_password}`, async () => {
            await this.waitForElementToBeVisibleAndClickable(this.passwordInput);
            await this.clearInput(this.passwordInput)
            await this.fill(this.passwordInput, _password);
        });
    }

    /**
     * Clicks the login button to submit the login form.
     */
    async clickLoginButton() {
        await test.step(`Clicking Login button`, async () => {
            await this.waitForElementToBeVisibleAndClickable(this.loginButton);
            await this.click(this.loginButton);
        });
    }

    /**
     * Verifies the error message for the email input field.
     * @param {string} _error - Expected error message text.
     */
    async verifyEmailErrorMessage(_error: string) {
        await test.step(`Verifyting error "${_error}" for email`, async () => {
            await this.waitForElementToBeVisible(this.emailErrorMessage);
            await this.elementContainsText(this.emailErrorMessage, _error);
            await this.verifyTextColor(this.emailErrorMessage, 'red');
        });
    }

    /**
     * Verifies the error message for the password input field.
     * @param {string} _error - Expected error message text.
     */
    async verifyPasswordErrorMessage(_error: string) {
        await test.step(`Verifyting error "${_error}" for password`, async () => {
            await this.waitForElementToBeVisible(this.passwordErrorMessage);
            await this.elementContainsText(this.passwordErrorMessage, _error);
            await this.verifyTextColor(this.passwordErrorMessage, 'red');
        });
    }

    /**
     * Logs in the user by entering username and password and clicking the login button.
     * @param {string} _username - Username or email to enter.
     * @param {string} _password - Password to enter.
     */
    async loginUser(_username: string, _password: string) {
        await test.step(`Loging in ${_username} to the system`, async () => {
            await this.enterEmail(_username);
            await this.enterPassword(_password);
            await this.clickLoginButton();
        });
    }
}
