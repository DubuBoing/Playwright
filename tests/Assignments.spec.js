// to run from a specific file: npx playwright test tests/UIBasicstest.spec.js

import {expect, test} from '@playwright/test'

test('End to End test', async ({ page }) =>{

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const email = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const firstName = page.locator('#firstName');
    const lastName = page.locator('#lastName');
    const occupation = page.locator("//select[@class='custom-select ng-untouched ng-pristine ng-valid']");
    const loginBtn = page.locator('#login');

    const emailCred = "tobadubu@hotmail.com"
    const passwordCred = "Passwordtesting1."
    const firstNameCred = "Tobu"
    const lastNameCred = "Testing"
    const occupationCred = "Student"

    const products = page.locator('.card-body');

    //Register an account
    await page.locator("(//a[normalize-space()='Register here'])[1]").click();
    await firstName.fill(firstNameCred);
    await lastName.fill(lastNameCred);
    await email.fill(emailCred);
    await page.locator('#userMobile').fill('1112223333');
    await occupation.selectOption(occupationCred); // Selects option with text Student
    await page.locator("input[value='Male']").check();
    await password.fill(passwordCred);
    await page.locator('#confirmPassword').fill(passwordCred)
    await page.locator("input[type='checkbox']").check()
    await loginBtn.click();

    //Log in with registered user
    await page.locator(".btn.btn-primary").click();
    
    await email.fill(emailCred)
    await password.fill(passwordCred)
    await loginBtn.click();

    // Dashboard
    // await page.waitForLoadState('networkidle'); // DISCOURAGED TO BE USED - waits for everything network related to be done first 
    await page.locator('.card-body b').last().waitFor(); // since allTextContents will auto give [] since it will run while the page is loading, this will make it wait until last item loads
    console.log(await page.locator('.card-body b').first().textContent());
    console.log(await page.locator('.card-body b').allTextContents());

    // To iterate on all products until desired Product Name and add that to cart
    const desiredProduct = "ZARA COAT 3"
    const count = await products.count();
    for(let i = 0; i < count; i++){
        if(await products.nth(i).locator("b").textContent() === desiredProduct){
            // Add to cart
            await products.nth(i).locator("text=Add To Cart").click();
            break;
        }
    }
    

    // Cart
    // Clicks button that routes to /dashboard/cart using regex "*="  
    await page.locator('[routerlink*="cart"]').click();
    await page.locator('div li').last().waitFor(); //wait for items on cart to load
    const isProductVisible = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(isProductVisible).toBeTruthy();

    await page.locator("text=Checkout").click();

    // Checkout
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
    await page.locator("[type=submit]").click();
    await expect(couponStatus).toBeVisible();

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(emailCred);
    await page.locator("[placeholder*='Country']").pressSequentially("uni", {delay: 200}) //types with delay
    const dropdown = page.locator(".ta-results");
    await dropdown.last().waitFor();
    const optionsCount = await dropdown.locator("button").count()
    for (let i=0; i < optionsCount; i++){
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text.trim() === "United States"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await page.locator(".action__submit").click();

    // Thank you page
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const recentOrder = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(recentOrder);
    const recentOrderId = recentOrder.replaceAll("|","").trim();
    console.log(recentOrderId);

    // My orders page
    await page.locator('[routerlink*="myorders"]').first().click(); // Can use button[routerlink*="myorders"] instead
    await page.locator("tbody tr th").last().waitFor();
    const orders = page.locator("tbody tr th");
    const orderCount = await orders.count();
    for(let i=0; i < orderCount; i++){
        const orderId = await orders.nth(i).textContent();
        if(orderId === recentOrderId){ // Can use orderId.includes(recentOrderId) instead
            await page.locator('tbody tr button[class*="btn-primary"]').nth(i).click();
            break;
        }
    }

    // View order
    const billingAdd = page.locator(".address").nth(0);
    await expect(page.locator(".col-text.-main")).toHaveText(recentOrderId);
    await expect(billingAdd.locator(".text").nth(0)).toHaveText(emailCred);
    console.log(await billingAdd.locator(".text").nth(0).textContent());
    await expect(billingAdd.locator(".text").nth(1)).toHaveText(" Country - United States ");
    console.log(await billingAdd.locator(".text").nth(1).textContent());
    await expect(page.locator("div.title")).toHaveText(desiredProduct);
});