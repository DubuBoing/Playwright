class LoginPage{
    constructor(page){
        this.page = page;
        this.loginButton = page.locator('#login');
        this.email = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
    }

    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(email, password){
        await this.email.fill(email)
        await this.password.fill(password)
        await this.loginButton.click();
    }
}

export default LoginPage;