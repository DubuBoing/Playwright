import  CheckoutPage  from "./CheckoutPage.js";
import  DashboardPage  from "./DashboardPage.js";
import  LoginPage  from "./LoginPage.js";
import  MyOrdersPage  from "./MyOrdersPage.js";
import  ThankYouPage  from "./ThankYouPage.js";
import  ViewOrdersPage  from "./ViewOrdersPage.js";
import  CartPage  from "./CartPage.js";

class POManager{
    constructor(page){
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