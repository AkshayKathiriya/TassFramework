//const {test, expec} = require('@playwright/test');
const {test} = require('../../../fixtures/testDataFixture.js');


const {LoginPage} = require('../../../pages/md/LoginPage.js');
const {HomePage} = require('../../../pages/md/HomePage.js');
const {OrdersPage} = require('../../../pages/md/orders/OrdersPage.js');
const {CreateOrderPage} = require('../../../pages/md/orders/CreateOrderPage.js');

let webContext;

test.beforeAll(async ({ browser, testData }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginpage = new LoginPage(page);
    await loginpage.goTo();
    await loginpage.enterUserEmail(testData.userEmail);
    await loginpage.enterOTP();
    await loginpage.HomePageDisplays();
    await context.storageState({ path: 'orderstate.json' });
    webContext = await browser.newContext({ storageState: 'orderstate.json' });

})

test("CreateOrderWithSimpleProductFromMD", async({testData})=> {
    const page = await webContext.newPage();
    const homePage = new HomePage(page);
    const ordersPage = new OrdersPage(page);
    const createOrderPage = new CreateOrderPage(page);
    await homePage.goToHome();
    await homePage.goToOrders();
    await ordersPage.goToCreateOrderPage();
    await createOrderPage.selectCurrency(testData.orderCurrency);
    await createOrderPage.selectSimpleProduct(testData.orderProductName);
    await createOrderPage.clickNext();
});