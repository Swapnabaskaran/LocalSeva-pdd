const BasePage = require('./basePage');

class DashboardPage extends BasePage {
    get welcomeText() { return '~welcome_text'; }
    get logoutButton() { return '~logout_button'; }
    get profileTab() { return '~profile_tab'; }

    async getWelcomeMessage() {
        return await this.getText(this.welcomeText);
    }

    async logout() {
        await this.click(this.logoutButton);
    }

    async navigateToProfile() {
        await this.click(this.profileTab);
    }
}

module.exports = DashboardPage;
