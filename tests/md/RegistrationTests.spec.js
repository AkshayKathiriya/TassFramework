//const {test, expec} = require('@playwright/test');
const {test} = require('../../fixtures/testDataFixture.js');


const {LoginPage} = require('../../pages/md/LoginPage.js');
const {LoginPage2} = require('../../pages/LoginPage2.js');
//const dataset =  JSON.parse(JSON.stringify(require('../../data/testing/md-testing.json')));

test("RegistrationWithValidEmail", async({page, testData})=> {
await page.goto('https://hermes.zid.dev/ar-sa/login');
await expect(page.getByRole('textbox', { name: 'البريد الإلكتروني' })).toBeVisible();
await page.getByRole('link', { name: 'إنشاء حساب جديد' }).click();
await expect(page.getByText('خطوتك الأولى لبناء ونمو متجرك تبدأ هنا')).toBeVisible();
await page.getByRole('textbox', { name: 'البريد الإلكتروني' }).click();
await page.getByRole('textbox', { name: 'البريد الإلكتروني' }).fill('check@test4503.sa');
await page.getByRole('button', { name: 'استمرار' }).click();
await expect(page.getByRole('textbox', { name: '× × × ×' })).toBeVisible();
await page.getByRole('textbox', { name: '× × × ×' }).click();
await page.getByRole('textbox', { name: '× × × ×' }).fill('1234');
await page.getByRole('button', { name: 'تحقّق' }).click();
await expect(page.getByRole('textbox', { name: 'الاسم الأول' })).toBeVisible();
await page.getByRole('textbox', { name: 'الاسم الأول' }).click();
await page.getByRole('textbox', { name: 'الاسم الأول' }).fill('sayed 7etata');
await page.getByRole('textbox', { name: 'اسم العائلة' }).click();
await page.getByRole('textbox', { name: 'اسم العائلة' }).fill('test');
await page.getByRole('button', { name: 'التالي' }).click();
await expect(page.getByRole('textbox', { name: 'رقم جوالك' })).toBeVisible();
await page.getByRole('textbox', { name: 'رقم جوالك' }).click();
await page.getByRole('textbox', { name: 'رقم جوالك' }).fill('966542503656');
await page.getByRole('button', { name: 'التالي' }).click();
await expect(page.getByRole('textbox', { name: '× × × ×' })).toBeVisible();
await page.getByRole('textbox', { name: '× × × ×' }).click();
await page.getByRole('textbox', { name: '× × × ×' }).fill('1234');
await page.getByRole('button', { name: 'تحقّق' }).click();
});