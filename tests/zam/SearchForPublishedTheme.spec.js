const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../../pages/md/LoginPage.js');
const {P_ThemeMarketPages} = require('../../pages/zam/P_ThemeMarketPages.js');
const dataset =  JSON.parse(JSON.stringify(require("../../data/zam-testing.json")));

test("Search for published theme",async({page})=>{
    //login
    test.setTimeout(150_000);
    const loginpage = new LoginPage(page);
    await loginpage.goTo();
    await loginpage.enterUserEmail(dataset.userEmail);

    //search for themes
    const ThemeMarket = new P_ThemeMarketPages(page);
    await ThemeMarket.NaviatesToThemeMarket(page);
    await ThemeMarket.NaviatesToThemeMarket(dataset.ThemeName);

});       