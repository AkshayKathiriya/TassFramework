const {expect} = require('@playwright/test');
const clickWithRetry = require('../../utils/clickWithRetry');
class HomePage {
    constructor(page)
    {
        this.page = page;
        this.ordersDDL = page.locator('a').filter({ hasText: /^الطلبات$/ });
        this.ordersButton = page.locator('a').filter({ hasText: 'الطلبات' }).nth(1);
    }
    async goToHome(){
        await this.page.goto("https://testing-web.zid.sa/home");
    }
    async goToOrders()
    {
        await expect(this.ordersDDL).toBeVisible();
        await this.ordersDDL.click();
        await expect(this.ordersButton).toBeVisible();
        await this.ordersButton.click();
        await this.page.waitForURL("**/orders");
    }


}module.exports = {HomePage};