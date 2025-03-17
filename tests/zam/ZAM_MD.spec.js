const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../../pages/md/LoginPage.js');
const {P_AppMarketPages} = require('../../pages/zam/P_AppMarketPages.js');
const { log } = require('console');
const dataset =  JSON.parse(JSON.stringify(require("../../data/testing/zam-testing.json")));
let webContext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginpage = new LoginPage(page);
    await loginpage.goTo();
    await loginpage.enterUserEmail(dataset.usrerEmail2);
    await loginpage.enterOTP();
    await loginpage.HomePageDisplays();
    await context.storageState({ path: 'zam-md-state.json' });
    webContext = await browser.newContext({ storageState: 'zam-md-state.json' });
})

test.describe('Active Apps', { tag: '@ZAMTC1' }, () => {
    test("Active Free App",async({})=>{
        test.setTimeout(90_000);
        const page = await webContext.newPage();
        const AppMarketpage = new P_AppMarketPages(page);
        
        await AppMarketpage.NavigatesToAppMarket();    //active app
        await AppMarketpage.SearchForApp(dataset.FreeAppName);
        await AppMarketpage.OpenAppDetailsPage(page,dataset.FreeAppName);
        await AppMarketpage.activeApp(page);
        await AppMarketpage.DeactiveApp(page);
    });  
});  

test.describe('Active Apps', { tag: '@ZAMTC2' }, () => {
    test("Active js apps",async({})=>{
        test.setTimeout(90_000);
        const page = await webContext.newPage();
        const AppMarketpage = new P_AppMarketPages(page);

        await AppMarketpage.NavigatesToAppMarket();    //active app
        await AppMarketpage.SearchForApp(dataset.JSAppName);
        await AppMarketpage.OpenAppDetailsPage(page,dataset.JSAppName);
        await AppMarketpage.ActiveJSApp(page);
        await AppMarketpage.DeactiveJSApp(page);
    }); 
});

test.describe('Active Apps', { tag: '@ZAMTC3' }, () => {
    test("Rate App",async({})=>{
        test.setTimeout(90_000);
        const page = await webContext.newPage();
        const AppMarketpage = new P_AppMarketPages(page);

        await AppMarketpage.NavigatesToAppMarket(); //rate app
        await AppMarketpage.SearchForApp(dataset.ActivatedAppName);
        await AppMarketpage.OpenAppDetailsPage(page,dataset.ActivatedAppName);
        await AppMarketpage.RateApp(page);
    }); 
});

test.describe('Active Apps', { tag: '@ZAMTC4' }, () => {
    test("Sort apps results",async({})=>{
        test.setTimeout(90_000);
        const page = await webContext.newPage();
        const AppMarketpage = new P_AppMarketPages(page);

        await AppMarketpage.NavigatesToAppMarket();    //sort app
        await AppMarketpage.OpenApplicationAndCategoriesPage(page);
        await AppMarketpage.SortApps(page);
    });
});