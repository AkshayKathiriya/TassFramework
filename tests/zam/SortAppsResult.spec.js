const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../../pages/md/LoginPage.js');
const {P_AppMarketPages} = require('../../pages/zam/P_AppMarketPages.js');
const dataset =  JSON.parse(JSON.stringify(require("../../data/testing/zam-testing.json")));

test("Sort apps results",async({page})=>{
    //login
    test.setTimeout(150_000);
    const loginpage = new LoginPage(page);
    await loginpage.goTo();
    await loginpage.enterUserEmail(dataset.userEmail);
    await loginpage.enterOTP();
    await loginpage.HomePageDisplays();

    //active app
    const AppMarketpage = new P_AppMarketPages(page);
    await AppMarketpage.NavigatesToAppMarket();
    await AppMarketpage.OpenApplicationAndCategoriesPage(page);
    await AppMarketpage.SortApps(page);




}); 