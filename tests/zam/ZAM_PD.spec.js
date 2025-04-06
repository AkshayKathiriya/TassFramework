const {test, expect} = require('@playwright/test');
const {P_LoginToPD} = require('../../pages/zam/P_LoginToPD.js');
const {P_TeamMemberPage} = require('../../pages/zam/P_TeamMemberPage.js');
const {P_CreateApp} = require('../../pages/zam/P_CreateApp.js');
const {P_ThemeManagmentPage} = require('../../pages/zam/P_ThemeManagmentPage.js');
const {P_MyProfilePage} = require('../../pages/zam/P_MyProfilePage.js');
const { log } = require('console');
const dataset =  JSON.parse(JSON.stringify(require("../../data/testing/zam-testing.json")));
let webContext;

test.beforeAll(async ({ browser }) => {
    test.setTimeout(120000);
    const context = await browser.newContext();
    const page = await context.newPage();
    const LoginToPD = new P_LoginToPD(page);
    await LoginToPD.goToPD();
    await LoginToPD.enterUserEmail(dataset.ZAMuserEmail);
    await LoginToPD.enterUserPassword(dataset.ZAMuserPassword);
    await LoginToPD.clickLoginButton();
    await context.storageState({ path: 'zam-pd-state.json' });
    webContext = await browser.newContext({ storageState: 'zam-pd-state.json' });
})

test.describe('Team Member', { tag: '@PDTC1' }, () => {
    test("AddNewTeamMember",async({})=>{
        test.setTimeout(90_000);
        const page = await webContext.newPage();
        const TeamMemberPage = new P_TeamMemberPage(page);

        await TeamMemberPage.NavigatesToTeamMemberPage();    //Create Team Member
        await TeamMemberPage.AddNewTeamMamber(page,dataset.TeamMemberFullName,dataset.TeamMemberPhoneNume,dataset.TeamMemberEmail,dataset.TeamMamberPermisionName);
        await TeamMemberPage.DeleteTeamMember(page,dataset.TeamMemberFullName);
    });
});

test.describe('Themes', { tag: '@PDTC2' }, () => {
    test("Creat New Theme",async({})=>{
        test.setTimeout(90_000);
        const page = await webContext.newPage();    
        const ThemeManagment = new P_ThemeManagmentPage(page);

        await ThemeManagment.NavigatesToThemeManagmentPage(page);    //create new theme
        await ThemeManagment.CreateNewTheme(page,dataset.ThemeNameAR,dataset.ThemeNameEN);
        await ThemeManagment.DeleteCreatedTheme(page,dataset.ThemeNameEN); //delete created theme
    }); 
});

test.describe('App Creation', { tag: '@PDTC3' }, () => {
    test("CreatFreeApplication",async({})=>{
        test.setTimeout(90_000);
        const page = await webContext.newPage();
        const CreateApp = new P_CreateApp(page);    //create app
        
        await CreateApp.NaviagtesToMyAppsPage(page);    
        await CreateApp.AddGeneralData(page,dataset.AppnameEN,dataset.AppnameAR,dataset.AppURL,dataset.AppCategory,dataset.AppLanguage,dataset.MaintainerEmail);    ///1.general data step
        await CreateApp.AddGeneralSettings(dataset.AppscopeDescription);    //2.App Descrioption
        await CreateApp.AddApplicationDetails(page,dataset.AppWebsite,dataset.AppRedirectURL,dataset.AppCallbackURL,dataset.AppLongDescriptionEN,dataset.AppLongDescriptionAR,  //3.app details
        dataset.AppShortDescriptionEN,dataset.AppShortDescriptionAR,dataset.AppDevelopberNameEN,dataset.AppDevelopberNameAR);
        await CreateApp.DeleteNewApp(page,dataset.AppnameEN); //delete created app
    });
});

test.describe('App Creation', { tag: '@PDTC4' }, () => {
    test("Edit App Details",async({})=>{
        test.setTimeout(90_000);
        const page = await webContext.newPage();
        const CreateApp = new P_CreateApp(page);    
        
        await CreateApp.NaviagtesToMyAppsPage(page);      //create app  
        await CreateApp.AddGeneralData(page,dataset.AppnameEN,dataset.AppnameAR,dataset.AppURL,dataset.AppCategory,dataset.AppLanguage,dataset.MaintainerEmail);    ///1.general data step
        await CreateApp.AddGeneralSettings(dataset.AppscopeDescription);    //2.App Descrioption
        await CreateApp.AddApplicationDetails(page,dataset.AppWebsite,dataset.AppRedirectURL,dataset.AppCallbackURL,dataset.AppLongDescriptionEN,dataset.AppLongDescriptionAR,  //3.app details as private app
        dataset.AppShortDescriptionEN,dataset.AppShortDescriptionAR,dataset.AppDevelopberNameEN,dataset.AppDevelopberNameAR);
        await CreateApp.EditAppName(page,dataset.AppnameEN,dataset.UpdatedAppnameEN)
        await CreateApp.DeleteNewApp(page,dataset.UpdatedAppnameEN); //delete created app
    });
});

test.describe('Partner profile', { tag: '@PDTC5' }, () => {
    test("UpdatePartnerProfile",async({})=>{
        test.setTimeout(150_000);
        const page = await webContext.newPage();
        const MYProfilePage = new P_MyProfilePage(page);

        await MYProfilePage.UpdatePartnerProfile(dataset.PartnerFullName,dataset.PartnerPhoneNumber); //update partner data
    });
});