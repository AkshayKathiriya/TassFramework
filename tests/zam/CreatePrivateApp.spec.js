const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../../pages/md/LoginPage.js');
const {P_LoginToPD} = require('../../pages/zam/P_LoginToPD.js');
const {P_CreateApp} = require('../../pages/zam/P_CreateApp.js');
const {P_AppMarketPages} = require('../../pages/zam/P_AppMarketPages.js');
const dataset =  JSON.parse(JSON.stringify(require("../../data/zam-testing.json")));

test("Create Private App",async({page})=>{
    test.setTimeout(150_000);
    //1.login to create app
    const LoginToPD = new P_LoginToPD(page);  
    await LoginToPD.goToPD();
    await LoginToPD.enterUserEmail(dataset.ZAMuserEmail);
    await LoginToPD.enterUserPassword(dataset.ZAMuserPassword);
    await LoginToPD.clickLoginButton();

    //2.Create private app
    const CreateApp = new P_CreateApp(page);    //create app
    await CreateApp.naviagtesToMyAppsPage(page);    
    await CreateApp.AddGeneralData(page,dataset.PrivateAppnameEN,dataset.PrivateAppnameAR,dataset.AppURL,dataset.AppCategory,dataset.AppLanguage,dataset.MaintainerEmail);    ///1.general data step
    await CreateApp.AddGeneralSettings(dataset.AppscopeDescription);    //2.App Descrioption
    await CreateApp.AddApplicationDetailsToDevStore(page,dataset.AppWebsite,dataset.AppRedirectURL,dataset.AppCallbackURL,dataset.AppLongDescriptionEN,dataset.AppLongDescriptionAR,  //3.app details as private app
    dataset.AppShortDescriptionEN,dataset.AppShortDescriptionAR,dataset.AppDevelopberNameEN,dataset.AppDevelopberNameAR,dataset.DevStoreName);
    
    //3.Login to MD
    const loginpage = new LoginPage(page);
    await loginpage.goTo();
    await loginpage.enterUserEmail(dataset.DevStoreEmail);
    
    //4.check private app section
    //5.Login to PD to delete private app

    await LoginToPD.goToPD();
    await LoginToPD.enterUserEmail(dataset.ZAMuserEmail);
    await LoginToPD.enterUserPassword(dataset.ZAMuserPassword);
    await LoginToPD.clickLoginButton();
    
    //6.Delete private app
    await CreateApp.DeleteNewApp(page,dataset.AppnameEN); //delete created app
});