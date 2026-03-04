import {expect} from '@playwright/test';
class ThankYouPage{
    constructor(page){
        this.page = page;
        this.recentOrder = page.locator(".em-spacer-1 .ng-star-inserted");
        this.header = page.locator(".hero-primary");
    }

    async getRecentOrderID(){
        await expect(this.header).toHaveText(" Thankyou for the order. ");
        const orderId = await this.recentOrder.textContent();
        const recentOrderId = await orderId.replaceAll("|","").trim();
        console.log(recentOrderId);
        return recentOrderId;
    }
}
export default ThankYouPage;

/*
    const recentOrder = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(recentOrder);
    const recentOrderId = recentOrder.replaceAll("|","").trim();
    console.log(recentOrderId);
*/