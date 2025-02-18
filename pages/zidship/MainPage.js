const {expect} = require('@playwright/test');

class MainPage 
{
    constructor(page)
    {
        this.page = page;
        
        this.MainPageTitle = page.getByRole('heading', {name: 'زد شب للشحن'});
        this.ActivateServiceLevelBTN = page.getByRole('data-identifier', {name: 'zidship-serviceLevelcard-zidswitch-aramex_custom'});
        this.ActivatedServiceLevelsSection = page.getByRole('data-identifier', {name: 'zidship-serviceLevelcard-zidswitch-aramex_custom'});
        this.ImmidiateRecevingSection = page.getByRole('data-identifier', {name: 'zidship-serviceLevelcard-zidswitch-aramex_custom'});
    }

    async GoToZidShipPage()
    {
        await this.page.goto("https://testing-web.zid.sa/account/settings/delivery-options/zidship");
        await this.page.getByRole('heading', {name: 'زد شب للشحن'});
    }
    
    async GoToActivatedServiceLevelsSection()
    {
        await this.page.getByRole('tab', { name: 'الخدمات المفعلة' });
        await this.page.getByRole('tab', { name: 'الخدمات المفعلة' }).click();
    }

    async GoToImmidiateRecieveFrom()
    {
        await this.page.getByRole('tab', { name: 'الاستلام الفوري من موقع المخزون' });
        await this.page.getByRole('tab', { name: 'الاستلام الفوري من موقع المخزون' }).click();
    }

    async GoTo1stMileServiceLevelSection()
    {
    
        await this.page.getByRole('tab', { name: 'مستويات الخدمة الخاصة بخدمه الميل الاول' }).click();    
    }

    async ActivateServiceLevel(ServiceLevelName)
    {
        await this.page.locator('span').filter({ hasText: ServiceLevelName}).first().click();    
        await this.page.locator('.zid-modal');
        await this.page.getByRole('heading', { name: 'تفعيل مستوى الخدمة' });
    }
    async ClosePopUpfromXButton()
    {
        await this.page.getByRole('button', { name: 'Close modal' }).click();

    }
    async DeactivateServiceLevel(ServiceLevelName)
    {
        await this.page.locator('label').filter({ hasText: ServiceLevelName }).first();
        await this.page.locator('label').filter({ hasText: ServiceLevelName }).first().click();
        await this.page.getByRole('heading', { name: 'تعطيل مستوى الخدمة' });
        await this.page.getByRole('button', { name: 'تعطيل' }).click();
        await this.page.locator('#app div').filter({ hasText: 'تم تعطيل مستوي الخدمة بنجاح' }).nth(3).click();
    }

    async CheckThatActivatedServiceLevelDisplaysInActivatedSLSection(ServiceLevelName)
    {
    await this.page.locator('label').filter({ hasText: ServiceLevelName }).first();
    }

    async ReverseServiceLevelUnableToBeDeactivated()
    {
    await this.page.getByText('تعطيل مستوى الخدمة مستوى خدمة الشحنات المسترجعة هو مستوى أساسى يكون مفعل بشكل تل');
    }

    async GoToServiceLevelDetailsPage()
    {
        await this.page.locator('div:nth-child(4) > .a6b2168a > .a370f8f8 > button:nth-child(2) > .zid-button__content > a');
        await this.page.locator('div:nth-child(4) > .a6b2168a > .a370f8f8 > button:nth-child(2) > .zid-button__content > a').click();

    }
};
module.exports = {MainPage};