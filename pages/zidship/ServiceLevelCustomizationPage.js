const {expect} = require('@playwright/test');

class ServiceLevelCustomizationPage 
{
    constructor(page)
    {
        this.page = page;

    }

    async ChooseSpecificCity(CityName)
    {
    await this.page.locator('label').filter({ hasText: CityName }).locator('span').click();
    }

    async EnterCustomizationName(CustomizationName)
    {
    await this.page.getByRole('textbox', { name: 'مثال: مدن التوصيل السريع' }).fill(CustomizationName);
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
        //await this.page.getByPlaceholder('ابحث باسم الدولة أو المدينة').nth(3).fill( );
        await this.page.getByPlaceholder('ابحث باسم الدولة أو المدينة').nth(3).fill(ShippingCost);
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

    async AddTextForCustomer()
    {

    }

    async ClickOnAddCustomizationBTN()
    {
    await this.page.getByRole('button', { name: 'إضافة' }).click();
    }

    async VerifyThatSuccessMessageDisplayForAddNewCustomization ()
    {
        await this.page.getByText('تم إضافة تخصيص جديد بنجاح');

    }

    async ActivateCODOption()
    {
    await page.getByText('تفعيل الدفع عند الاستلام').click();
    }

    async EnterCODAmount(CODAmount)
    {
    await page.getByRole('spinbutton').nth(1).click();
    await page.getByRole('spinbutton').nth(1).fill(CODAmount);
    }

};
module.exports = {ServiceLevelCustomizationPage};
