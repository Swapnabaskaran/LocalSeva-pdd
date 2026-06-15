const { expect } = require('chai');
const BasePage = require('../pages/basePage');
require('./baseTest');

describe('Navigation & Gesture Testing', function () {
    let basePage;

    beforeEach(function () {
        basePage = new BasePage(global.driver);
    });

    it('Navigate to Home via Bottom Nav', async function () {
        await basePage.click('~nav_home');
        const text = await basePage.getText('~screen_title');
        expect(text).to.include('Home Screen');
    });

    it('Navigate to Profile via Bottom Nav', async function () {
        await basePage.click('~nav_profile');
        const text = await basePage.getText('~screen_title');
        expect(text).to.include('Profile Screen');
    });

    it('Navigate to Settings via Bottom Nav', async function () {
        await basePage.click('~nav_settings');
        const text = await basePage.getText('~screen_title');
        expect(text).to.include('Settings Screen');
    });

    it('Open Navigation Drawer', async function () {
        await basePage.click('~hamburger_menu');
        const text = await basePage.getText('~drawer_state');
        expect(text).to.include('Drawer Opened');
    });

    it('Close Navigation Drawer', async function () {
        await basePage.click('~close_drawer');
        const text = await basePage.getText('~drawer_state');
        expect(text).to.include('Drawer Closed');
    });

    it('Switch to Tab 1', async function () {
        await basePage.click('~tab_1');
        const text = await basePage.getText('~tab_content');
        expect(text).to.include('Tab 1 Active');
    });

    it('Switch to Tab 2', async function () {
        await basePage.click('~tab_2');
        const text = await basePage.getText('~tab_content');
        expect(text).to.include('Tab 2 Active');
    });
});
