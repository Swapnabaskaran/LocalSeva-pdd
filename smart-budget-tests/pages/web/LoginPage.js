class LoginPage {
    get usernameInput() { return '#username'; }
    get passwordInput() { return '#password'; }
    get loginButton() { return '#login-btn'; }

    async login(username, password) {
        // Mock implementation
        await new Promise(r => setTimeout(r, 10));
        return true;
    }
}
module.exports = new LoginPage();
