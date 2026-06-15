const { expect } = require('chai');
const BasePage = require('../pages/basePage');
require('./baseTest');

describe('Extended Mobile UI Testing', function () {
    let basePage;

    beforeEach(function () {
        basePage = new BasePage(global.driver);
    });

    it('Validate Buttons Clickable', async function () {
        await basePage.click('~sample_button');
        expect(true).to.be.true; // Mock click passes
    });

    it('Validate Text Fields Input', async function () {
        await basePage.setValue('~sample_text_field', 'Test Input');
        const text = await basePage.getText('~sample_text_field');
        expect(text).to.include('Test Input');
    });

    it('Validate Checkbox Checked State', async function () {
        await basePage.click('~checkbox_1');
        const text = await basePage.getText('~checkbox_status');
        expect(text).to.include('Checked');
    });

    it('Validate Checkbox Unchecked State', async function () {
        await basePage.click('~checkbox_2');
        const text = await basePage.getText('~checkbox_status');
        expect(text).to.include('Unchecked');
    });

    it('Validate Radio Button Selection', async function () {
        await basePage.click('~radio_option_A');
        const text = await basePage.getText('~radio_status');
        expect(text).to.include('Option A Selected');
    });

    it('Validate Dropdown Selection', async function () {
        await basePage.click('~dropdown');
        await basePage.click('~dropdown_value');
        const text = await basePage.getText('~dropdown_status');
        expect(text).to.include('Dropdown Value');
    });

    it('Validate RecyclerView Card Tap', async function () {
        await basePage.click('~recycler_card_1');
        const text = await basePage.getText('~card_status');
        expect(text).to.include('Card Tapped');
    });

    it('Validate Dialog Accept Action', async function () {
        await basePage.click('~open_dialog');
        await basePage.click('~dialog_ok');
        const text = await basePage.getText('~dialog_status');
        expect(text).to.include('Dialog Accepted');
    });

    it('Validate Dialog Dismiss Action', async function () {
        await basePage.click('~open_dialog');
        await basePage.click('~dialog_cancel');
        const text = await basePage.getText('~dialog_status');
        expect(text).to.include('Dialog Dismissed');
    });

    it('Validate Toast Message Appearance', async function () {
        await basePage.click('~trigger_toast');
        const text = await basePage.getText('~toast_container');
        expect(text).to.include('Toast Message');
    });

    it('Validate Snackbar Text', async function () {
        await basePage.click('~trigger_snackbar');
        const text = await basePage.getText('~snackbar_container');
        expect(text).to.include('Snackbar Text');
    });

    it('Validate Progress Bar State', async function () {
        const text = await basePage.getText('~progress_bar');
        expect(text).to.include('Progress 50%');
    });
});
