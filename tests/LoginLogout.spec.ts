import { test, prefixed } from '../fixtures/fixtures';

let username: string;
let password: string; 

test.beforeEach(async ({ basePage }) => {
    const url = await basePage.getPropertyValue('url');
    username = await basePage.getPropertyValue('username');
    password = await basePage.getPropertyValue('password');
    await basePage.openBrowser(url);
})

test(prefixed('@smoke Verify that user can login and logout'), async ({ landingPage, navigationPage }) => {
    await landingPage.verifyLandingPageIsOpen();
    await landingPage.enterEmail(username);
    await landingPage.enterPassword(password);
    await landingPage.clickLoginButton();
    await navigationPage.verifyUserIsLogedIn();
    await navigationPage.clickUserAccountButton();
    await navigationPage.clickLogoutButton();
    await landingPage.verifyLandingPageIsOpen();
})

test(prefixed('@smoke Verify that user cant login without email'), async ({ landingPage }) => {
    await landingPage.verifyLandingPageIsOpen();
    await landingPage.enterEmail('');
    await landingPage.enterPassword(password);
    await landingPage.clickLoginButton();
    await landingPage.verifyEmailErrorMessage('Email is required, please try again');
})

test(prefixed('@smoke Verify that user cant login without password'), async ({ landingPage }) => {
    await landingPage.verifyLandingPageIsOpen();
    await landingPage.enterEmail(username);
    await landingPage.enterPassword('');
    await landingPage.clickLoginButton();
    await landingPage.verifyPasswordErrorMessage('Password is required, please try again');
})