import { defineConfig, devices  } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // globalSetup: require.resolve('./global-setup'), // initial setup before running tests
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 3, // undefined  << for max number of workers
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
      ['list'],
      ['html', { outputFolder: 'playwright-report' }]  //   , open: 'never'
    ],
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    navigationTimeout: 15000,
    
    headless: true,
    launchOptions: {
      // headless: false,
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {  
        ...devices['Desktop Chrome'],
        launchOptions: {
          slowMo: 300, // a 1000 milliseconds pause before each operation. Useful for slow systems.
        },       
      },
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'], 
        launchOptions: {
          slowMo: 300, 
        },       
      },
    },

    // {
    //   name: 'webkit',
    //   use: { 
    //     ...devices['Desktop Safari'], 
    //     launchOptions: {
    //       slowMo: 300, 
    //     },       
    //   },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});