const {expect} = require('@playwright/test');
class OrdersPage
{
    constructor(page)
    {
        this.page = page;
        this.createOrderButton = page.getByRole('button', { name: 'إنشاء طلب جديد' });
    
    }

    async goToCreateOrderPage()
    {
    await expect(this.createOrderButton).toBeVisible();
    await this.createOrderButton.click();
    await this.page.waitForURL("**/orders/create/**");
    }
}
module.exports = {OrdersPage};