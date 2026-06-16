const { expect } = require('chai');
const BasePage = require('../pages/basePage');
require('./baseTest');

describe('Form Validation Testing', function () {
    let basePage;

    beforeEach(function () {
        basePage = new BasePage(global.driver);
    });

    it('Validate Required Fields Error', async function () {
        await basePage.click('~submit_button');
        const text = await basePage.getText('~error_msg');
        expect(text).to.include('Username is required');
    });

    it('Validate Invalid Email Format', async function () {
        await basePage.setValue('~email_input', 'invalid-email');
        const text = await basePage.getText('~error_msg');
        expect(text).to.include('Invalid email');
    });

    it('Validate Valid Email Accepted', async function () {
        await basePage.setValue('~email_input', 'test@example.com');
        const text = await basePage.getText('~success_msg');
        expect(text).to.include('Valid email accepted');
    });

    it('Validate Phone Number Length', async function () {
        await basePage.setValue('~phone_input', '123');
        const text = await basePage.getText('~error_msg');
        expect(text).to.include('Invalid phone number');
    });

    it('Validate Password Complexity', async function () {
        await basePage.setValue('~password_input', 'password');
        const text = await basePage.getText('~error_msg');
        expect(text).to.include('Password must contain a number');
    });

    it('Validate Maximum Length', async function () {
        await basePage.setValue('~username_input', 'thisisaverylongusernamethatexceedsmaxlength');
        const text = await basePage.getText('~error_msg');
        expect(text).to.include('Max length exceeded');
    });

    it('Validate Date Field Required', async function () {
        await basePage.click('~submit_button');
        const text = await basePage.getText('~date_error');
        expect(text).to.include('Date is required');
    });
});
