const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../../pages/md/LoginPage.js');
const dataset =  JSON.parse(JSON.stringify(require("../../data/md-testing.json")));

test("LoginWithValidEmailAndPassword",async({page})=>{
    const loginpage = new LoginPage(page);
    await loginpage.goTo();
    await loginpage.enterUserEmail(dataset.userEmail);
});