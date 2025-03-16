// HomePage.js
const BasePage = require('./BasePage.js');
const {expect} = require('@playwright/test');
const clickWithRetry = require('../utils/clickWithRetry');

class LoginPage2 extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.nextButton = page.getByRole('button', { name: 'التالي' });
    this.otpPageTitle = page.getByRole('heading', { name: 'أدخل رمز التحقق' });
    this.otpFirstField = page.getByRole('textbox').first();
    this.otpSecondField = page.getByRole('textbox').nth(1);
    this.otpThirdField = page.getByRole('textbox').nth(2)
    this.otpFourthField = page.getByRole('textbox').nth(3);
    this.otpConfirmButton = page.getByRole('button', { name: 'التحقق' });
  }

  async clickSubmitButton() {
    const submitButton = await this.getElement('submitButton');
    await submitButton.click();
  }

    async enterUserEmail(userEmail){
        //await this.page.waitForLoadState("networkidle");
        //await expect(this.loginPageTitle).toBeVisible();
        await this.getElement('loginPageTitle');
        //await expect(this.emailField).toBeVisible();
        const emailField = await this.getElement('emailField');
        await emailField.click();
        await emailField.fill(userEmail);
        await clickWithRetry(this.page, this.nextButton, this.otpPageTitle, 2, 5000);
        //await this.nextButton.click();
        await this.page.waitForURL("**/otp");

    }
    async goTo()
    {
    await this.page.goto("https://testing-web.zid.sa/login");
    }
}

module.exports = {LoginPage2};
