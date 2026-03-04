const {test, expect} = require('@playwright/test');

/*
    test types:
    test.only - only test this scenario and skip others
    test.skip - skip specific test

    title configs:
    test('@[tag] [title]', async ({})=> {}) 
    to run: npx playwright test --grep @[tag]
    NOTE: @[tag] only works on Mac, in windows it doesn't need @
    example: @smoke in here and in Validations.spec.js
*/
test('@smoke Browser Contect Playwright test', async ({browser})=>{
    //step 1
    //await
    //step 2

    //page fixture does these
    const context = await browser.newContext();
    const page = await context.newPage();
    // aborts css, jpg, png, jpeg in api call and thus removes them from website. If only one to remove, you can remove the curly brackets
    //await page.route('**/*.{css,jpg,png,jpeg}', route => route.abort());

    //listens to every request, response, and status
    page.on('request', request=> console.log(request.url()));
    page.on('response', response=> console.log(response.url(), response.status()));

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    
    const userName = page.locator('#username');
    const password = page.locator("[type='password']");
    const radio = page.locator('.radiotextsty');
    const dropdown = page.locator('select.form-control');
    const checkbox = page.locator('#terms');
    const documentLink = page.locator("[href*='documents-request']");
    const signInBtn = page.locator('#signInBtn');
    const item = page.locator('.card-body a');

    await userName.fill("rahulshettyacademy");
    await password.fill('learning');
    await radio.last().check();
    console.log("Is User checked:", await radio.last().isChecked());
    await expect(radio.last()).toBeChecked();
    await page.locator('#okayBtn').click();

    /* 
    
    await is in inside of expect because inside is the action(checking if checkbox is Checked via returning True/False). 
    
    await is outside when action is done outside, eg. await expect(checkbox).toBeChecked(); because the checkbox doesn't return anything but is only a locator/pointer, instead it's the expect that is the action where it checks if the checkbox is checked via toBeChecked().

    */

    expect(await checkbox.isChecked()).toBeFalsy(); // Used since there is no .toBeNotChecked() method 
    await checkbox.check();
    await expect(checkbox).toBeChecked(); // Using isChecked: expect(await checkbox.isChecked()).toBeTruthy();  
    await dropdown.selectOption('consult'); //Selects option with html value
    // await page.pause() // Pauses run so user can do things manually via Playwright Inspector until resume
    await expect(documentLink).toHaveAttribute('class','blinkingText');
    await signInBtn.click();
    
    // await item.textContent(); <-- Has multiple elements
    console.log(await item.nth(0).textContent()); // By Index
    console.log(await item.first().textContent()); // First item
    console.log(await item.allTextContents()); // All items returned contained in a list, even if empty

    
    // Get error in rahulshettylogin page 
    // console.log(await page.locator("[style*='block']").textContent());
    // await expect(page.locator("[style*='block']")).toContainText('Incorrect')

});

test('Child window handling', async({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    // using Promise.all for doing multiple asyncs(listening and accessing link) where newPage variable will return the new tab opened after clicking the link to an external website from loginPagePractise
    // It waits for both a new page event and a click action to occur simultaneously
    // newPage is an array to be used whenever there are multiple tabs open
    const [newPage] = await Promise.all([

        // .waitForEvent is before .click because it only listens for an event after it. So if you put it on after the .click, it will just listen and never have anything to react to
        context.waitForEvent('page'), // listen for any new page/tab opened pending, rejected, fulfilled
        documentLink.click() // opens a new tab

    ]);

    // newPage is used because that is on the new Tab opened, page is on the original page we were on
    // text: Please email us at mentor@rahulshettyacademy.com with below template to receive response

    const text = await newPage.locator(".red").textContent();
    console.log(text)

    // arrayText: [Please email us at mentor, rahulshettyacademy.com with below template to receive response]
    const arrayText = text.split("@"); 
    const emailDomain = arrayText[1].split(" ")[0]; //rahulshettyacademy.com
    console.log(emailDomain);

    await userName.fill(emailDomain); //use emailDomain as a variable to be put as a username in login page
    const userName_value = await page.locator('#username').inputValue(); // to get value from a form
    console.log(userName_value)

});


test('First Playwright test', async ({page})=>{
    
    await page.goto("https://google.com");
    


    await expect(page).toHaveTitle("Google");
});

