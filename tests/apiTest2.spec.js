const {test, expect} = require('@playwright/test');
let webContext;

test.beforeAll(async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto("https://rahulshettyacademy.com/client/");

    const email = page.getByPlaceholder('email@example.com');
    const password = page.getByPlaceholder('enter your passsword');
    const loginBtn = page.getByRole('button', {name: 'Login'});

    const emailCred = "tobadubu@gmail.com"
    const passwordCred = "Passwordtesting1."
    
    await email.fill(emailCred);
    await password.fill(passwordCred);
    await loginBtn.click();
    
    await page.waitForLoadState('networkidle'); // NEEDED!! Or storageState will NOT get any info from Local storage
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});
});

test('@api Rewritten End to End test', async() => {

    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    
    // Dashboard
    const products = page.locator('.card-body');
    await page.locator('.card-body b').last().waitFor(); 
    console.log(await page.locator('.card-body b').first().textContent());
    console.log(await page.locator('.card-body b').allTextContents());

    await page.locator('.card-body').filter({hasText: 'ZARA COAT 3'}).getByRole('button',{name: "Add To Cart"}).click();
    await page.getByRole("listitem").getByRole('button',{name: 'Cart'}).click();
    await page.locator('div li').last().waitFor(); 
    await expect(page.getByText('ZARA COAT 3')).toBeVisible();


    await page.getByRole('button',{name: 'Checkout'}).click();

    // Checkout
    // Checkout - Personal Information
    const emailCred = "tobadubu@gmail.com"
    const creditCardNo = "1111 9931 9292 2293"
    const cvv = "919"
    const cardName = "Toba tester"
    const coupon = "rahulshettyacademy"
    const couponStatus = page.locator("[style*=green]:has-text('Coupon Applied')")
    await page.locator("input.txt").nth(0).fill(creditCardNo);
    await page.locator("[class = 'input ddl']").first().selectOption("12");
    await page.locator("[class = 'input ddl']").last().selectOption("02");
    await page.locator("input.txt").nth(1).fill(cvv);
    await page.locator("input.txt").nth(2).fill(cardName);
    await page.locator("input.txt").nth(3).fill(coupon);
    await page.getByRole('button',{name: 'Apply Coupon'}).click();
    await expect(couponStatus).toBeVisible();

    
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(emailCred);
    await page.getByPlaceholder('Select Country').pressSequentially("uni", {delay: 200});
    await page.getByRole('button', {name: 'United States'}).nth(0).click(); 
    await page.getByText('PLACE ORDER').click(); 


    await expect(page.getByText('Thankyou for the order.')).toBeVisible();
    const recentOrder = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(recentOrder);
    const recentOrderId = recentOrder.replaceAll("|","").trim();
    console.log(recentOrderId);

    // My orders page
    await page.getByRole("listitem").getByRole('button',{name: 'Orders'}).click();
    await page.locator("tbody tr th").last().waitFor();
    const orders = page.locator("tbody tr th");
    const orderCount = await orders.count();
    for(let i=0; i < orderCount; i++){
        const orderId = await orders.nth(i).textContent();
        if(orderId === recentOrderId){ 
            await page.locator('tbody tr button[class*="btn-primary"]').nth(i).click();
            break;
        }
    }
});

test('@api All text Contents', async()=>{
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    
    // Dashboard
    await page.locator('.card-body b').last().waitFor(); 
    console.log(await page.locator('.card-body b').first().textContent());
    console.log(await page.locator('.card-body b').allTextContents());
});