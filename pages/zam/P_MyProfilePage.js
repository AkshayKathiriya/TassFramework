const {expect} = require('@playwright/test');
class P_MyProfilePage
{
    constructor(page)
    {
        this.page = page;
        this.MyProfile_Button = page.getByRole('link', { name: 'my-profile My profile' });
        this.MyProfile_Header = page.getByRole('heading', { name: 'Personal Information' });
        this.PartnerFullName_Field = page.locator('input[name="Full Name"]');
        //this.PartnerAddress_Field = page.locator('input[name="E-mail Address"]');
        this.PartnerPhoneNumber_Field = page.getByRole('textbox', { name: 'Ex: +' });
        this.Save_Button = page.getByRole('button', { name: 'Save Changes' });
        this.SaveUpdatesSuccessMessage_Header = page.getByText('Changes have been saved');
    }
    async UpdatePartnerProfile(PartnerFullName,PartnerPhoneNumber)
    {
        await expect(this.MyProfile_Button).toBeVisible();
        await this.MyProfile_Button.click();
        await expect(this.MyProfile_Header).toBeVisible();
        await this.PartnerFullName_Field.fill(PartnerFullName);
        await this.PartnerPhoneNumber_Field.fill(PartnerPhoneNumber);
        await this.Save_Button.click();
        await expect(this.SaveUpdatesSuccessMessage_Header).toBeVisible();
    }    
}
module.exports = {P_MyProfilePage};