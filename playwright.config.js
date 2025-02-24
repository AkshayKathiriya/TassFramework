import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });


const config = {
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  //timeout: 600000,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  //forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  timeout: 70000,
  expect: { timeout: 10000 },
  /* Opt out of parallel tests on CI. */
  workers: 2 ,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'], // Use the list reporter for terminal output
    ['json', { outputFile: 'test-results.json' }] // Generate a JSON report
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    screenshot : "only-on-failure",
    trace : 'retain-on-failure',//off,on
    video: 'retain-on-failure'

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',

      use: { 
        browserName: 'chromium'
      },
      testData: ['./data/testing/md-testing.json', './data/testing/zam-testing.json', './data/testing/zidship-testing.json']
      
    },
  

  ],

 
};
module.exports = config;