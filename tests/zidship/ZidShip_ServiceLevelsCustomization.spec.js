const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../../pages/md/LoginPage.js');
const {MainPage} = require('../../pages/zidship/MainPage.js');
const {ServiceLevelDetailsPage} = require('../../pages/zidship/ServiceLevelDetailsPage.js');
const {ServiceLevelCustomizationPage} = require('../../pages/zidship/ServiceLevelCustomizationPage.js');


const { log } = require('console');

const dataset =  JSON.parse(JSON.stringify(require("../../data/testing/zidship-testing.json")));

test.describe('CustomizeSLTCs', { tag: '@CustomizeSLs'}, () => {
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
        
        await mainpage.GoToServiceLevelDetailsPage();
        await serviceleveldetailspage.GoToDefaultCustomizationPage();
        await customizationpage.ChooseFixedRatePricing();
        await customizationpage.EnterShippingCost(dataset.ShippingCost);
        await customizationpage.ClickSaveBTN();
        await customizationpage.VerifyThatSuccessMessageDisplay();

        await page.reload();
        await mainpage.GoToZidShipPage();
        await mainpage.GoToActivatedServiceLevelsSection();
        await mainpage.DeactivateServiceLevel(dataset.Fast_ServiceLevel);
    });
});

test.describe('CustomizeSLTCs', { tag: '@CustomizeSLs' }, () => {
    test('CheckThatServiceLevelDetailsPageOpenCorrectly', async ({ page }) => {
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
        
        await mainpage.GoToServiceLevelDetailsPage();
        await serviceleveldetailspage.VerifyThatServiceLevelNameDisplaysCorrectly(dataset.Fast_ServiceLevel);

        await page.reload();
        await mainpage.GoToZidShipPage();
        await mainpage.GoToActivatedServiceLevelsSection();
        await mainpage.DeactivateServiceLevel(dataset.Fast_ServiceLevel);
    });
});    

test.describe('CustomizeSLTCs', { tag: '@CustomizeSLs'}, () => {
    test('AddNewFlateRateCustomizationForSpecificCity', async ({ page }) => {
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
        
        await mainpage.GoToServiceLevelDetailsPage();
        await serviceleveldetailspage.ClickOnAddNewCustomizationBTN();

        await customizationpage.ChooseSpecificCity(dataset.Riyadh_City);
        await customizationpage.ChooseFixedRatePricing();
        await customizationpage.EnterCustomizationName(dataset.NewCustomizationName);
        await customizationpage.EnterShippingCost(dataset.ShippingCost);
        await customizationpage.ClickOnAddCustomizationBTN();
        await customizationpage.VerifyThatSuccessMessageDisplay();

        await mainpage.GoToZidShipPage();
        await mainpage.GoToImmidiateRecieveFrom();
        await mainpage.GoToServiceLevelDetailsPage();
        await serviceleveldetailspage.ResetServiceLevel();            

        await mainpage.GoToZidShipPage();
        await mainpage.GoToActivatedServiceLevelsSection();
        await mainpage.DeactivateServiceLevel(dataset.Fast_ServiceLevel);
    });
});

test.describe('CustomizeSLTCs', { tag: '@CustomizeSLs' }, () => {
    test('DeleteCustomizationFromServiceLevelDetailsPage', async ({ page }) => {
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
        
        await mainpage.GoToServiceLevelDetailsPage();
        await serviceleveldetailspage.ClickOnAddNewCustomizationBTN();

        await customizationpage.ChooseSpecificCity(dataset.Riyadh_City);
        await customizationpage.ChooseFixedRatePricing();
        await customizationpage.EnterCustomizationName(dataset.NewCustomizationName);
        await customizationpage.EnterShippingCost(dataset.ShippingCost);
        await customizationpage.ClickOnAddCustomizationBTN();
        await customizationpage.VerifyThatSuccessMessageDisplay();

        // Delete Customization
        await serviceleveldetailspage.VerifyThatCustomizationDisplayCorrectlyInServiceLevelDetailsPage(dataset.NewCustomizationName);
        await serviceleveldetailspage.DeleteCustomization();

        await serviceleveldetailspage.ResetServiceLevel();            

        await mainpage.GoToZidShipPage();
        await mainpage.GoToActivatedServiceLevelsSection();
        await mainpage.DeactivateServiceLevel(dataset.Fast_ServiceLevel);
    });
});


test.describe('CustomizeSLTCs', { tag: '@CustomizeSLs'}, () => {
    test('VerifyThatCustomizationDisplaysInServiceLevelDetailsPage', async ({ page }) => {
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
        
        await mainpage.GoToServiceLevelDetailsPage();
        await serviceleveldetailspage.ClickOnAddNewCustomizationBTN();

        await customizationpage.ChooseSpecificCity(dataset.Riyadh_City);
        await customizationpage.ChooseFixedRatePricing();
        await customizationpage.EnterCustomizationName(dataset.NewCustomizationName);
        await customizationpage.EnterShippingCost(dataset.ShippingCost);
        await customizationpage.ClickOnAddCustomizationBTN();
        await customizationpage.VerifyThatSuccessMessageDisplay();
        await serviceleveldetailspage.VerifyThatCustomizationDisplayCorrectlyInServiceLevelDetailsPage(dataset.NewCustomizationName);

        await serviceleveldetailspage.ResetServiceLevel();            

        await mainpage.GoToZidShipPage();
        await mainpage.GoToActivatedServiceLevelsSection();
        await mainpage.DeactivateServiceLevel(dataset.Fast_ServiceLevel);
    });
});


test.describe('CustomizeSLTCs', { tag: ['@CustomizeSLs' , "@Test"]}, () => {
    test('ActivateCODFromDefaultPageForSpecificServiceLevel', async ({ page }) => {
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
        
        // Activate COD
        await mainpage.GoToServiceLevelDetailsPage();
        await serviceleveldetailspage.GoToDefaultCustomizationPage();
        await customizationpage.ActivateCODOptionAndSetAmount();
        await customizationpage.EnterCODAmount(dataset.COD_Amount);
        await customizationpage.ClickSaveBTN();
        
        // Reset Service Level
        await mainpage.GoToZidShipPage();
        await mainpage.GoToServiceLevelDetailsPage();
        await serviceleveldetailspage.ResetServiceLevel();            

        await mainpage.GoToZidShipPage();
        await mainpage.GoToActivatedServiceLevelsSection();
        await mainpage.DeactivateServiceLevel(dataset.Fast_ServiceLevel);
    });
});