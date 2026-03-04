import { expect, type Page,type Locator } from '@playwright/test';
class ThankYouPage{
    page: Page;
    recentOrder: Locator;
    header: Locator;
    constructor(page: any){
        this.page = page;
        this.recentOrder = page.locator(".em-spacer-1 .ng-star-inserted");
        this.header = page.locator(".hero-primary");
    }

    async getRecentOrderID(){
        await expect(this.header).toHaveText(" Thankyou for the order. ");
        const orderId: any = await this.recentOrder.textContent();
        const recentOrderId: any =  orderId.replaceAll("|","").trim();
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