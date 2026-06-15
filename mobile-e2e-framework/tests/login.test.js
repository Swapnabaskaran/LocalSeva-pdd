const { expect } = require('chai');
const LoginPage = require('../pages/loginPage');
const DashboardPage = require('../pages/dashboardPage');
require('./baseTest'); // Load hooks

describe('Authentication Testing', function () {
    let loginPage;
    let dashboardPage;

    beforeEach(function () {
        loginPage = new LoginPage(global.driver);
        dashboardPage = new DashboardPage(global.driver);
    });

    it('Validate empty username', async function () {
        await loginPage.login('', 'password123');
        const error = await loginPage.getErrorText();
        expect(error).to.include('Username is required');
    });

    it('Validate empty password', async function () {
        await loginPage.login('testuser', '');
        const error = await loginPage.getErrorText();
        expect(error).to.include('Password is required');
    });

    it('Validate invalid credentials', async function () {
        await loginPage.login('invalidUser', 'wrongPass');
        const error = await loginPage.getErrorText();
        expect(error).to.include('Invalid credentials');
    });

    it('Validate successful login', async function () {
        await loginPage.login('validUser', 'validPass');
        const welcomeMsg = await dashboardPage.getWelcomeMessage();
        expect(welcomeMsg).to.include('Welcome');
    });

    it('Validate logout functionality', async function () {
        await loginPage.login('validUser', 'validPass');
        await dashboardPage.logout();
        await loginPage.waitForDisplayed(loginPage.loginButton, 5000);
    });
});
