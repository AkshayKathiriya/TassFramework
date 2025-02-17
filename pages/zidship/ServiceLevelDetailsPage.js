const {expect} = require('@playwright/test');

class ServiceLevelDetailsPage 
{
    constructor(page)
    {
        this.page = page;

    }

    async VerifyThatServiceLevelNameDisplaysCorrectly(ServiceLevelName)
    {
        await this.page.getByRole('heading', { name: 'ServiceLevelName' });    
    }
    
    async GoToDefaultCustomizationPage()
    {
    await this.page.getByRole('button', { name: 'تعديل التسعير' }).click();
    }
};
module.exports = {ServiceLevelDetailsPage};
