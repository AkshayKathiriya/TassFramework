const {expect} = require('@playwright/test');

class ServiceLevelCustomizationPage 
{
    constructor(page)
    {
        this.page = page;

    }

    async ChooseFixedRatePricing()
    {
      await this.page.locator('label').filter({ hasText: 'تسعيرة ثابتة' }).locator('span').click();
    }

    async ChooseWeightBasedPricing()
    {
    await this.page.locator('label').filter({ hasText: 'تسعيرة حسب الوزن' }).locator('span').click();
    }

    async EnterShippingCost(ShippingCost)
    {
        await this.page.getByPlaceholder('ابحث باسم الدولة أو المدينة').nth(3).click();
        await this.page.getByPlaceholder('ابحث باسم الدولة أو المدينة').nth(3).fill( );
        await this.page.getByPlaceholder('ابحث باسم الدولة أو المدينة').nth(3).fill('ShippingCost');
    }

    async ClickSaveBTN ()
    {
        await this.page.getByRole('button', { name: 'حفظ التعديلات' }).click();
    }

    async VerifyThatSuccessMessageDisplay (ServiceLevelName)
    {

    await this.page.getByRole('banner').filter({ hasText: 'حفظ التخصيص لمستوى الخدمة (ServiceLevelName)' });
    await this.page.getByRole('heading', { name: 'تم حفظ التخصيص 🎉' });
    }
     
    async ClickCloseBTNInPopUp()
    {
    await this.page.getByRole('button', { name: 'إغلاق' }).click();
    }
};
module.exports = {ServiceLevelCustomizationPage};
