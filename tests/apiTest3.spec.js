const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const loginPayload = {userEmail: "tobadubu@gmail.com", userPassword: "Passwordtesting1."};
const orderPayload = {orders: [{country: "United States", productOrderedId: "68a961719320a140fe1ca57c"}]};
const fakeOrderPayload = {data: [], message: "No Orders"};

let response;

test.beforeAll( async()=> {

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

    // const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {data: loginPayload});
    // expect(loginResponse.ok()).toBeTruthy();

    // const loginJSON = await loginResponse.json();
    // token = loginJSON.token;
    // console.log(token);

    // const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
    //     data: orderPayload, 
    //     headers: 
    //     {
    //         'Authorization': token,
    //         'Content-Type': 'application/json',
    //     }
    // });
    // expect(orderResponse.ok()).toBeTruthy();
    // const orderJSON = await orderResponse.json();
    // orderId = orderJSON.orders[0];
    // console.log(orderId);

});


test('@api E2E Test - No login', async({page}) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    
    await page.goto('https://rahulshettyacademy.com/client')

    // To iterate on all products until desired Product Name and add that to cart
    const emailCred = "tobadubu@gmail.com"
    const products = page.locator('.card-body');
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

test('@api E2E - No login / No create order  UI', async({page})=>{

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    
    await page.goto('https://rahulshettyacademy.com/client')


    // My orders page
    await page.locator('[routerlink*="myorders"]').first().click(); // Can use button[routerlink*="myorders"] instead
    await page.locator("tbody tr th").last().waitFor();
    const orders = page.locator("tbody tr th");
    const orderCount = await orders.count();
    for(let i=0; i < orderCount; i++){
        const orderNo = await orders.nth(i).textContent();
        if(orderNo === response.orderId){ // Can use orderId.includes(recentOrderId) instead
            await page.locator('tbody tr button[class*="btn-primary"]').nth(i).click();
            break;
        }
    }

    // View order
    const billingAdd = page.locator(".address").nth(0);
    const emailCred = "tobadubu@gmail.com"
    await expect(page.locator(".col-text.-main")).toHaveText(response.orderId);
    await expect(billingAdd.locator(".text").nth(0)).toHaveText(emailCred);
    console.log(await billingAdd.locator(".text").nth(0).textContent());
    await expect(billingAdd.locator(".text").nth(1)).toHaveText(" Country - United States ");
    console.log(await billingAdd.locator(".text").nth(1).textContent());
})

test('@api Verify No orders screen', async({page})=> {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    
    await page.goto('https://rahulshettyacademy.com/client')

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route=>{
        // Intercepting response with a fake response to mock a response with no orders
        
        const realResponse = await page.request.fetch(route.request());
        let body = JSON.stringify(fakeOrderPayload);
        await route.fulfill({
            realResponse,
            body,
        })
    })
    
    // My orders page
    await page.locator('[routerlink*="myorders"]').first().click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

    console.log(await page.locator(".mt-4").textContent());
    
});

test('Security test interceptiom', async({page})=>{

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    
    await page.goto('https://rahulshettyacademy.com/client')
    // My orders page
    await page.locator('[routerlink*="myorders"]').first().click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", async route=> await route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6"

    })); 
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator('p').last()).toHaveText("You are not authorize to view this order");
});