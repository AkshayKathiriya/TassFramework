const {test, expect} = require('@playwright/test');
const {P_LoginToPD} = require('../../pages/zam/P_LoginToPD.js');
const {P_CreateApp} = require('../../pages/zam/P_CreateApp.js');
const dataset =  JSON.parse(JSON.stringify(require("../../data/testing/zam-testing.json")));

test("CreatFreeApplication",async({page})=>{
    test.setTimeout(150_000);
    const LoginToPD = new P_LoginToPD(page);    //login
    await LoginToPD.goToPD();
    await LoginToPD.enterUserEmail(dataset.ZAMuserEmail);
    await LoginToPD.enterUserPassword(dataset.ZAMuserPassword);
    await LoginToPD.clickLoginButton();

    const CreateApp = new P_CreateApp(page);    //create app
    await CreateApp.naviagtesToMyAppsPage(page);    
    await CreateApp.AddGeneralData(page,dataset.AppnameEN,dataset.AppnameAR,dataset.AppURL,dataset.AppCategory,dataset.AppLanguage,dataset.MaintainerEmail);    ///1.general data step
    await CreateApp.AddGeneralSettings(dataset.AppscopeDescription);    //2.App Descrioption
    await CreateApp.AddApplicationDetails(page,dataset.AppWebsite,dataset.AppRedirectURL,dataset.AppCallbackURL,dataset.AppLongDescriptionEN,dataset.AppLongDescriptionAR,  //3.app details
    dataset.AppShortDescriptionEN,dataset.AppShortDescriptionAR,dataset.AppDevelopberNameEN,dataset.AppDevelopberNameAR);
    
    await CreateApp.DeleteNewApp(page,dataset.AppnameEN); //delete created app
});