const fs = require('fs');
const path = require('path');
const logger = require('./logger');
const excelReportGenerator = require('./excelReportGenerator');

class Helper {
    static async waitForElement(driver, locator, timeout = 10000) {
        logger.info(`Waiting for element: ${locator}`);
        try {
            const element = await driver.$(locator);
            await element.waitForDisplayed({ timeout });
            await excelReportGenerator.addExecutionLog({
                timestamp: new Date().toISOString(),
                testName: global.currentTestName || 'Unknown Test',
                step: `Wait for element: ${locator}`,
                result: 'SUCCESS',
                remarks: 'Element displayed'
            });
            return element;
        } catch (error) {
            await excelReportGenerator.addExecutionLog({
                timestamp: new Date().toISOString(),
                testName: global.currentTestName || 'Unknown Test',
                step: `Wait for element: ${locator}`,
                result: 'FAILED',
                remarks: error.message
            });
            throw error;
        }
    }

    static async click(driver, locator) {
        logger.info(`Clicking element: ${locator}`);
        try {
            const element = await this.waitForElement(driver, locator);
            await element.click();
            await excelReportGenerator.addExecutionLog({
                timestamp: new Date().toISOString(),
                testName: global.currentTestName || 'Unknown Test',
                step: `Click element: ${locator}`,
                result: 'SUCCESS',
                remarks: 'Clicked successfully'
            });
        } catch (error) {
            await excelReportGenerator.addExecutionLog({
                timestamp: new Date().toISOString(),
                testName: global.currentTestName || 'Unknown Test',
                step: `Click element: ${locator}`,
                result: 'FAILED',
                remarks: error.message
            });
            throw error;
        }
    }

    static async setValue(driver, locator, value) {
        logger.info(`Setting value '${value}' for element: ${locator}`);
        try {
            const element = await this.waitForElement(driver, locator);
            await element.setValue(value);
            await excelReportGenerator.addExecutionLog({
                timestamp: new Date().toISOString(),
                testName: global.currentTestName || 'Unknown Test',
                step: `Set value for element: ${locator}`,
                result: 'SUCCESS',
                remarks: `Value set to '${value}'`
            });
        } catch (error) {
            await excelReportGenerator.addExecutionLog({
                timestamp: new Date().toISOString(),
                testName: global.currentTestName || 'Unknown Test',
                step: `Set value for element: ${locator}`,
                result: 'FAILED',
                remarks: error.message
            });
            throw error;
        }
    }

    static async getText(driver, locator) {
        logger.info(`Getting text from element: ${locator}`);
        try {
            const element = await this.waitForElement(driver, locator);
            const text = await element.getText();
            await excelReportGenerator.addExecutionLog({
                timestamp: new Date().toISOString(),
                testName: global.currentTestName || 'Unknown Test',
                step: `Get text from element: ${locator}`,
                result: 'SUCCESS',
                remarks: `Text retrieved: '${text}'`
            });
            return text;
        } catch (error) {
            await excelReportGenerator.addExecutionLog({
                timestamp: new Date().toISOString(),
                testName: global.currentTestName || 'Unknown Test',
                step: `Get text from element: ${locator}`,
                result: 'FAILED',
                remarks: error.message
            });
            throw error;
        }
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
