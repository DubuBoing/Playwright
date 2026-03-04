class LoginPracticePage{
    constructor(page){
        this.page = page;
        this.userName = page.locator('#username');
        this.password = page.locator("[type='password']");
        this.checkbox = page.locator('#terms');
        this.roleRadio = page.locator('.radiotextsty');
        this.okayBtn = page.locator('#okayBtn');
        this.signInBtn = page.locator('#signInBtn');
        this.products = page.locator('.card-body');
    // Product link/title is inside an anchor in the card body on the shop page
    this.productTitle = page.locator('.card-body a');
    }

    async goTo(){
        await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    }

    async login(user, pass){
        await this.userName.fill(user);
        await this.password.fill(pass);
    }

    async selectCheckbox(){
        // ensure checkbox is visible then check it
        await this.checkbox.waitFor();
        if(!(await this.checkbox.isChecked())){
            await this.checkbox.check();
        }
    }

    async selectUserRole(){
        // On this page selecting a user role shows a confirmation modal that needs acceptance
        await this.roleRadio.last().check();
        // some runs show the modal immediately, others have a tiny delay — wait briefly and dismiss if it appears
        try{
            await this.okayBtn.waitFor({ state: 'visible', timeout: 2000 });
            await this.okayBtn.click();
        }catch(e){
            // modal didn't appear — continue
        }
    }

    async dismissModalIfPresent(){
        // Some runs leave a modal/backdrop that intercepts clicks. Try to close it or remove the backdrop.
        try{
            // If modal close/OK is present, click it
            const modal = this.page.locator('#myModal');
            const backdrop = this.page.locator('.modal-backdrop');
            if(await modal.isVisible().catch(()=>false)){
                // try clicking any button inside modal (OK/Close)
                const btn = modal.locator('button').first();
                if(await btn.isVisible().catch(()=>false)){
                    await btn.click().catch(()=>{});
                }
            }
            // remove lingering backdrop if it still intercepts events
            if(await backdrop.count() > 0){
                await this.page.evaluate(()=>{
                    const b = document.querySelectorAll('.modal-backdrop');
                    b.forEach(n => n.remove());
                    const m = document.querySelectorAll('#myModal');
                    m.forEach(n => n.classList.remove('show'));
                });
            }
        }catch(e){
            // ignore errors while trying to dismiss — best-effort
        }
    }

    async submitSignIn(){
        // clicking sign in routes to the shop page; wait for URL change
        await Promise.all([
            this.page.waitForURL('**/angularpractice/shop'),
            this.signInBtn.click()
        ]);
    }

    async isProductPresent(productName){
        // wait for network to quiet down and products to render; then defensively dismiss modals/backdrops
        await this.page.waitForLoadState('networkidle');
        await this.dismissModalIfPresent();
        await this.page.waitForSelector('.card-body', { timeout: 15000 });
        await this.productTitle.first().waitFor({ state: 'visible', timeout: 10000 });
        const titles = await this.productTitle.allTextContents();
        const normalized = productName.trim().toLowerCase();
        return titles.some(t => t && (t.trim().toLowerCase() === normalized || t.toLowerCase().includes(normalized)));
    }
}

export default LoginPracticePage;
