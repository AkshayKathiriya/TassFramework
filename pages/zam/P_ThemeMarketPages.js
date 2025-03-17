const {expect} = require('@playwright/test');
class P_ThemeMarketPages
{
    constructor(page){
        this.page = page;
    }
    async NaviatesToThemeMarket(page){
        await this.page.goto("https://testing-web.zid.sa/theme-market");
        // await expect(page.getByRole('link', { name: 'سوق الثيمات' })).toBeVisible({ timeout: 60_000 });
        // await page.getByRole('link', { name: 'سوق الثيمات' }).click();
        await expect(page.getByRole('heading', { name: 'سوق الثيمات' })).toBeVisible({ timeout: 60_000 });
    }
    async SearchByThemeName(page,ThemeName){
        await expect(page.locator('section').filter({ hasText: 'أهلا بك في سوق ثيمات زد سوق ثيمات زد يقدم مجموعة من الثيمات المخصصة والمتنوعة، ت' }).getByRole('button')).toBeVisible({ timeout: 60_000 });
        await page.locator('section').filter({ hasText: 'أهلا بك في سوق ثيمات زد سوق ثيمات زد يقدم مجموعة من الثيمات المخصصة والمتنوعة، ت' }).getByRole('button').click();
        await expect(page.getByText('سوق ثيمات زد')).toBeVisible({ timeout: 60_000 });
        await page.waitForTimeout(3000);
        await page.getByRole('searchbox', { name: 'البحث عن طريق الثيم، الشريك او التصنيف' }).fill(ThemeName);
        await page.getByRole('searchbox', { name: 'البحث عن طريق الثيم، الشريك او التصنيف' }).press('Enter');
        await page.waitForTimeout(3000);
        await expect(page.getByText(ThemeName)).toBeVisible({ timeout: 60_000 });   
        //await expect(page.locator(`//div[@class='e700f60a']`)).toBeVisible({ timeout: 60_000 });
         
    }
}
module.exports = {P_ThemeMarketPages};