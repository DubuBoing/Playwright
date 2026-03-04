import {type Page,type Locator } from '@playwright/test';
class DashboardPage{
    page: Page;
    products: Locator;
    productText: Locator;
    cart: Locator;
    constructor(page: any){
        this.page = page;
        this.products = page.locator('.card-body');
        this.productText = page.locator('.card-body b');
        this.cart = page.locator('[routerlink*="cart"]');
    }

    async searchAndCart(productName: string){
        await this.productText.last().waitFor();
        const titles = await this.productText.allTextContents();
        console.log(titles);
        const count = await this.products.count();
        for(let i = 0; i < count; i++){
            if(await this.products.nth(i).locator("b").textContent() === productName){
                // Add to cart
                await this.products.nth(i).locator("text=Add To Cart").click();
                break;
            }
        }
    }

    async navigateToCart(){
        await this.cart.click();
    }
}
export default DashboardPage;