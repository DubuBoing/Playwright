import { expect, type Page,type Locator } from '@playwright/test';

class CartPage{
    page: Page;
    cartItems: Locator;
    checkOut: Locator;
    constructor(page: Page){
        this.page = page;
        this.cartItems = page.locator('div li');
        this.checkOut = page.locator("text=Checkout");
    }

    async verifyOrder(product: string){
        await this.cartItems.last().waitFor();
        const isProductVisible = await this.page.locator("h3:has-text('"+product+"')").isVisible();
        expect(isProductVisible).toBeTruthy();
    }

    async checkOutOrder(){
        await this.checkOut.click();
    }
}
export default CartPage;

/*
    await page.locator('div li').last().waitFor(); //wait for items on cart to load
    const isProductVisible = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(isProductVisible).toBeTruthy();

    await page.locator("text=Checkout").click();
*/