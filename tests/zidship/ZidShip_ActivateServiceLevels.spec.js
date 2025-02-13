const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../../pages/md/LoginPage.js');
const {MainPage} = require('../../pages/zidship/MainPage.js');
const { log } = require('console');

const dataset =  JSON.parse(JSON.stringify(require("../../data/zidship-testing.json")));

test("ActivateServiceLevel",async({page})=>{
    const loginpage = new LoginPage(page);
    const mainpage = new MainPage(page);
    viewport: null;

    await loginpage.goTo();
    await loginpage.enterUserEmail(dataset.ZidShipUserEmail);
    await loginpage.enterOTP();
    await loginpage.HomePageDisplays();

    await mainpage.GoToZidShipPage();
    await mainpage.GoToImmidiateRecieveFrom();
    await mainpage.ActivateServiceLevel(dataset.Fast_ServiceLevel);
    await mainpage.ClosePopUpfromXButton();
    await page.reload();
    await mainpage.GoToActivatedServiceLevelsSection;
    await mainpage.CheckThatActivatedServiceLevelDisplaysInActivatedSLSection(dataset.Fast_ServiceLevel);

    await mainpage.DeactivateServiceLevel(dataset.Fast_ServiceLevel);    

}),

test("DeactivateServiceLevel",async({page})=>{
    const loginpage = new LoginPage(page);
    const mainpage = new MainPage(page);
    viewport: null;

    await loginpage.goTo();
    await loginpage.enterUserEmail(dataset.ZidShipUserEmail);
    await loginpage.enterOTP();
    await loginpage.HomePageDisplays();

    await mainpage.GoToZidShipPage();

    await mainpage.GoToImmidiateRecieveFrom();
    await mainpage.ActivateServiceLevel(dataset.Fast_ServiceLevel);
    await mainpage.ClosePopUpfromXButton();

    await page.reload();
    await mainpage.GoToActivatedServiceLevelsSection;
    await mainpage.DeactivateServiceLevel(dataset.Fast_ServiceLevel);

}),

test("VerifyThatMerchantUnableToDeactivateReversedServiceLevel",async({page})=>{
    const loginpage = new LoginPage(page);
    const mainpage = new MainPage(page);
    viewport: null;

    await loginpage.goTo();
    await loginpage.enterUserEmail(dataset.ZidShipUserEmail);
    await loginpage.enterOTP();
    await loginpage.HomePageDisplays();

    await mainpage.GoToZidShipPage();
    await mainpage.GoToActivatedServiceLevelsSection();
    await mainpage.ActivateServiceLevel(dataset.ReversedServiceLevel);
    await mainpage.ReverseServiceLevelUnableToBeDeactivated();
});
