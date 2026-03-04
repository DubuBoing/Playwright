const {test, expect} = require('@playwright/test');

test('Special locators', async({ page })=>{

    await page.goto('https://rahulshettyacademy.com/angularpractice')

    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByLabel("Employed").check();
    await page.getByLabel('Gender').selectOption('Female');

    await page.getByPlaceholder('Password').fill('1223');
    await page.getByRole('button', {name: 'Submit'}).click();
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
    await page.getByRole("link",  {name: "Shop"}).click();

    await page.locator('app-card').filter({hasText: 'Nokia Edge'}).getByRole('button').click();


});

test('Rewritten End to End test', async({page}) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const email = page.getByPlaceholder('email@example.com');
    const password = page.getByPlaceholder('enter your passsword');
    // const firstName = page.locator('#firstName');
    // const lastName = page.locator('#lastName');
    // const occupation = page.locator("//select[@class='custom-select ng-untouched ng-pristine ng-valid']");
    const loginBtn = page.getByRole('button', {name: 'Login'});

    const emailCred = "tobutester78@hotmail.com"
    const passwordCred = "Passwordtesting1."
    // const firstNameCred = "Tobu"
    // const lastNameCred = "Testing"
    // const occupationCred = "Student"

    const products = page.locator('.card-body');

    // //Register an account
    // await page.locator("(//a[normalize-space()='Register here'])[1]").click();
    // await firstName.fill(firstNameCred);
    // await lastName.fill(lastNameCred);
    // await email.fill(emailCred);
    // await page.locator('#userMobile').fill('1112223333');
    // await occupation.selectOption(occupationCred); // Selects option with text Student
    // await page.locator("input[value='Male']").check();
    // await password.fill(passwordCred);
    // await page.locator('#confirmPassword').fill(passwordCred)
    // await page.locator("input[type='checkbox']").check()
    // await loginBtn.click();

    // //Log in with registered user
    // await page.locator(".btn.btn-primary").click();
    
    await email.fill(emailCred)
    await password.fill(passwordCred)
    await loginBtn.click();


    // Dashboard
    // await page.waitForLoadState('networkidle'); // DISCOURAGED TO BE USED - waits for everything network related to be done first 
    await page.locator('.card-body b').last().waitFor(); // since allTextContents will auto give [] since it will run while the page is loading, this will make it wait until last item loads
    console.log(await page.locator('.card-body b').first().textContent());
    console.log(await page.locator('.card-body b').allTextContents());

    // To iterate on all products until desired Product Name and add that to cart
    // const desiredProduct = "ZARA COAT 3"
    // const count = await products.count();
    // for(let i = 0; i < count; i++){
    //     if(await products.nth(i).locator("b").textContent() === desiredProduct){
    //         // Add to cart
    //         await products.nth(i).locator("text=Add To Cart").click();
    //         break;
    //     }
    // }
    await page.locator('.card-body').filter({hasText: 'ZARA COAT 3'}).getByRole('button',{name: "Add To Cart"}).click();
    

    // Cart
    // Clicks button that routes to /dashboard/cart using regex "*="  
    // await page.locator('[routerlink*="cart"]').click();
    // await page.locator('div li').last().waitFor(); //wait for items on cart to load
    // const isProductVisible = await page.getByText('ZARA COAT 3').isVisible();
    // expect(isProductVisible).toBeTruthy();
    await page.getByRole("listitem").getByRole('button',{name: 'Cart'}).click();
    await page.locator('div li').last().waitFor(); //wait for items on cart to load
    await expect(page.getByText('ZARA COAT 3')).toBeVisible();

    // await page.locator("text=Checkout").click();
    await page.getByRole('button',{name: 'Checkout'}).click();

    // Checkout
    // Checkout - Personal Information
    const creditCardNo = "1111 9931 9292 2293"
    const cvv = "919"
    const cardName = "Toba tester"
    const coupon = "rahulshettyacademy"
    const couponStatus = page.locator("[style*=green]:has-text('Coupon Applied')")
    // await page.locator("input.txt").nth(0).fill(creditCardNo);
    // await page.locator("[class = 'input ddl']").first().selectOption("12");
    // await page.locator("[class = 'input ddl']").last().selectOption("02");
    // await page.locator("input.txt").nth(1).fill(cvv);
    // await page.locator("input.txt").nth(2).fill(cardName);
    // await page.locator("input.txt").nth(3).fill(coupon);
    // await page.locator("[type=submit]").click();
    await page.locator("input.txt").nth(0).fill(creditCardNo);
    await page.locator("[class = 'input ddl']").first().selectOption("12");
    await page.locator("[class = 'input ddl']").last().selectOption("02");
    await page.locator("input.txt").nth(1).fill(cvv);
    await page.locator("input.txt").nth(2).fill(cardName);
    await page.locator("input.txt").nth(3).fill(coupon);
    await page.getByRole('button',{name: 'Apply Coupon'}).click();
    await expect(couponStatus).toBeVisible();

    // Checkout - Shipping Information
    // await expect(page.locator(".user__name [type='text']").first()).toHaveText(emailCred);
    // await page.locator("[placeholder*='Country']").pressSequentially("uni", {delay: 200}) //types with delay
    // const dropdown = page.locator(".ta-results");
    // await dropdown.last().waitFor();
    // const optionsCount = await dropdown.locator("button").count()
    // for (let i=0; i < optionsCount; i++){
    //     const text = await dropdown.locator("button").nth(i).textContent();
    //     if(text.trim() === "United States"){
    //         await dropdown.locator("button").nth(i).click();
    //         break;
    //     }
    // }
    // await page.locator(".action__submit").click();
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(emailCred);
    await page.getByPlaceholder('Select Country').pressSequentially("uni", {delay: 200});
    await page.getByRole('button', {name: 'United States'}).nth(0).click(); // Results to United States and United States Minor Outlying Islands so need nth
    await page.getByText('PLACE ORDER').click(); //Place order isn't a button but an <a>



    // Thank you page
    // await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    // const recentOrder = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    // console.log(recentOrder);
    // const recentOrderId = recentOrder.replaceAll("|","").trim();
    // console.log(recentOrderId);
    await expect(page.getByText('Thankyou for the order.')).toBeVisible();
    const recentOrder = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(recentOrder);
    const recentOrderId = recentOrder.replaceAll("|","").trim();
    console.log(recentOrderId);

    // My orders page
    // await page.locator('[routerlink*="myorders"]').first().click(); // Can use button[routerlink*="myorders"] instead
    await page.getByRole("listitem").getByRole('button',{name: 'Orders'}).click();
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
});

test('Calendar testing', async({page})=>{

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    const monthNumber = '6'; //June
    const date = '15';
    const year = '2027';

    await page.locator('.react-date-picker__inputGroup').click();
    await page.locator('.react-calendar__navigation__label__labelText').click();
    await page.locator('.react-calendar__navigation__label__labelText').click();
    await page.getByText(year).click();
    await page.locator('.react-calendar__year-view__months__month').nth(Number(monthNumber)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click(); // Gets <abbr aria-label="June 15, 2027">15</abbr>, so abbr tag with the text of date variable

    await expect(page.locator('.react-date-picker__inputGroup__input').nth(0)).toHaveValue(monthNumber);
    await expect(page.locator('.react-date-picker__inputGroup__input').nth(1)).toHaveValue(date);
    await expect(page.locator('.react-date-picker__inputGroup__input').nth(2)).toHaveValue(year); 
    

    /*
        Rahul Shetty's Code

        const expectedList = [monthNumber, date, year]
        const inputs = page.locator('.react-date-picker__inputGroup__input');

        for(let i = 0; i < expectedList; i++){
            const value = await inputs.nth(i).inputValue();
            expect(value).toEqual(expectedList[i]);
        }
    */
});