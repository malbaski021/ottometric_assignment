import { Page, test } from '@playwright/test';
import { getRuntimeConfig, getEnv, Env } from '../helpers/envConfig';
import fs from 'fs';

export class BasePage {
  readonly page: Page;
  readonly url: string;
  protected env: Env;

  /**
   * Constructor for BasePage class.
   * @param {Page} page - The Playwright Page object.
   */
  constructor(page: Page) {
    this.page = page;
    this.url = getRuntimeConfig().url;
    this.env = getEnv();
  }

  /**
   * Opens the browser and navigates to the specified URL with basic setup.
   * @param {string} _url - The URL to navigate to.
   * @param {number} _timeout - Optional, when longer time is needed for tests, default is 3 minutes
   */
  async openBrowser(_url: string, _timeout?: number) {
    await test.step(`Opening browser with ${this.url}`, async () => {
      if(_timeout){
        test.setTimeout(_timeout);
      } else {
        test.setTimeout(180000);
      }
      await this.page.context().clearCookies();
      await this.page.setViewportSize({ width: 1920, height: 1152 });
      await this.page.goto(this.url);
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(2000);
    });
  }

  /**
   * Reads a property value from the properties.txt file.
   * @param {string} _key - The property key to look up.
   * @returns {Promise<string>} - The property value.
   */
  async getPropertyValue(_key: string): Promise<string> {
    const path = 'properties.txt';
    const content = await fs.promises.readFile(path, 'utf8');
    const regex = new RegExp(`^${_key}=(\\S+)`, 'm');
    const match = content.match(regex);
    if (!match) throw new Error(`Parametar "${_key}" not found in properties file`);
        return match[1];
    }
}
