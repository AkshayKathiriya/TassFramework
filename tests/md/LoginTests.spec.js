//const {test, expec} = require('@playwright/test');
const {test} = require('../../fixtures/testDataFixture.js');


const {LoginPage} = require('../../pages/md/LoginPage.js');
const {LoginPage2} = require('../../pages/LoginPage2.js');
//const dataset =  JSON.parse(JSON.stringify(require('../../data/testing/md-testing.json')));

test("LoginWithValidEmailAndPassword",{
    tag: '@selfHeal'}, async({page, testData})=> {
    const loginPage = new LoginPage(page);
    const loginPage2 = new LoginPage2(page);

    await loginPage2.goTo();
    console.log(testData);
    await loginPage2.enterUserEmail(testData.MDuserEmail);
    await loginPage.enterOTP();
});

test("LoginWithValidEmailAndOTP"
  , async({page, testData})=> {
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    console.log(testData);
    await loginPage.enterUserEmail(testData.MDuserEmail);
    await loginPage.enterOTP();
});