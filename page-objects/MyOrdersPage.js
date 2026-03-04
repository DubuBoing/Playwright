class MyOrdersPage{
    constructor(page){
        this.page = page;
        this.myOrderPage = page.locator('button[routerlink*="myorders"]');
        this.orders = page.locator("tbody tr th");
        this.viewButton = page.locator('tbody tr button[class*="btn-primary"]');
    }

    async goTo(){
        this.myOrderPage.click();
    }

    async viewRecentOrder(recentOrderId){
        await this.orders.last().waitFor();
        const orderCount = await this.orders.count();
        for(let i=0; i < orderCount; i++){
            const orderId = await this.orders.nth(i).textContent();
            if(orderId === recentOrderId){ // Can use orderId.includes(recentOrderId) instead
                await this.viewButton.nth(i).click();
                break;
            }
        }
    }
}
export default MyOrdersPage;

/*
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
*/