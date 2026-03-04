const {test, expect} = require('@playwright/test');


//test.describe.configure({mode: 'parallel'}); // run all of the tests in parallel
//test.describe.configure({mode: 'serial'}) // skips all tests when one test fails
/*
    test types:
    test.only - only test this scenario and skip others
    test.skip - skip specific test

    title configs:
    test('@[tag] [title]', async ({})=> {}) 
    to run: npx playwright test --grep @[tag] (replace [tag] with anything)
    NOTE: @[tag] only works on Mac, in windows it doesn't need @
    example: @smoke in here and in UIBasicstest.spec.js
*/
test('@smoke Popup validations', async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack(); // To rahul shetty
    // await page.goForward(); // To google

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator('#displayed-text')).toBeHidden();

    page.on('dialog', dialog => dialog.accept()); //no await as it will listen to any dialog and will always accept it

    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();

    const framePage = page.frameLocator("#courses-iframe");

    await framePage.locator("li a[href*='lifetime-access']:visible").click(); // :visible used as li a[href*='lifetime-access'] results to two elements with one of them being hidden

    const subsText = await framePage.locator(".text h2").textContent(); // get sub count from h2
    console.log(subsText.split(" ")[1]);
});

test('Screenshot & Visual comparison', async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({path: 'specificSS.png'})
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'})
    await expect(page.locator('#displayed-text')).toBeHidden();
});

test('Visual testing', async({page})=>{
    await page.goto('https://playwright.dev');
    // Takes screenshot, compares screenshot to image specified and compares
    // This particular code doesn't have landing.png on first run so it will fail, but on second, it will pass since it has the image.
    // NOTE: Automated visual testing is too strict as it compares everything. If a website has a clock or it's a social media website, this will always fail as the screenshot will always have different content.
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});