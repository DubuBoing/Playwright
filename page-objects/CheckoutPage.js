import { expect } from '@playwright/test';
class CheckoutPage{
    constructor(page){
        this.page = page;
        this.couponStatus = page.locator("[style*=green]:has-text('Coupon Applied')");
        this.expiryDateMonth = page.locator("[class = 'input ddl']").first();
        this.expiryDateDay = page.locator("[class = 'input ddl']").last();
        this.creditCardNo = page.locator("input.txt").nth(0);
        this.cvv = page.locator("input.txt").nth(1);
        this.cardName = page.locator("input.txt").nth(2);
        this.coupon = page.locator("input.txt").nth(3);
        this.email = page.locator(".user__name [type='text']").first();
        this.applyCoupon = page.locator("[type=submit]");
        this.submit = page.locator(".action__submit");
        this.dropdown = page.locator(".ta-results");
        this.couponStatus = page.locator("[style*=green]:has-text('Coupon Applied')");
        this.country = page.locator("[placeholder*='Country']");
    }

    async fillCheckOut(creditCardNo, cvv, cardName, coupon){
        await this.creditCardNo.fill(creditCardNo);
        await this.expiryDateMonth.selectOption("12");
        await this.expiryDateDay.selectOption("02");
        await this.cvv.fill(cvv);
        await this.cardName.fill(cardName);
        await this.coupon.fill(coupon);
        await this.applyCoupon.click();
    }

    async verifyCouponAndEmail(email){
        await expect(this.couponStatus).toBeVisible();
        await expect(this.email).toHaveText(email);
    }

    async selectCountry(countryText){
        await this.country.pressSequentially(countryText, {delay: 200}); //types with delay
        await this.dropdown.last().waitFor();
        const optionsCount = await this.dropdown.locator("button").count()
        for (let i=0; i < optionsCount; i++){
            const text = await this.dropdown.locator("button").nth(i).textContent();
            if(text.trim() === "United States"){
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }
    }

    async submitDetails(){
        this.submit.click();
    }
}
export default CheckoutPage;
/*
    const creditCardNo = "1111 9931 9292 2293"
    const cvv = "919"
    const cardName = "Toba tester"
    const coupon = "rahulshettyacademy"
    const couponStatus = page.locator("[style*=green]:has-text('Coupon Applied')")
    await page.locator("input.txt").nth(0).fill(creditCardNo);
    await page.locator("[class = 'input ddl']").first().selectOption("12");
    await page.locator("[class = 'input ddl']").last().selectOption("02");
    await page.locator("input.txt").nth(1).fill(cvv);
    await page.locator("input.txt").nth(2).fill(cardName);
    await page.locator("input.txt").nth(3).fill(coupon);
    await page.locator("[type=submit]").click();
    await expect(couponStatus).toBeVisible();

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator("[placeholder*='Country']").pressSequentially("uni", {delay: 200}) //types with delay
    const dropdown = page.locator(".ta-results");
    await dropdown.last().waitFor();
    const optionsCount = await dropdown.locator("button").count()
    for (let i=0; i < optionsCount; i++){
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text.trim() === "United States"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await page.locator(".action__submit").click();
*/
