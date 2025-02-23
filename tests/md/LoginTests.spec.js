//const {test, expec} = require('@playwright/test');
const {test} = require('../../fixtures/testDataFixture.js');


const {LoginPage} = require('../../pages/md/LoginPage.js');
//const dataset =  JSON.parse(JSON.stringify(require('../../data/testing/md-testing.json')));

test("LoginWithValidEmailAndPassword", async({page, testData})=> {
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    console.log(testData);
    await loginPage.enterUserEmail(testData.MDuserEmail);
    await loginPage.enterOTP();
});