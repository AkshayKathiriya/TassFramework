const {test, expect} = require('@playwright/test');
const {P_LoginToPD} = require('../../pages/zam/P_LoginToPD.js');
const {P_MyProfilePage} = require('../../pages/zam/P_MyProfilePage.js');
const dataset =  JSON.parse(JSON.stringify(require("../../data/zam-testing.json")));

test("UpdatePartnerProfile",async({page})=>{
    test.setTimeout(150_000);
    const LoginToPD = new P_LoginToPD(page);    //login
    await LoginToPD.goToPD();
    await LoginToPD.enterUserEmail(dataset.ZAMuserEmail);
    await LoginToPD.enterUserPassword(dataset.ZAMuserPassword);
    await LoginToPD.clickLoginButton();

    const MYProfilePage = new P_MyProfilePage(page);
    await MYProfilePage.UpdatePartnerProfile(dataset.PartnerFullName,dataset.PartnerPhoneNumber); //update partner data
    
});