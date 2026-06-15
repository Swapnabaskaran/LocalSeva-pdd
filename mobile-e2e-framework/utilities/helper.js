const fs = require('fs');
const path = require('path');
const logger = require('./logger');

class Helper {
    static async waitForElement(driver, locator, timeout = 10000) {
        logger.info(`Waiting for element: ${locator}`);
        const element = await driver.$(locator);
        await element.waitForDisplayed({ timeout });
        return element;
    }

    static async click(driver, locator) {
        logger.info(`Clicking element: ${locator}`);
        const element = await this.waitForElement(driver, locator);
        await element.click();
    }

    static async setValue(driver, locator, value) {
        logger.info(`Setting value '${value}' for element: ${locator}`);
        const element = await this.waitForElement(driver, locator);
        await element.setValue(value);
    }

    static async getText(driver, locator) {
        logger.info(`Getting text from element: ${locator}`);
        const element = await this.waitForElement(driver, locator);
        return await element.getText();
    }

    static async takeScreenshot(driver, testName) {
        const screenshotDir = path.join(process.cwd(), 'reports', 'failures');
        if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true });
        }
        const fileName = `${testName.replace(/\s+/g, '_')}_${Date.now()}.png`;
        const filePath = path.join(screenshotDir, fileName);
        await driver.saveScreenshot(filePath);
        logger.info(`Screenshot saved to: ${filePath}`);
        return filePath;
    }

    static async captureLogcat(driver, testName) {
        try {
            const logs = await driver.getLogs('logcat');
            const logDir = path.join(process.cwd(), 'reports', 'failures');
            if (!fs.existsSync(logDir)) {
                fs.mkdirSync(logDir, { recursive: true });
            }
            const fileName = `${testName.replace(/\s+/g, '_')}_logcat_${Date.now()}.txt`;
            const filePath = path.join(logDir, fileName);
            fs.writeFileSync(filePath, logs.map(l => `[${l.level}] ${l.message}`).join('\n'));
            logger.info(`Logcat saved to: ${filePath}`);
            return filePath;
        } catch (error) {
            logger.error(`Failed to capture logcat: ${error.message}`);
            return null;
        }
    }
}

module.exports = Helper;
