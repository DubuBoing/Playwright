import  CheckoutPage  from "./CheckoutPage.ts";
import  DashboardPage  from "./DashboardPage.ts";
import  LoginPage  from "./LoginPage.ts";
import  MyOrdersPage  from "./MyOrdersPage.ts";
import  ThankYouPage  from "./ThankYouPage.ts";
import  ViewOrdersPage  from "./ViewOrdersPage.ts";
import  CartPage  from "./CartPage.ts";
import { type Page } from "@playwright/test";

class POManager{
    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    checkoutPage: CheckoutPage;
    thankyouPage: ThankYouPage;
    myordersPage: MyOrdersPage;
    viewordersPage: ViewOrdersPage;
    cartPage: CartPage;
    constructor(page: any){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.thankyouPage = new ThankYouPage(page);
        this.myordersPage = new MyOrdersPage(page);
        this.viewordersPage = new ViewOrdersPage(page)
        this.cartPage = new CartPage(page)
    }

    getLoginPage(){
        return this.loginPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

    getCheckOutPage(){
        return this.checkoutPage;
    }

    getThankYouPage(){
        return this.thankyouPage;
    }

    getMyOrdersPage(){
        return this.myordersPage;
    }

    getViewOrderPage(){
        return this.viewordersPage;
    }

    getCartPage(){
        return this.cartPage;
    }
}
export default POManager;