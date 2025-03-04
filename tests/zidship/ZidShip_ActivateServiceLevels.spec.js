const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../../pages/md/LoginPage.js');
const {MainPage} = require('../../pages/zidship/MainPage.js');
const { log } = require('console');

const dataset =  JSON.parse(JSON.stringify(require("../../data/testing/zidship-testing.json")));
let webContext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginpage = new LoginPage(page);
    await loginpage.goTo();
    await loginpage.enterUserEmail(dataset.ZidShipUserEmail);
    await loginpage.enterOTP();
    await loginpage.HomePageDisplays();
    await context.storageState({ path: 'zidship-activatesl-state.json' });
    webContext = await browser.newContext({ storageState: 'zidship-activatesl-state.json' });

})

test.describe('ActivateSLTCs', { tag: '@ActivateSLs' }, () => {
  test("ActivateServiceLevel",async()=>{
    const page = await webContext.newPage();
    const mainpage = new MainPage(page);
    viewport: null;
    await mainpage.GoToZidShipPage();
    await mainpage.GoTo1stMileServiceLevelSection();
    await mainpage.ActivateServiceLevel(dataset.NoRush_ServiceLevel);
    await mainpage.ClosePopUpfromXButton();
    await page.reload();
    await mainpage.GoToActivatedServiceLevelsSection;
    await mainpage.CheckThatActivatedServiceLevelDisplaysInActivatedSLSection(dataset.NoRush_ServiceLevel);

    await mainpage.GoToZidShipPage();
    await mainpage.GoToActivatedServiceLevelsSection;
    await mainpage.DeactivateServiceLevel(dataset.NoRush_ServiceLevel);
    });
});

test.describe('ZidShip', { tag: '@ActivateSLs' }, () => {
    test("DeactivateServiceLevel",async({})=>{
    const page = await webContext.newPage();
    const mainpage = new MainPage(page);
    //viewport: null;

    await mainpage.GoToZidShipPage();

    await mainpage.GoToImmidiateRecieveFrom();
    await mainpage.ActivateServiceLevel(dataset.Fast_ServiceLevel);
    await mainpage.ClosePopUpfromXButton();

    await page.reload();
    await mainpage.GoToActivatedServiceLevelsSection;
    await mainpage.DeactivateServiceLevel(dataset.Fast_ServiceLevel);

});
});
test.describe('ZidShip', { tag: '@ActivateSLs' } , () => {
    test("VerifyThatMerchantUnableToDeactivateReversedServiceLevel",async({})=>{

    const page = await webContext.newPage();
    const mainpage = new MainPage(page);
    //viewport: null;
    await mainpage.GoToZidShipPage();
    await mainpage.GoToActivatedServiceLevelsSection();
    await mainpage.ActivateServiceLevel(dataset.ReversedServiceLevel);
    await mainpage.ReverseServiceLevelUnableToBeDeactivated();
});
});

    
