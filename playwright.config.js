// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

/*
  to run a test with a specific browser/project and config, use the following command:
  npx playwright test tests/POMTest.spec.js --config playwright.config.js --project=Safari

  tests/{test}.spec.js = can be any test file  
  --config = can be any playwright config file 
  --project = can be any name you've specified (optional: if removed will run with all browsers inside projects[])
*/
export default defineConfig({
  testDir: './tests',
  retries: 1, // specifies how many times a failed test can be retried
  workers: 1, // specifies how many tests can be run in parallel
  timeout: 40000, //in ms (40secs) also optional. 30secs default
  expect: {
    timeout: 5000 // timeout for assertions 
  },

  /*
    Using allure instead of html for test reports:
    install allure first by: 
    npm install -D allure-playwright
    Use command: 
    npx playwright test --grep smoke --reporter=line,allure-playwright (no need for --grep smoke)

    Generate allure reports using:
    install allure report first by:
    npm install -g allure-commandline
    Use command:
    allure generate ./allure-results --clean (--clean is for the report of recent testing)

    Open reports using:
    allure open ./allure-report
  */
  reporter: 'html',
  projects:[
    {
      name: 'Chrome',
      use:{
        browserName: "chromium",
        headless: true,
        screenshot: 'on', // 'off' for no ss, 'on' for every test done, 'only-on-failure' ss for fail test cases only 
        trace: 'retain-on-failure',
        // viewport:{width:720, height:720},
        //ignoreHTTPSErrors:true, // in case of SSL Errors, this can bypass it
        //permissions:['geolocation'], // in case of sites asking permissions, this will auto allow perms stated here
        video: 'retain-on-failure' // 'on' each test has video, 'off' no vids, 'retain-on-failure' vids only from fail, 'on-first-retry' vids only when retrying a test for the first time
      }
    },
    {
      name: 'Safari',
      use:{
        browserName: "webkit",
        headless: true,
        screenshot: 'off',
        trace: 'retain-on-failure', //'off' for every test case to not have trace,'on' for every test case to have trace, 'retain-on-failure' trace only from fail, 'on-first-retry' trace only when retrying a test for the first time
        //...devices['iPhone 12 Pro'],
      }
    },
  ]
});

// module.exports = config 









/*

Original

*/
// export default defineConfig({
//   testDir: './tests',
//   /* Run tests in files in parallel */
//   fullyParallel: true,
//   /* Fail the build on CI if you accidentally left test.only in the source code. */
//   forbidOnly: !!process.env.CI,
//   /* Retry on CI only */
//   retries: process.env.CI ? 2 : 0,
//   /* Opt out of parallel tests on CI. */
//   workers: process.env.CI ? 1 : undefined,
//   /* Reporter to use. See https://playwright.dev/docs/test-reporters */
//   reporter: 'html',
//   /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
//   use: {
//     /* Base URL to use in actions like `await page.goto('/')`. */
//     // baseURL: 'http://localhost:3000',

//     /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
//     trace: 'on-first-retry',
//   },

//   /* Configure projects for major browsers */
//   projects: [
//     {
//       name: 'chromium',
//       use: { ...devices['Desktop Chrome'] },
//     },

//     {
//       name: 'firefox',
//       use: { ...devices['Desktop Firefox'] },
//     },

//     {
//       name: 'webkit',
//       use: { ...devices['Desktop Safari'] },
//     },

//     /* Test against mobile viewports. */
//     // {
//     //   name: 'Mobile Chrome',
//     //   use: { ...devices['Pixel 5'] },
//     // },
//     // {
//     //   name: 'Mobile Safari',
//     //   use: { ...devices['iPhone 12'] },
//     // },

//     /* Test against branded browsers. */
//     // {
//     //   name: 'Microsoft Edge',
//     //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
//     // },
//     // {
//     //   name: 'Google Chrome',
//     //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
//     // },
//   ],

//   /* Run your local dev server before starting the tests */
//   // webServer: {
//   //   command: 'npm run start',
//   //   url: 'http://localhost:3000',
//   //   reuseExistingServer: !process.env.CI,
//   // },
// });

