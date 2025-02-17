import * as path from 'path';
const {expect} = require('@playwright/test');

class P_CreateApp
{
    constructor(page)
    {
        this.page = page;
        //naviagtesToMyAppsPage
        this.SideMenuMyAppsButton = page.locator('//h5[contains(text(),"My Apps")]');
        this.MyAppsPageTitle = page.locator("//h2[normalize-space()='Applications']");
        this.CreateApplicationButton = page.locator("//h3[normalize-space()='Create Application']");
        this.CreatePublicApplicationButton = page.locator("//h2[normalize-space()='Private/Public Application']");
        
        //General Data 
        this.GeneralDataHeader = page.locator("//h3[contains(text(),'Create New Application')]");
        this.AppNameEN_input = page.getByRole('group').filter({ hasText: 'Application Name * English' }).getByRole('textbox');
        this.AppNameAR_button = page.locator("//h4[contains(text(),'عربي')]");
        this.AppNameAR_input = page.locator('//input[contains(@id,"appNameArabic")]');
        this.AppURL_input = page.locator('//input[contains(@id,"appURL")]');
        this.AppCategory_DDB = page.locator("//div[@class='multiselect__tags']//span[normalize-space()='Select Category']");
        this.AppCategory_DDL = page.locator('//div[@class="multiselect__content-wrapper"]');
        this.ApplicationLanguage_DDB = page.locator(`//button[@class='zid-button zid-button--type-neutrals zid-button--size-default zid-button--has-end-icon']`);
        this.MaintainerEmail_input = page.locator(`//input[contains(@id,"maintainerEmail")]`);
        this.CreateApp_Button = page.locator(`//button[contains(@type,"submit")]`);

        //General Settings
        this.GeneralSettingsHeader = page.locator(`//h3[normalize-space()='Your API keys:']`);
        this.Appscope = page.locator('div:nth-child(2) > .flex > label > .zid-radio__checkmark');
        this.AppscopeDescription = page.locator('textarea[name="Description"]');
        this.SaveGeneralSettings_Buttton = page.getByRole('button', { name: 'Save & Continue' });

        //AddApplicationDetails
        this.AppWebsite_Field = page.locator('input[name="Application Website"]');
        this.CallbackURL = page.locator('input[name="Callback URL"]');
        this.RedirectionURL = page.locator('input[name="Redirection URL"]');
        this.AppLongDescriptionEN_Field = page.locator('#descriptionEN').getByRole('textbox');
        this.AppLongDescriptionAR_Button =  page.getByRole('heading', { name: 'عربي' }).nth(1);
        this.AppLongDescriptionAR_Field = page.locator('#descriptionAR').getByRole('textbox');
        this.AppShortDescriptionEN_Field = page.getByRole('textbox', { name: 'Increase your store leads by' });
        this.AppShortDescriptionAR_Button =  page.getByRole('heading', { name: 'عربي' }).nth(2);
        this.AppShortDescriptionAR_Field = page.getByRole('group').filter({ hasText: 'Short Description: * English' }).getByRole('textbox');
        this.AppDevelopberNameEN_Field =page.getByRole('group').filter({ hasText: 'Application developer name' }).getByRole('textbox');
        this.AppDevelopberNameAR_Button =  page.getByRole('heading', { name: 'عربي' }).nth(3);
        this.AppDevelopberNameAR_Field = page.getByRole('group').filter({ hasText: 'Application developer name' }).getByRole('textbox');
        this.UploadAppScreenshot_Field = page.locator(`(//input[contains(@id,'zid-file-selector__input')])[1]`);
        this.UploadAppIcon_Field = page.locator('input[name="Application Icon"]');
        this.SaveApplicationDetails_Buttton = page.locator(`//h4[normalize-space()='Save & Continue']`);
        this.SaveApplicationDetailsSuccessMessage_Header = page.getByText('Updated application details');
    }
    async  naviagtesToMyAppsPage(page)
    {
        await expect(this.SideMenuMyAppsButton).toBeVisible();
        await this.SideMenuMyAppsButton.click();
        await expect(this.MyAppsPageTitle).toBeVisible();
    }
    async  AddGeneralData(page,AppnameEN,AppnameAR,AppURL,AppCategory,AppLanguage,MaintainerEmail)
    {
        await this.CreateApplicationButton.click();
        await expect(this.CreatePublicApplicationButton).toBeVisible();
        await this.CreatePublicApplicationButton.click();
        await expect(this.GeneralDataHeader).toBeVisible();
        await this.AppNameEN_input.fill(AppnameEN);
        await this.AppNameAR_button.click();
        await expect(this.AppNameAR_input).toBeVisible();
        await this.AppNameAR_input.fill(AppnameAR);
        await expect(this.AppURL_input).toBeVisible();
        await this.AppURL_input.fill(AppURL);
        await expect(this.AppCategory_DDB).toBeVisible();
        await this.AppCategory_DDB.click();  
        await expect(this.AppCategory_DDL).toBeVisible();   
        const AppCategoryselect = page.locator(`//ul[@class="multiselect__content"]//li//span[contains(text(),'${AppCategory}')]`);
        await AppCategoryselect.waitFor({ state: 'visible' }); // Ensure it's visible
        await AppCategoryselect.click();
        await expect(this.ApplicationLanguage_DDB).toBeVisible();
        await this.ApplicationLanguage_DDB.click();
        const Applanguageselect = page.locator(`//div[contains(@class,'zid-select zid-select--is-open')]//div[contains(@class,'zid-select-body create-app-zid-select-body w-full')]//div[contains(text(),"${AppLanguage}")]`);
        await Applanguageselect.waitFor({ state: 'visible' }); // Ensure it's visible
        await Applanguageselect.click(); // Click the option
        await expect(this.MaintainerEmail_input).toBeVisible();
        await this.MaintainerEmail_input.fill(MaintainerEmail);
        await this.CreateApp_Button.waitFor({ state: 'visible' });
        await this.CreateApp_Button.click();
    }
    async  AddGeneralSettings(AppscopeDescription)
    { 
        await expect(this.GeneralSettingsHeader).toBeVisible({ timeout: 50_000 });
        await  this.Appscope.first().click();
        await this.AppscopeDescription.fill(AppscopeDescription);
        await expect(this.SaveGeneralSettings_Buttton).toBeVisible();
        await this.SaveGeneralSettings_Buttton.click();
    }
    async  AddApplicationDetails(page,AppWebsite,AppRedirectURL,AppCallbackURL,AppLongDescriptionEN,AppLongDescriptionAR,
        AppShortDescriptionEN,AppShortDescriptionAR,AppDevelopberNameEN,AppDevelopberNameAR)
    {
        await expect(this.AppWebsite_Field).toBeVisible();
        await this.AppWebsite_Field.fill(AppWebsite);
        await expect(this.RedirectionURL).toBeVisible();
        await this.RedirectionURL.fill(AppRedirectURL);
        await this.CallbackURL.fill(AppCallbackURL);
        await expect(this.AppLongDescriptionEN_Field).toBeVisible();
        await this.AppLongDescriptionEN_Field.fill(AppLongDescriptionEN);
        await this.AppLongDescriptionAR_Button.click();
        await this.AppLongDescriptionAR_Field.fill(AppLongDescriptionAR);
        await this.AppShortDescriptionEN_Field.fill(AppShortDescriptionEN);
        await this.AppShortDescriptionAR_Button.click();
        await this.AppShortDescriptionAR_Field.fill(AppShortDescriptionAR);
        await this.AppDevelopberNameEN_Field.fill(AppDevelopberNameEN);
        await this.AppDevelopberNameAR_Button.click();
        await this.AppDevelopberNameAR_Field.fill(AppDevelopberNameAR);
        //const filePath = path.resolve(__dirname, 'data/Attachments/AppScreenShot.png');
        await expect(this.UploadAppScreenshot_Field).toBeVisible();

        // await page.setInputFiles(this.UploadAppScreenshot_Field, '../../data/attachments/appScreenShot.png');
        // await expect(this.UploadAppIcon_Field).toBeVisible();
        const path = require('path');
        //await page.setInputFiles(this.UploadAppScreenshot_Field, path.join(__dirname, '../../data/attachments/appScreenShot.png'));

        await page.setInputFiles(`(//input[contains(@id,'zid-file-selector__input')])[1]`, 'data/attachments/appScreenShot.png');

        //await this.UploadAppIcon_Field.setInputFiles(path.join('./data/attachments/appIcon.png'));
        await page.setInputFiles('input[name="Application Icon"]', 'data/attachments/appIcon.png');
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await expect(this.SaveApplicationDetails_Buttton).toBeVisible({ timeout: 70_000 });
        await this.SaveApplicationDetails_Buttton.click();
        await expect(this.SaveApplicationDetailsSuccessMessage_Header).toBeVisible({ timeout: 50_000 });
    }
    async DeleteNewApp(page,AppnameEN)
    {
        await expect(this.SideMenuMyAppsButton).toBeVisible({ timeout: 60_000 });
        await this.SideMenuMyAppsButton.click();
        await expect(this.MyAppsPageTitle).toBeVisible();
        await expect(page.locator(`//h5[normalize-space()='${AppnameEN}']//ancestor::tr//div[@id="deleteApp"]`)).toBeVisible({ timeout: 60_000 });
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        //await page.locator(`//h5[normalize-space()='${AppnameEN}']//ancestor::tr//div[@id="deleteApp"]`).click;
        await page.getByRole('row', { name: AppnameEN }).getByLabel('box').click();
        await expect(page.getByText('App deleted')).toBeVisible({ timeout: 60_000 });
    }
    ////////////////////////////Private APP////////////////////////////////////////////////////////////
    async  AddGeneralSettings(AppscopeDescription)
    { 
        await expect(this.GeneralSettingsHeader).toBeVisible({ timeout: 50_000 });
        await  this.Appscope.first().click();
        await this.AppscopeDescription.fill(AppscopeDescription);
        await expect(this.SaveGeneralSettings_Buttton).toBeVisible();
        await this.SaveGeneralSettings_Buttton.click();
    }
    async  AddApplicationDetailsToDevStore(page,AppWebsite,AppRedirectURL,AppCallbackURL,AppLongDescriptionEN,AppLongDescriptionAR,
        AppShortDescriptionEN,AppShortDescriptionAR,AppDevelopberNameEN,AppDevelopberNameAR,DevStoreName)
    {
        await expect(this.AppWebsite_Field).toBeVisible();
        await this.AppWebsite_Field.fill(AppWebsite);
        await expect(this.RedirectionURL).toBeVisible();
        await this.RedirectionURL.fill(AppRedirectURL);
        await this.CallbackURL.fill(AppCallbackURL);
        await expect(this.AppLongDescriptionEN_Field).toBeVisible();
        await this.AppLongDescriptionEN_Field.fill(AppLongDescriptionEN);
        await this.AppLongDescriptionAR_Button.click();
        await this.AppLongDescriptionAR_Field.fill(AppLongDescriptionAR);
        await this.AppShortDescriptionEN_Field.fill(AppShortDescriptionEN);
        await this.AppShortDescriptionAR_Button.click();
        await this.AppShortDescriptionAR_Field.fill(AppShortDescriptionAR);
        await this.AppDevelopberNameEN_Field.fill(AppDevelopberNameEN);
        await this.AppDevelopberNameAR_Button.click();
        await this.AppDevelopberNameAR_Field.fill(AppDevelopberNameAR);
        await expect(this.UploadAppScreenshot_Field).toBeVisible();
        const path = require('path');
        await page.setInputFiles(`(//input[contains(@id,'zid-file-selector__input')])[1]`, 'data/attachments/appScreenShot.png');
        await page.setInputFiles('input[name="Application Icon"]', 'data/attachments/appIcon.png');
        //dev store
        await page.locator(`//p[normalize-space()='${DevStoreName}']//ancestor::tr//button//p[normalize-space()='Install App']`).click();
        await page.getByText('Application was installed').click();
        await expect(page.getByText('Application was installed')).toBeVisible({ timeout: 60_000 });

        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await expect(this.SaveApplicationDetails_Buttton).toBeVisible({ timeout: 70_000 });
        await this.SaveApplicationDetails_Buttton.click();
        await expect(this.SaveApplicationDetailsSuccessMessage_Header).toBeVisible({ timeout: 50_000 });
    }
}
module.exports = {P_CreateApp};