const BasePage = require('./basePage');

class LoginPage extends BasePage {
    get usernameField() { return '~username_input'; } // Adjust locator based on actual app
    get passwordField() { return '~password_input'; }
    get loginButton() { return '~login_button'; }
    get errorMessage() { return '~error_message'; }

    async login(username, password) {
        if (username !== '') await this.setValue(this.usernameField, username);
        if (password !== '') await this.setValue(this.passwordField, password);
        await this.click(this.loginButton);
    }

    async getErrorText() {
        return await this.getText(this.errorMessage);
    }
}

module.exports = LoginPage;
