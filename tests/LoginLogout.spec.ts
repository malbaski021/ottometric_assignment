import { test, prefixed } from '../fixtures/fixtures';
import { loginTestData } from '../testData';

// NOTE: This file uses centralized database approach for test names
// Test names are pulled from loginTestData.testScenarios object
// This is an example of how to centralize test names, not just test data

let username: string;
let password: string; 

test.beforeEach(async ({ basePage }) => {
    const url = await basePage.getPropertyValue('url');
    username = await basePage.getPropertyValue('username');
    password = await basePage.getPropertyValue('password');
    await basePage.openBrowser(url);
})

test(prefixed(loginTestData.testScenarios.loginLogout), async ({ landingPage, navigationPage }) => {
    await landingPage.verifyLandingPageIsOpen();
    await landingPage.enterEmail(username);
    await landingPage.enterPassword(password);
    await landingPage.clickLoginButton();
    await navigationPage.verifyUserIsLogedIn();
    await navigationPage.clickUserAccountButton();
    await navigationPage.clickLogoutButton();
    await landingPage.verifyLandingPageIsOpen();
})

test(prefixed(loginTestData.testScenarios.loginWithoutEmail), async ({ landingPage }) => {
    await landingPage.verifyLandingPageIsOpen();
    await landingPage.enterEmail('');
    await landingPage.enterPassword(password);
    await landingPage.clickLoginButton();
    await landingPage.verifyEmailErrorMessage(loginTestData.errorMessages.emailRequired);
})

test(prefixed(loginTestData.testScenarios.loginWithoutPassword), async ({ landingPage }) => {
    await landingPage.verifyLandingPageIsOpen();
    await landingPage.enterEmail(username);
    await landingPage.enterPassword('');
    await landingPage.clickLoginButton();
    await landingPage.verifyPasswordErrorMessage(loginTestData.errorMessages.passwordRequired);
})