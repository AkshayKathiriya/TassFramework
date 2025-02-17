const {expect} = require('@playwright/test');
class P_AppMarketPages
{
    constructor(page){
        this.page = page;
        //SideMenu
        this.ZidAppMarket_Button = page.getByRole('link', { name: 'سوق التطبيقات' });
        //HomePage
        this.AppMarket_Header = page.getByRole('heading', { name: 'سوق تطبيقات زد' });
        this.Search_Field = page.locator(`//input[@placeholder='ابحث عن تطبيق']`);
        //AppAndCategoriesPage
        //AppDetailsPage
    }
    async NavigatesToAppMarket(){
        await expect(this.ZidAppMarket_Button).toBeVisible();
        await this.ZidAppMarket_Button.click();
        await expect(this.AppMarket_Header).toBeVisible();
    }
    async SearchForApp(FreeAppName){
        await expect(this.Search_Field).toBeVisible();
        await this.Search_Field.fill(FreeAppName);
        await this.Search_Field.press('Enter');
    }
    async OpenAppDetailsPage(page,FreeAppName){
        await page.locator(`(//div//p[text()=${FreeAppName}])[1]`).waitFor({ state: 'visible' });
        await page.locator(`(//div//p[text()=${FreeAppName}])[1]`).click();
        await page.getByRole('paragraph').filter({ hasText: `${FreeAppName}` }).waitFor({ state: 'visible' });
    }
    async activeApp(){

    await page.getByRole('button', { name: 'فعل التطبيق' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'تفعيل التطبيق' }).click();
    const page1 = await page1Promise;
    await page1.getByRole('button', { name: 'تثبيت التطبيق' }).click();
    await page.goto('https://testing-web.zid.sa/market/app/2320');
    const page2Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'افتح التطبيق' }).click();
    const page2 = await page2Promise;

        
    }

}
module.exports = {P_AppMarketPages};