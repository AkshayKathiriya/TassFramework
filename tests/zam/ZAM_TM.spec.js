const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../../pages/md/LoginPage.js');
const {P_ThemeMarketPages} = require('../../pages/zam/P_ThemeMarketPages');
const { log } = require('console');
const dataset =  JSON.parse(JSON.stringify(require("../../data/testing/zam-testing.json")));
let webContext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginpage = new LoginPage(page);
    await loginpage.goTo();
    await loginpage.enterUserEmail(dataset.userEmail);
    await loginpage.enterOTP();
    await loginpage.HomePageDisplays();
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });
})

test.describe('Theme Market', { tag: '@TMTC1' }, () => {
    test("Search for published theme",async({})=>{
        test.setTimeout(90_000);
        const page = await webContext.newPage();
        const ThemeMarket = new P_ThemeMarketPages(page);

        await ThemeMarket.NaviatesToThemeMarket(page);
        await ThemeMarket.SearchByThemeName(page,dataset.ThemeName);    //search for themes

    }); 
});