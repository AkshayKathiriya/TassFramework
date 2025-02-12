const {expect} = require('@playwright/test');
const clickWithRetry = require('../../utils/clickWithRetry');
class LoginPage
{
    constructor(page)
    {
        this.page = page;
        this.loginPageTitle = page.getByRole('heading', { name: 'تسجيل الدخول' });
        this.emailField = page.getByRole('textbox', { name: 'مثال: name@domain.com' });
        this.nextButton = page.getByRole('button', { name: 'التالي' });

        this.otpPageTitle = page.getByRole('heading', { name: 'أدخل رمز التحقق' });
        this.otpFirstField = page.getByRole('textbox').first();
        this.otpSecondField = page.getByRole('textbox').nth(1);
        this.otpThirdField = page.getByRole('textbox').nth(2)
        this.otpFourthField = page.getByRole('textbox').nth(3);
        this.otpConfirmButton = page.getByRole('button', { name: 'التحقق' });
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
        await clickWithRetry(this.page, this.nextButton, this.otpPageTitle, 3, 5000);
        //await this.nextButton.click();
        await this.page.waitForURL("**/otp");

    }
    async enterOTP(){
        await this.page.waitForLoadState("networkidle");
        await expect(this.otpPageTitle).toBeVisible();
        await expect(this.otpFirstField).toBeVisible();
        await this.otpFirstField.click();
        await this.otpFirstField.fill('1');
        await this.otpSecondField.fill('2');
        await this.otpThirdField.fill('3');
        await this.otpFourthField.fill('4');
        await this.otpConfirmButton.click();
        //await this.page.waitForLoadState("networkidle");
    }

}
module.exports = {LoginPage};