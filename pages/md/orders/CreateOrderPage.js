const {expect} = require('@playwright/test');
const clickWithRetry = require('../../../utils/clickWithRetry');

class CreateOrderPage
{
    constructor(page)
    {
        this.page = page;
        this.currencyDDL = page.locator('//select[@name="currency"]');
        this.productsList = page.getByRole('textbox', { name: 'بحث في المنتجات' });
        this.productsSearchField = page.locator('//div[@class="zid-modal"]//input[@placeholder="بحث في المنتجات"]');
        this.addProductsButton = page.locator('//button//span[contains(text(),"إضافة المنتجات المختارة")]');
    
    }

    async selectCurrency(orderCurrency)
    {
        await expect(this.currencyDDL).toBeVisible();
        await this.currencyDDL.selectOption(orderCurrency);
    }

    async selectSimpleProduct(orderProductName)
    {
        await expect(this.productsList).toBeVisible();
        await this.productsList.click();
        await this.productsSearchField.click();
        await this.productsSearchField.fill(orderProductName);
        await expect(this.page.locator(`//p[text()="${orderProductName}"]/parent::div/child::div`)).toBeVisible();
        await this.page.locator(`//p[text()="${orderProductName}"]/parent::div/child::div`).click();
        await expect(this.addProductsButton).toBeVisible();
        await this.addProductsButton.click();
        await expect(this.page.getByText('${orderProductName}')).toBeVisible();
    }
    async clickNext(){
        await this.page.getByRole('button', { name: 'التالي' }).click();
    }

    async testall()
    {

    
    //await page.locator('div').filter({ hasText: /^استعراض$/ }).getByPlaceholder('بحث في المنتجات').press('Escape');
    //await expect(page.getByRole('textbox', { name: 'بحث في المنتجات' })).toBeVisible();
    //await page.getByRole('textbox', { name: 'بحث في المنتجات' }).click();
    //await page.locator('.d5cf0c08').first().click();
    //await page.locator('div:nth-child(2) > .b07046d5 > .d5cf0c08').click();
    await expect(page.getByText('نسخة من نسخة من منتج ربط بالوصف')).toBeVisible();
    await page.getByRole('button', { name: 'التالي' }).click();
    await expect(page.getByRole('heading', { name: 'اختر أو أنشئ عميل' })).toBeVisible();
    await page.getByRole('textbox', { name: 'ابحث بالاسم او رقم الجوال' }).click();
    await page.getByRole('textbox', { name: 'ابحث بالاسم او رقم الجوال' }).fill('test');
    await page.getByText('test check').click();
    await page.locator('label').first().click();
    await page.getByRole('button', { name: 'التالي' }).click();
    await expect(page.getByRole('heading', { name: 'اختر  طريقة الشحن' })).toBeVisible();
    await page.locator('label').filter({ hasText: 'توصيل إلى الموقع' }).locator('label').click();
    await page.getByRole('combobox').selectOption('1338');
    await expect(page.locator('label').filter({ hasText: 'تحويل بنكي' }).locator('div').first()).toBeVisible();
    await page.locator('label').filter({ hasText: 'تحويل بنكي' }).locator('label').click();
    await page.getByRole('button', { name: 'التالي' }).click();
    await expect(page.locator('.zid-toaster-wrapper').first()).toBeVisible();
    await page.getByRole('button', { name: 'تأكيد الطلب' }).click();
    await expect(page.getByRole('heading', { name: 'تفاصيل الطلب' })).toBeVisible();
    
    }

}
module.exports = {CreateOrderPage};
