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
        await this.page.goto('https://testing-web.zid.sa/market');
        //await expect(this.ZidAppMarket_Button).toBeVisible({ timeout: 60_000 });
        //await this.ZidAppMarket_Button.click();
        await expect(this.AppMarket_Header).toBeVisible({ timeout: 60_000 });
    }
    async SearchForApp(FreeAppName){
        await expect(this.Search_Field).toBeVisible();
        await this.Search_Field.fill(FreeAppName);
        await this.Search_Field.press('Enter');
    }
    async OpenAppDetailsPage(page,FreeAppName){
        await page.locator(`(//div//p[text()='${FreeAppName}'])[1]`).waitFor({ state: 'visible' });
        await page.locator(`(//div//p[text()='${FreeAppName}'])[1]`).click();
        await page.getByRole('paragraph').filter({ hasText: FreeAppName }).waitFor({ state: 'visible' });
    }
    async OpenApplicationAndCategoriesPage(page)
    {
        await page.locator('.b80759fd > .zid-button').click();
        await page.getByRole('paragraph').filter({ hasText: 'سوق تطبيقات زد' }).waitFor({ state: 'visible' });
    }
    async activeApp(page)
    {
        await expect(page.getByRole('button', { name: 'فعل التطبيق' })).toBeVisible({ timeout: 60_000 });
        await page.getByRole('button', { name: 'فعل التطبيق' }).click();
        //before click

        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
            page.getByRole('button', { name: 'تفعيل التطبيق' }).click() // Opens a new tab
          ])
          await newPage.waitForLoadState();
        
        // await expect(page.getByRole('button', { name: 'تفعيل التطبيق' })).toBeVisible({ timeout: 60_000 });
        // await page.getByRole('button', { name: 'تفعيل التطبيق' }).click();
        //after click
        //const page1 = await pagePromise;
        await newPage.getByRole('button', { name: 'تثبيت التطبيق' }).click();

        // const tabs = await page.$$('.tab-class'); // Get all tabs
        // await tabs[0].click(); // Click the second tab
        await page.bringToFront();
        //await page.reload();
        await page.reload({ waitUntil: 'load' });
        await expect(page.getByRole('button', { name: 'افتح التطبيق' })).toBeVisible({ timeout: 60_000 })
    }
    async DeactiveApp(page)
    {
        await expect(page.getByRole('button', { name: 'الغاء التفعيل' })).toBeVisible({ timeout: 60_000 });
        await page.getByRole('button', { name: 'الغاء التفعيل' }).click();
        await page.locator('#deactivate-btn').click();
        await page.locator('label').filter({ hasText: 'أخرى' }).locator('span').click();
        await page.locator('#reasons-deactivate-btn').click();
        await page.getByRole('button', { name: 'Close modal' }).click()
    }
    async ActiveJSApp(page)
    {
        await page.getByRole('link', { name: 'فعل التطبيق' }).click();
        //await page.getByRole('textbox', { name: 'Ex:' }).waitFor({ state: 'visible' });
        await expect(page.getByRole('textbox', { name: 'Ex:' })).toBeVisible({ timeout: 60_000 });
        await page.getByRole('textbox', { name: 'Ex:' }).fill('123');
        await expect(page.getByRole('button', { name: 'تفعيل التطبيق' })).toBeVisible({ timeout: 60_000 });
        await page.getByRole('button', { name: 'تفعيل التطبيق' }).click();
        await page.getByRole('button', { name: 'تفعيل التطبيق' }).nth(1).click();
        //await expect(page.getByText('Updated application details')).toBeVisible({ timeout: 60_000 });
        await expect(page.getByText('تم تفعيل التطبيق')).toBeVisible({ timeout: 60_000 });
        await expect(page.getByRole('link', { name: 'افتح التطبيق' })).toBeVisible({ timeout: 60_000 });    
    }
    async DeactiveJSApp(page)
    { 
        await page.waitForTimeout(3000);
        await expect(page.getByRole('button', { name: 'الغاء تفعيل التطبيق' })).toBeVisible({ timeout: 60_000 });      
        await page.waitForTimeout(3000);
        await page.getByRole('button', { name: 'الغاء تفعيل التطبيق' }).scrollIntoViewIfNeeded();
        await page.getByRole('button', { name: 'الغاء تفعيل التطبيق' }).click();
        await page.waitForTimeout(3000);
        await page.getByRole('button', { name: 'الغاء التفعيل' }).scrollIntoViewIfNeeded();
        await page.getByRole('button', { name: 'الغاء التفعيل' }).click();
        await page.locator('label').filter({ hasText: 'أخرى' }).locator('span').click();
        await page.getByRole('button', { name: 'الغاء التفعيل' }).click();
        await page.getByRole('button', { name: 'Close modal' }).click();
        //await expect(page.getByRole('link', { name: 'فعل التطبيق' })).toBeVisible({ timeout: 60_000 })
    }
    async SortApps(page)
    {
        await page.getByRole('button', { name: 'جميع التطبيقات' }).click();
        await page.getByText('الأحدث').click();
    }
    async RateApp(page)
    {
        await page.getByRole('button', { name: 'قيم التطبيق' }).waitFor({ state: 'visible' });
        await page.getByRole('button', { name: 'قيم التطبيق' }).click();
        await page.locator(`(//div[@class="ed47b6fe"])[4]`).waitFor({ state: 'visible' });
        await page.locator(`(//div[@class="ed47b6fe"])[4]`).click();
        await page.locator('textarea').click();
        await page.locator('textarea').fill('update rate1');
        await page.getByRole('button', { name: 'قيم التطبيق' }).nth(1).click();
    }
}
module.exports = {P_AppMarketPages};