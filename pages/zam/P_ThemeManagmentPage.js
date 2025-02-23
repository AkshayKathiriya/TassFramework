const {expect} = require('@playwright/test');
class P_ThemeManagmentPage
{
    constructor(page){
        this.page = page;
    }
    async NavigatesToThemeManagmentPage(page){
        await this.page.goto('https://develop.zam-partner-dashboard.pages.dev/dashboard');
        await expect(page.getByRole('heading', { name: 'My Themes' })).toBeVisible({ timeout: 60_000 });
        await page.getByRole('heading', { name: 'My Themes' }).click();
        await page.getByRole('link', { name: 'Themes Management' }).click();
        await expect(page.getByRole('heading', { name: 'Themes Management' })).toBeVisible({ timeout: 60_000 });
    }
    async CreateNewTheme(page,ThemeNameAR,ThemeNameEN){
        await page.getByRole('button', { name: 'Create new theme' }).click();
        await expect(page.locator('input[name="theme name ar"]')).toBeVisible({ timeout: 60_000 });
        await page.locator('input[name="theme name ar"]').fill(ThemeNameAR);
        await page.locator('input[name="theme name en"]').fill(ThemeNameEN);
        await page.getByRole('button', { name: 'Create theme' }).click();
        await expect(page.getByText('New theme record has been')).toBeVisible({ timeout: 60_000 });
        await expect(page.getByRole('heading', { name: ThemeNameEN })).toBeVisible({ timeout: 60_000 });
    }
    async DeleteCreatedTheme(page,ThemeNameEN){
        await page.getByRole('link', { name: 'Themes managment' }).click();
        await expect(page.getByRole('heading', { name: 'Themes Management' })).toBeVisible({ timeout: 60_000 });
        //await page.getByRole('img', { name: 'delete' }).click();
        //await page.getByRole('button', { name: 'Confirm Delete' }).click();
        await page.locator(`//tr[contains(@class,"zid-table-row")][descendant::p[contains(text(),"${ThemeNameEN}")]]//div[@id="theme-list-delete-theme-action"]`).click();
        await page.getByRole('button', { name: 'Confirm Delete' }).click();
        await expect(page.getByText('The theme has been deleted')).toBeVisible({ timeout: 60_000 });
    }
}
module.exports = {P_ThemeManagmentPage};