const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../../pages/md/LoginPage.js');
const {MainPage} = require('../../pages/zidship/MainPage.js');
const {ServiceLevelDetailsPage} = require('../../pages/zidship/ServiceLevelDetailsPage.js');
const {ServiceLevelCustomizationPage} = require('../../pages/zidship/ServiceLevelCustomizationPage.js');


const { log } = require('console');

const dataset =  JSON.parse(JSON.stringify(require("../../data/testing/zidship-testing.json")));
let webContext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginpage = new LoginPage(page);
    const mainpage = new MainPage(page);
    const serviceleveldetailspage = new ServiceLevelDetailsPage(page);
    const customizationpage = new ServiceLevelCustomizationPage(page);

    await loginpage.goTo();
    await loginpage.enterUserEmail(dataset.ZidShipUserEmail);
    await loginpage.enterOTP();
    await loginpage.HomePageDisplays();
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });

    await mainpage.GoToZidShipPage();
    await mainpage.GoToImmidiateRecieveFrom();
    await mainpage.ActivateServiceLevel(dataset.Fast_ServiceLevel);
    await mainpage.ClosePopUpfromXButton();
})

test.afterAll(async ({}) => {
    const page = await webContext.newPage();
    const mainpage = new MainPage(page);
    const serviceleveldetailspage = new ServiceLevelDetailsPage(page);
    const customizationpage = new ServiceLevelCustomizationPage(page);

    await mainpage.GoToZidShipPage();
    await mainpage.GoToActivatedServiceLevelsSection();
    await mainpage.DeactivateServiceLevel(dataset.Fast_ServiceLevel);
})

test.describe('CustomizeSLTCs', { tag: ['@CustomizeSLs']}, () => {
    test('EditDefaultPrice_FlateRate', async ({}) => {
        const page = await webContext.newPage();
        const mainpage = new MainPage(page);
        const serviceleveldetailspage = new ServiceLevelDetailsPage(page);
        const customizationpage = new ServiceLevelCustomizationPage(page);

        await mainpage.GoToZidShipPage();
        await mainpage.GoToImmidiateRecieveFrom();
        await mainpage.GoToServiceLevelDetailsPage();
        await serviceleveldetailspage.GoToDefaultCustomizationPage();
        await customizationpage.ChooseFixedRatePricing();
        await customizationpage.EnterShippingCost(dataset.ShippingCost_SAR);
        await customizationpage.ClickSaveBTN();
        await customizationpage.VerifyThatSuccessMessageDisplay();

    });
});

test.describe('CustomizeSLTCs', { tag: ['@CustomizeSLs']}, () => {
    test('CheckThatServiceLevelDetailsPageOpenCorrectly', async ({}) => {
        const page = await webContext.newPage();
        const mainpage = new MainPage(page);
        const serviceleveldetailspage = new ServiceLevelDetailsPage(page);
        const customizationpage = new ServiceLevelCustomizationPage(page);

        await mainpage.GoToZidShipPage();    
        await mainpage.GoToImmidiateRecieveFrom();
        await mainpage.GoToServiceLevelDetailsPage();
        await serviceleveldetailspage.VerifyThatServiceLevelNameDisplaysCorrectly(dataset.Fast_ServiceLevel);

    });
});    

test.describe('CustomizeSLTCs', { tag: ['@CustomizeSLs']}, () => {
    test('AddNewFlateRateCustomizationForSpecificCity', async ({}) => {
        const page = await webContext.newPage();
        const mainpage = new MainPage(page);
        const serviceleveldetailspage = new ServiceLevelDetailsPage(page);
        const customizationpage = new ServiceLevelCustomizationPage(page);

        await mainpage.GoToZidShipPage();      
        await mainpage.GoToImmidiateRecieveFrom();

        await mainpage.GoToServiceLevelDetailsPage();
        await serviceleveldetailspage.ClickOnAddNewCustomizationBTN();

        await customizationpage.ChooseSpecificCity(dataset.Riyadh_City);
        await customizationpage.ChooseFixedRatePricing();
        await customizationpage.EnterCustomizationName(dataset.NewCustomizationName_FlateRate);
        await customizationpage.EnterShippingCost(dataset.ShippingCost_SAR);
        await customizationpage.ClickOnAddCustomizationBTN();
        await customizationpage.VerifyThatSuccessMessageDisplay();

        await mainpage.GoToZidShipPage();
        await mainpage.GoToImmidiateRecieveFrom();
        await mainpage.GoToServiceLevelDetailsPage();
        await serviceleveldetailspage.ResetServiceLevel();            

    });
});

test.describe('CustomizeSLTCs', { tag: ['@CustomizeSLs']}, () => {
    test('DeleteCustomizationFromServiceLevelDetailsPage', async ({}) => {
        const page = await webContext.newPage();
        const mainpage = new MainPage(page);
        const serviceleveldetailspage = new ServiceLevelDetailsPage(page);
        const customizationpage = new ServiceLevelCustomizationPage(page);

        await mainpage.GoToZidShipPage();
        await mainpage.GoToImmidiateRecieveFrom();

        await mainpage.GoToServiceLevelDetailsPage();
        await serviceleveldetailspage.ClickOnAddNewCustomizationBTN();

        await customizationpage.ChooseSpecificCity(dataset.Riyadh_City);
        await customizationpage.ChooseFixedRatePricing();
        await customizationpage.EnterCustomizationName(dataset.NewCustomizationName);
        await customizationpage.EnterShippingCost(dataset.ShippingCost_SAR);
        await customizationpage.ClickOnAddCustomizationBTN();
        await customizationpage.VerifyThatSuccessMessageDisplay();

        // Delete Customization
        await serviceleveldetailspage.VerifyThatCustomizationDisplayCorrectlyInServiceLevelDetailsPage(dataset.NewCustomizationName);
        await serviceleveldetailspage.DeleteCustomization();

        await serviceleveldetailspage.ResetServiceLevel();            
    });
});


test.describe('CustomizeSLTCs', { tag: ['@CustomizeSLs']}, () => {
    test('VerifyThatCustomizationDisplaysInServiceLevelDetailsPage', async ({}) => {
        const page = await webContext.newPage();
        const mainpage = new MainPage(page);
        const serviceleveldetailspage = new ServiceLevelDetailsPage(page);
        const customizationpage = new ServiceLevelCustomizationPage(page);

        await mainpage.GoToZidShipPage();    
        await mainpage.GoToImmidiateRecieveFrom();

        await mainpage.GoToServiceLevelDetailsPage();
        await serviceleveldetailspage.ClickOnAddNewCustomizationBTN();

        await customizationpage.ChooseSpecificCity(dataset.Riyadh_City);
        await customizationpage.ChooseFixedRatePricing();
        await customizationpage.EnterCustomizationName(dataset.NewCustomizationName);
        await customizationpage.EnterShippingCost(dataset.ShippingCost_SAR);
        await customizationpage.ClickOnAddCustomizationBTN();
        await customizationpage.VerifyThatSuccessMessageDisplay();
        await serviceleveldetailspage.VerifyThatCustomizationDisplayCorrectlyInServiceLevelDetailsPage(dataset.NewCustomizationName);

        await serviceleveldetailspage.ResetServiceLevel();            
    });
});


test.describe('CustomizeSLTCs', { tag: ['@CustomizeSLs']}, () => {
    test('ActivateCODFromDefaultPageForSpecificServiceLevel', async ({}) => {
        const page = await webContext.newPage();
        const mainpage = new MainPage(page);
        const serviceleveldetailspage = new ServiceLevelDetailsPage(page);
        const customizationpage = new ServiceLevelCustomizationPage(page);

        await mainpage.GoToZidShipPage();
        await mainpage.GoToImmidiateRecieveFrom();

        // Activate COD
        await mainpage.GoToServiceLevelDetailsPage();
        await serviceleveldetailspage.GoToDefaultCustomizationPage();
        await customizationpage.ChooseFixedRatePricing();
        await customizationpage.ActivateCODOption();
        await customizationpage.EnterCODAmount(dataset.COD_Amount_SAR);
        await customizationpage.ClickSaveBTN();
        
        // Reset Service Level
        await mainpage.GoToZidShipPage();
        await mainpage.GoToImmidiateRecieveFrom();
        await mainpage.GoToServiceLevelDetailsPage();
        await serviceleveldetailspage.ResetServiceLevel();            
    });
});


test.describe('CustomizeSLTCs', { tag: ['@CustomizeSLs' , '@Test']}, () => {
    test('AddNewWeightBasedCustomization', async ({}) => {
        const page = await webContext.newPage();
        const mainpage = new MainPage(page);
        const serviceleveldetailspage = new ServiceLevelDetailsPage(page);
        const customizationpage = new ServiceLevelCustomizationPage(page);

        await mainpage.GoToZidShipPage();
        await mainpage.GoToImmidiateRecieveFrom();

        await mainpage.GoToServiceLevelDetailsPage();
        await serviceleveldetailspage.ClickOnAddNewCustomizationBTN();
        await customizationpage.ChooseWeightBasedPricing();
        await customizationpage.EnterCustomizationName(dataset.NewCustomizationName_WeightBased);
        await customizationpage.EnterShippingCost(dataset.ShippingCost_SAR);
        await customizationpage.ChooseSpecificCity(dataset.Riyadh_City);
        await customizationpage.EnterMaximumWeight(dataset.MaximumWeight_KG);
        await customizationpage.EnterCostForMaximumWeight(dataset.CostOfMaxiumuWeight_SAR);

        await customizationpage.EnterWightThatCostWillBeCalculatedForEachExtraKGWight(dataset.WeightThatCostWillBeCalculatedFor_KG);
        await customizationpage.ClickOnAddCustomizationBTN();
        await customizationpage.VerifyThatSuccessMessageDisplay();
        // Reset Service Level
        await mainpage.GoToZidShipPage();
        await mainpage.GoToImmidiateRecieveFrom();
        await mainpage.GoToServiceLevelDetailsPage();
        await serviceleveldetailspage.ResetServiceLevel();            
    });
});