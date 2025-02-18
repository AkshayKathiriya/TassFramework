const {expect} = require('@playwright/test');
const { accessSync } = require('fs');

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

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

    async ClickOnAddNewCustomizationBTN()
    {
    await this.page.getByRole('button', { name: 'إضافة تخصيص جديد' }).click();
    }

    async VerifyThatCustomizationDisplayCorrectlyInServiceLevelDetailsPage(CustomizationName)
    {
    await this.page.getByRole('cell', { name: 'CustomizationName' });
    }

    async DeleteCustomization()
    {
    await this.page.getByRole('img', { name: 'delete' }).click();
    await this.page.getByRole('heading', { name: 'حذف تخصيص Test' }).click();
    await this.page.getByRole('button', { name: 'حذف' }).click();
    }

    async ResetServiceLevel()
    {
    await sleep(1000);
    await this.page.getByRole('button', { name: 'خيارات المستوى' });
    await this.page.getByRole('button', { name: 'خيارات المستوى' }).click();
    await this.page.getByText('إعادة تعيين المدن والأسعار').click();
    await this.page.getByText('إعادة تعيين المدن والأسعار عند استمرارك في إعادة تعيين الإعدادات الافتراضية ستفق');
    await this.page.getByRole('button', { name: 'إعادة تعيين' }).click();
    await sleep(3000);




    }
};
module.exports = {ServiceLevelDetailsPage};
