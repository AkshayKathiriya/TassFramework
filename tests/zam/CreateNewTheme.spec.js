const {test, expect} = require('@playwright/test');
const {P_LoginToPD} = require('../../pages/zam/P_LoginToPD.js');
const {P_ThemeManagmentPage} = require('../../pages/zam/P_ThemeManagmentPage.js');
const dataset =  JSON.parse(JSON.stringify(require("../../data/zam-testing.json")));

test("Creat New Theme",async({page})=>{
    test.setTimeout(150_000);
    const LoginToPD = new P_LoginToPD(page);    //login
    await LoginToPD.goToPD();
    await LoginToPD.enterUserEmail(dataset.ZAMuserEmail);
    await LoginToPD.enterUserPassword(dataset.ZAMuserPassword);
    await LoginToPD.clickLoginButton();

    //create new theme
    const ThemeManagment = new P_ThemeManagmentPage(page);
    await ThemeManagment.NavigatesToThemeManagmentPage(page);
    await ThemeManagment.CreateNewTheme(page,dataset.ThemeNameAR,dataset.ThemeNameEN);
    await ThemeManagment.DeleteCreatedTheme(page,dataset.ThemeNameEN); //delete created theme
});   