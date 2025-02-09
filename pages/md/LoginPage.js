const {expect} = require('@playwright/test');
class LoginPage
{
    constructor(page)
    {
        this.page = page;
        this.loginPageTitle = page.getByRole('heading', { name: 'تسجيل الدخول' });
        this.emailField = page.getByRole('textbox', { name: 'مثال: name@domain.com' });
        this.nextButton = page.getByRole('button', { name: 'التالي' });
    }

    async goTo()
    {
    await this.page.goto("https://testing-web.zid.sa/login");
    }

    async enterUserEmail(userEmail){
        //await this.page.waitForLoadState("networkidle");
        await expect(this.loginPageTitle).toBeVisible();
        await expect(this.emailField).toBeVisible();
        await this.emailField.click();
        await this.emailField.fill(userEmail);
    }
}
module.exports = {LoginPage};