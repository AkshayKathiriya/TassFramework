const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../../pages/md/LoginPage.js');
const {P_AppMarketPages} = require('../../pages/zam/P_AppMarketPages.js');
const dataset =  JSON.parse(JSON.stringify(require("../../data/zam-testing.json")));

test("Rate App",async({page})=>{
    //login
    test.setTimeout(150_000);
    const loginpage = new LoginPage(page);
    await loginpage.goToPD();
    await loginpage.enterUserEmail(dataset.userEmail);

    //active app
    const AppMarketpage = new P_AppMarketPages(page);
    await AppMarketpage.NavigatesToAppMarket();
    await AppMarketpage.SearchForApp(dataset.ActivatedAppName);
    await AppMarketpage.OpenAppDetailsPage(dataset.ActivatedAppName);
    await AppMarketpage.RateApp(page);

}); 