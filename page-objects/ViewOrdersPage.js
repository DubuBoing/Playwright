import { expect } from '@playwright/test';
class ViewOrdersPage{
    constructor(page){
        this.page = page;
        this.billingAdd = page.locator(".address").nth(0);
        this.orderId = page.locator(".col-text.-main");
        this.email = this.billingAdd.locator(".text").nth(0);
        this.country = this.billingAdd.locator(".text").nth(1);
        this.product = page.locator("div.title");
    }

    async verifyOrder(country,recentOrderId,email,desiredProduct){
        await expect(this.orderId).toHaveText(recentOrderId);
        await expect(this.email).toHaveText(email);
        console.log(await this.email.textContent());
        await expect(this.country).toHaveText(country);
        console.log(await this.country.textContent());
        await expect(this.product).toHaveText(desiredProduct);
    }
}
export default ViewOrdersPage;

/*
    const billingAdd = page.locator(".address").nth(0);
    await expect(page.locator(".col-text.-main")).toHaveText(recentOrderId);
    await expect(billingAdd.locator(".text").nth(0)).toHaveText(email);
    console.log(await billingAdd.locator(".text").nth(0).textContent());
    await expect(billingAdd.locator(".text").nth(1)).toHaveText(" Country - United States ");
    console.log(await billingAdd.locator(".text").nth(1).textContent());
    await expect(page.locator("div.title")).toHaveText(desiredProduct);
*/