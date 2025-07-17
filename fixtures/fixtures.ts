import {test as base} from '@playwright/test';
import { getEnv, getUrl} from '../helpers/envConfig';
import { BasePage } from '../pages/BasePage';
import { LandingPage } from '../pages/LandingPage';
import { NavigationPage } from '../pages/NavigationPage';
import { KPISensorPage } from '../pages/KPISensorPage';
import { KPIFeaturePage } from '../pages/KPIFeaturePage';

type MyFixtures = {
    basePage: BasePage; 
    landingPage: LandingPage; 
    navigationPage: NavigationPage; 
    kPISensorPage: KPISensorPage;
    kPIFeaturePage: KPIFeaturePage;
};

export const test = base.extend<MyFixtures>({
    basePage: async ({page}, use) => {
        await use(new BasePage(page));
    },
    landingPage: async ({page}, use) => {
        await use(new LandingPage(page));
    },
    navigationPage: async ({page}, use) => {
        await use(new NavigationPage(page));
    },
    kPISensorPage: async ({page}, use) => {
        await use(new KPISensorPage(page));
    },
    kPIFeaturePage: async ({page}, use) => {
        await use(new KPIFeaturePage(page));
    },
    
});

export function prefixed(title: string): string {
  const env = getEnv();
  const url = getUrl();

  const parts = [env, url].filter(Boolean);

  const prefix = parts.join('.'); 
  return `[${prefix}] ${title}`;
}

export { expect } from '@playwright/test';