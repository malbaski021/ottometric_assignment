import { Locator, Page } from '@playwright/test';
import { BasePageElements } from './BasePageElements';

export class NavigationPageElements extends BasePageElements {
    
    //header
    readonly logo: Locator;
    readonly programDropdown: Locator;
    readonly programItem: Locator;

    //side bar
    readonly dashboardButton: Locator;
    readonly IngestionReportButton: Locator;
    readonly KPISenzorButton: Locator;
    readonly KPIFeatureButton: Locator;
    readonly NLQuery: Locator;

    readonly userAccountButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        super(page);

        this.logo = page.locator('div[data-testid="returnToLandingPage"]');
        this.programDropdown = page.locator('div[data-testid="program-picker-menu-select"]');
        this.programItem = page.locator('.MuiMenuItem-root');

        this.dashboardButton = page.locator('');
        this.IngestionReportButton = page.locator('');
        this.KPISenzorButton = page.locator('button:has-text("KPI Sensor")');
        this.KPIFeatureButton = page.locator('button:has-text("KPI Feature")');
        this.NLQuery = page.locator('');

        this.userAccountButton = page.locator('button:has-text("User account")');
        this.logoutButton = page.locator('div[data-testid="logout"]');

    }
}
