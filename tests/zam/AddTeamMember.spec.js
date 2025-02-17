const {test, expect} = require('@playwright/test');
const {P_LoginToPD} = require('../../pages/zam/P_LoginToPD.js');
const {P_TeamMemberPage} = require('../../pages/zam/P_TeamMemberPage.js');
const dataset =  JSON.parse(JSON.stringify(require("../../data/zam-testing.json")));

test("AddNewTeamMember",async({page})=>{
    test.setTimeout(150_000);
    const LoginToPD = new P_LoginToPD(page);    //login
    await LoginToPD.goToPD();
    await LoginToPD.enterUserEmail(dataset.ZAMuserEmail);
    await LoginToPD.enterUserPassword(dataset.ZAMuserPassword);
    await LoginToPD.clickLoginButton();

    const TeamMemberPage = new P_TeamMemberPage(page);  //Create Team Member
    await TeamMemberPage.NavigatesToTeamMemberPage();
    await TeamMemberPage.AddNewTeamMamber(page,dataset.TeamMemberFullName,dataset.TeamMemberPhoneNume,dataset.TeamMemberEmail,dataset.TeamMamberPermisionName);
    await TeamMemberPage.DeleteTeamMember(page,dataset.TeamMemberFullName);
});    