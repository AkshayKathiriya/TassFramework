// RegistrationPage.js - Page Object Model for Registration
const { expect } = require('@playwright/test');

class RegistrationPage {
    constructor(page) {
        this.page = page;
        // Locators
        this.emailTextbox = page.getByRole('textbox', { name: 'البريد الإلكتروني' });
        this.createAccountLink = page.getByRole('link', { name: 'إنشاء حساب جديد' });
        this.firstStepText = page.getByText('خطوتك الأولى لبناء ونمو متجرك تبدأ هنا');
        this.continueButton = page.getByRole('button', { name: 'استمرار' });
        this.otpTextbox = page.getByRole('textbox', { name: '× × × ×' });
        this.verifyButton = page.getByRole('button', { name: 'تحقّق' });
        this.firstNameTextbox = page.getByRole('textbox', { name: 'الاسم الأول' });
        this.lastNameTextbox = page.getByRole('textbox', { name: 'اسم العائلة' });
        this.nextButton = page.getByRole('button', { name: 'التالي' });
        this.phoneTextbox = page.getByRole('textbox', { name: 'رقم جوالك' });
    }

    async gotoLogin() {
        await this.page.goto('https://hermes.zid.dev/ar-sa/login');
    }

    async startRegistration() {
        await expect(this.emailTextbox).toBeVisible();
        await this.createAccountLink.click();
        await expect(this.firstStepText).toBeVisible();
    }

    async enterEmail(email) {
        await this.emailTextbox.click();
        await this.emailTextbox.fill(email);
        await this.continueButton.click();
    }

    async enterOTP(otp) {
        await expect(this.otpTextbox).toBeVisible();
        await this.otpTextbox.click();
        await this.otpTextbox.fill(otp);
        await this.verifyButton.click();
    }

    async enterName(firstName, lastName) {
        await expect(this.firstNameTextbox).toBeVisible();
        await this.firstNameTextbox.click();
        await this.firstNameTextbox.fill(firstName);
        await this.lastNameTextbox.click();
        await this.lastNameTextbox.fill(lastName);
        await this.nextButton.click();
    }

    async enterPhone(phone) {
        await expect(this.phoneTextbox).toBeVisible();
        await this.phoneTextbox.click();
        await this.phoneTextbox.fill(phone);
        await this.nextButton.click();
    }

    async verifyPhoneOTP(otp) {
        await expect(this.otpTextbox).toBeVisible();
        await this.otpTextbox.click();
        await this.otpTextbox.fill(otp);
        await this.verifyButton.click();
    }
}

module.exports = { RegistrationPage };
