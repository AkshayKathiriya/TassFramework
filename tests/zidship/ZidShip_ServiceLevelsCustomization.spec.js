const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../../pages/md/LoginPage.js');
const {MainPage} = require('../../pages/zidship/MainPage.js');
const {ServiceLevelDetailsPage} = require('../../pages/zidship/ServiceLevelDetailsPage.js');
const {ServiceLevelCustomizationPage} = require('../../pages/zidship/ServiceLevelCustomizationPage.js');


const { log } = require('console');

const dataset =  JSON.parse(JSON.stringify(require("../../data/zidship-testing.json")));

test.describe('CustomizeSLTCs', { tag: ['@CustomizeSLs', '@Test'] }, () => {
    test('EditDefaultPrice_FlateRate', async ({ page }) => {
        const loginpage = new LoginPage(page);
        const mainpage = new MainPage(page);
        const serviceleveldetailspage = new ServiceLevelDetailsPage(page);
        const customizationpage = new ServiceLevelCustomizationPage(page);

        await loginpage.goTo();
        await loginpage.enterUserEmail(dataset.ZidShipUserEmail);
        await loginpage.enterOTP();
        await loginpage.HomePageDisplays();

        await mainpage.GoToZidShipPage();
        await mainpage.GoToImmidiateRecieveFrom();
        await mainpage.ActivateServiceLevel(dataset.Fast_ServiceLevel);
        await mainpage.ClosePopUpfromXButton();
        await page.reload();
        await serviceleveldetailspage.GoToDefaultCustomizationPage();
        await customizationpage.ChooseFixedRatePricing();
        await customizationpage.EnterShippingCost(dataset.ShippingCost);
        await customizationpage.ClickSaveBTN();

        await mainpage.GoToZidShipPage();
        await mainpage.GoToActivatedServiceLevelsSection();
        await mainpage.DeactivateServiceLevel(dataset.Fast_ServiceLevel);
    });
});