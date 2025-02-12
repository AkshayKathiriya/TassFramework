const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../../pages/md/LoginPage.js');
const {MainPage} = require('../../pages/zidship/MainPage.js');

const dataset =  JSON.parse(JSON.stringify(require("../../data/zidship-testing.json")));

test("ActivateServiceLevel",async({page})=>{
    const loginpage = new LoginPage(page);
    await loginpage.goTo();
    await loginpage.enterUserEmail(dataset.ZidShipUserEmail);
    

});