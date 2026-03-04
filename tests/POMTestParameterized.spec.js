import {expect, test} from '@playwright/test'
// const {LoginPage} = require('../page-objects/LoginPage');
// import {LoginPage} from '../page-objects/LoginPage';
// import {DashboardPage} from '../page-objects/DashboardPage';
// import {CheckoutPage} from '../page-objects/CheckoutPage';
import POManager from '../page-objects/POManager';
// JSON parse only leads to error so need to stringify first before parsing
const dataSet = JSON.parse(JSON.stringify(require("../utils/placeOrderTestDataArray.json")));

for(const data of dataSet){
    test(`End to End test ${data.email} & ${data.desiredProduct}`, async({ page }) =>{
        // await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        const poManager = new POManager(page);
        // const loginPage = new LoginPage(page);
        const loginPage = poManager.getLoginPage();

        await loginPage.goTo();
        await loginPage.validLogin(data.email, data.password)
        
        // Dashboard
        // const dashboardPage = new DashboardPage(page);
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchAndCart(data.desiredProduct);
        await dashboardPage.navigateToCart();
        
        // Cart
        // Clicks button that routes to /dashboard/cart using regex "*="  
        const cartPage = poManager.getCartPage();
        await cartPage.verifyOrder(data.desiredProduct);
        await cartPage.checkOutOrder();

        // Checkout
        const creditCardNo = "1111 9931 9292 2293"
        const cvv = "919"
        const cardName = "Toba tester"
        const coupon = "rahulshettyacademy"
        const country = "uni";
        // const checkoutPage = new CheckoutPage(page);
        const checkoutPage = poManager.getCheckOutPage();
        await checkoutPage.fillCheckOut(creditCardNo, cvv, cardName, coupon,country);
        await checkoutPage.verifyCouponAndEmail(data.email);
        //await page.locator("[placeholder*='Country']").pressSequentially("uni", {delay: 200}); //for some reason doesn't work in POM
        await checkoutPage.selectCountry();
        await checkoutPage.submitDetails(); 

        // Thank you page
        const thankyouPage = poManager.getThankYouPage() 
        const recentOrderId = await thankyouPage.getRecentOrderID();
        
        // My orders page
        const myordersPage = poManager.getMyOrdersPage();
        await myordersPage.goTo();
        await myordersPage.viewRecentOrder(recentOrderId);

        // View order
        // Experiment: Import {expect} and use expect in the class object(Worked)
        const orderCountry = " Country - United States ";
        const viewordersPage = poManager.getViewOrderPage();
        await viewordersPage.verifyOrder(orderCountry, recentOrderId,data.email,data.desiredProduct);
    });
}


