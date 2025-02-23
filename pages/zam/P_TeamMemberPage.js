const {expect} = require('@playwright/test');
class P_TeamMemberPage
{
    constructor(page)
    {
        this.page = page;
        this.TeamMember_Button = page.getByRole('link', { name: 'members Team Members' });
        this.TeamMember_Header = page.getByText('Manage team Members');
        this.AddTeamMamber_Button = page.getByRole('button', { name: 'Add New Member' });
        this.AddTeamMemberForm_Header = page.getByRole('paragraph').filter({ hasText: 'Add New Team Member' });
        this.TeamMemberFullName_Field = page.getByRole('textbox', { name: 'Full team member name' });
        this.TeamMemberPhoneNumer_Field = page.getByRole('textbox', { name: '+' });
        this.TeamMemberEmail_Field = page.getByRole('textbox', { name: 'email@example.com' });
        this.Save_Button = page.getByRole('button', { name: 'Save Team Member' });
        this.SavedTeamMemberSuccessMessage = page.getByText('Team member was added');
        this.DeleteTeamMeber_button = page.getByRole('button', { name: 'Yes, delete team member' });
        this.DeleteTeamMemberSuccessMessage = page.getByText('Team member has been deleted');
    }
    async NavigatesToTeamMemberPage()
    {
        await this.page.goto('https://testing-partner.zid.dev/dashboard');
        await expect(this.TeamMember_Button).toBeVisible({ timeout: 60_000 });
        await this.TeamMember_Button.click();
        await expect(this.TeamMember_Header).toBeVisible({ timeout: 50_000 });
        await this.TeamMember_Header.click();
    }
    async AddNewTeamMamber(page,TeamMemberFullName,TeamMemberPhoneNume,TeamMemberEmail)
    {
        await expect(this.AddTeamMamber_Button).toBeVisible({ timeout: 50_000 });
        await this.AddTeamMamber_Button.click();
        await expect(this.AddTeamMemberForm_Header).toBeVisible({ timeout: 50_000 });
        await this.TeamMemberFullName_Field.fill(TeamMemberFullName);
        await this.TeamMemberPhoneNumer_Field.fill(TeamMemberPhoneNume);
        await this.TeamMemberEmail_Field.fill(TeamMemberEmail);
        //await page.locator(`//input[@id='team-member-role-${TeamMamberDeveloperName}']`).click();
        await page.locator('label').filter({ hasText: 'Developer' }).locator('span').click();
        await page.locator('label').filter({ hasText: 'Give full permission' }).locator('span').click();
        //await page.locator(`//input[@id='team-member-${TeamMamberPermisionName}']`).click();
        await this.Save_Button.click();
        await expect(this.SavedTeamMemberSuccessMessage).toBeVisible();
    }
     async DeleteTeamMember(page,TeamMemberFullName)
     {
        //await this.page.goto("https://develop.zam-partner-dashboard.pages.dev/team-members");
        await page.locator(`//td[normalize-space()='${TeamMemberFullName}']`).click();
        await page.locator(`//td[normalize-space()='${TeamMemberFullName}']//ancestor::tr//div[contains(@id,"delete-member")]`).click();
        await expect(this.DeleteTeamMeber_button).toBeVisible();
        await this.DeleteTeamMeber_button.click();
        await expect(this.DeleteTeamMemberSuccessMessage).toBeVisible();
     }
}
module.exports = {P_TeamMemberPage};