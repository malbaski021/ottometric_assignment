import { Locator, Page } from '@playwright/test';
import { BasePageElements } from './BasePageElements';

export class LandingPageElements extends BasePageElements {

    readonly logo: Locator;
    
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    readonly emailErrorMessage: Locator;
    readonly passwordErrorMessage: Locator;
    
    constructor(page: Page) {
        super(page);

        this.logo = page.locator('.login-logo');
        
        this.emailInput = page.locator('#outlined-basic');
        this.passwordInput = page.locator('#outlined-adornment-password');
        this.loginButton = page.locator('button[type="submit"]');

        //error messages
        this.emailErrorMessage = page.locator('.MuiStack-root').locator('.MuiFormControl-root').nth(1).locator('p');
        this.passwordErrorMessage = page.locator('.MuiStack-root').locator('.MuiFormControl-root').nth(2).locator('p');
    }
}
