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
    }
        
    async ActivateServiceLevel(ServiceLevelName)
    {
        
    }
}