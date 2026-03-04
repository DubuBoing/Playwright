import POManager from '../../page-objects/POManager.js';
import playwright from '@playwright/test';
import {Before, After, BeforeStep, AfterStep, Status} from '@cucumber/cucumber';

// Runs for all scenarios
Before(async function(){ 
    const browser = await playwright.chromium.launch({
        headless:false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

// Runs for Scenarios tagged @Regression
// Before({tags: "@Regression"},async function(){ 
//     const browser = await playwright.chromium.launch();
//     const context = await browser.newContext();
//     this.page = await context.newPage();
//     this.poManager = new POManager(this.page);
// });

// Runs for Scenarios tagged @Regression and @Validations
// Before({tags: "@Regression and @Validations"},async function(){ 
//     const browser = await playwright.chromium.launch();
//     const context = await browser.newContext();
//     this.page = await context.newPage();
//     this.poManager = new POManager(this.page);
// });

// Runs for Scenarios tagged @Regression or @Validations
// Before({tags: "@Regression or @Validations"},async function(){ 
//     const browser = await playwright.chromium.launch();
//     const context = await browser.newContext();
//     this.page = await context.newPage();
//     this.poManager = new POManager(this.page);
// });

After(function (){
    console.log('I am the last to be executed');
})

BeforeStep(function(){
    //Executes before every step in a scenario
});

AfterStep(async function({result}){
    if(result.status === Status.FAILED){
        await this.page.screenshot({path: 'screenshot1.png'});
    }
});