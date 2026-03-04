import {Given, When, Then } from '@cucumber/cucumber';
import {expect} from '@playwright/test'

Given('a login to Ecommerce application with {string} and {string}', {timeout:100*1000}, async function (username, password) {
    this.loginPage = this.poManager.getLoginPage();

    await this.loginPage.goTo();
    await this.loginPage.validLogin(username, password)
});

When('Add {string} to Cart',async function (desiredProduct) {
    const dashboardPage = this.poManager.getDashboardPage();
    await dashboardPage.searchAndCart(desiredProduct);
    await dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the Cart', async function (desiredProduct) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.verifyOrder(desiredProduct);
    await cartPage.checkOutOrder();
});

When('Enter valid details and Place the Order', {timeout:100*1000}, async function () {
    const email = "tobadubu@gmail.com"
    const creditCardNo = "1111 9931 9292 2293"
    const cvv = "919"
    const cardName = "Toba tester"
    const coupon = "rahulshettyacademy"
    const country = "uni";
    // const checkoutPage = new CheckoutPage(page);
    const checkoutPage = this.poManager.getCheckOutPage();
    await checkoutPage.fillCheckOut(creditCardNo, cvv, cardName, coupon,country);
    await checkoutPage.verifyCouponAndEmail(email);
    await checkoutPage.selectCountry();
    await checkoutPage.submitDetails();

    const thankyouPage = this.poManager.getThankYouPage() 
    this.recentOrderId = await thankyouPage.getRecentOrderID();
});

Then('Verify order in present in the Order History', async function () {
    const myordersPage = this.poManager.getMyOrdersPage();
    await myordersPage.goTo();
    await myordersPage.viewRecentOrder(this.recentOrderId);
});


Given('a login to Ecommerce2 application with {string} and {string}', async function (user, pass) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());

    const userName = this.page.locator('#username');
    const password = this.page.locator("[type='password']");
    const signInBtn = this.page.locator('#signInBtn');

    await userName.fill(user);
    await password.fill(pass);
    await signInBtn.click();
});

Then('Verify Error message is displayed',async function () {
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect')
});



