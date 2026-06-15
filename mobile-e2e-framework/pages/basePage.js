const Helper = require('../utilities/helper');

class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    async click(locator) {
        await Helper.click(this.driver, locator);
    }

    async setValue(locator, value) {
        await Helper.setValue(this.driver, locator, value);
    }

    async getText(locator) {
        return await Helper.getText(this.driver, locator);
    }

    async waitForDisplayed(locator, timeout) {
        await Helper.waitForElement(this.driver, locator, timeout);
    }
}

module.exports = BasePage;
