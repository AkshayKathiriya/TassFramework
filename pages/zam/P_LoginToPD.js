const {expect} = require('@playwright/test');
class P_LoginToPD
{
    constructor(page)
    {
        this.page = page;
        this.loginPageTitle = page.getByRole('heading', { name: 'Login' });
        this.emailField = page.locator('//input[@id="email"]');
        this.passwordField = page.locator('//input[@id="password"]');
        this.loginButton = page.locator('//span[contains(text(),"Log in")]');
        this.confirmationMessgae = page.locator('//div[contains(@class,"v-toast__item v-toast__item--success v-toast__item--top-right")]');
    
    }
    async goToPD()
    {
    await this.page.goto("https://testing-partner.zid.dev/");
    }
    async enterUserEmail(userEmail){
        await expect(this.loginPageTitle).toBeVisible();
        await expect(this.emailField).toBeVisible();
        await this.emailField.fill(userEmail);
    }
    async enterUserPassword(passwordField){
        await expect(this.passwordField).toBeVisible();
        await this.passwordField.fill(passwordField);
    }
    async clickLoginButton(){
        await expect(this.loginButton).toBeEnabled();
        await this.loginButton.click();
        await expect(this.confirmationMessgae).toBeVisible();
    }
}
module.exports = {P_LoginToPD};