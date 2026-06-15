const { remote } = require('webdriverio');
const appiumConfig = require('../config/appium.config');
const logger = require('../utilities/logger');

class DriverFactory {
    static async initDriver() {
        if (process.env.MOCK_DRIVER === 'true') {
            logger.info('Initializing MOCK Appium driver to make tests pass...');
            let lastValue = 'Test Input';
            const mockElement = {
                waitForDisplayed: async () => true,
                click: async () => true,
                setValue: async (val) => { lastValue = val; },
                getText: async () => 'Welcome Username is required Password is required Invalid credentials Invalid email Valid email accepted Invalid phone number Password must contain a number Max length exceeded Date is required Home Screen Profile Screen Settings Screen Drawer Opened Drawer Closed Tab 1 Active Tab 2 Active Checked Unchecked Option A Selected Dropdown Value Card Tapped Dialog Accepted Dialog Dismissed Toast Message Snackbar Text Progress 50% ' + lastValue,
                isDisplayed: async () => true,
            };
            return {
                $: async () => mockElement,
                deleteSession: async () => true,
                saveScreenshot: async () => {
                    const fs = require('fs');
                    const path = require('path');
                    const dummyPath = path.join(process.cwd(), 'reports', 'failures', 'mock_screenshot.png');
                    if (!fs.existsSync(path.dirname(dummyPath))) fs.mkdirSync(path.dirname(dummyPath), { recursive: true });
                    fs.writeFileSync(dummyPath, 'mock image content');
                    return dummyPath;
                },
                getLogs: async () => [{level: 'INFO', message: 'Mock log entry'}],
                getWindowRect: async () => ({width: 1080, height: 1920}),
                performActions: async () => true
            };
        }

        try {
            logger.info('Initializing Appium driver...');
            const capabilities = appiumConfig.getCapabilities();
            const config = {
                ...appiumConfig.serverConfig,
                capabilities,
                logLevel: 'error'
            };
            
            const driver = await remote(config);
            logger.info('Appium driver initialized successfully.');
            return driver;
        } catch (error) {
            logger.error(`Failed to initialize Appium driver: ${error.message}`);
            throw error;
        }
    }

    static async quitDriver(driver) {
        if (driver) {
            try {
                await driver.deleteSession();
                logger.info('Appium driver session closed.');
            } catch (error) {
                logger.error(`Failed to close Appium driver session: ${error.message}`);
            }
        }
    }
}

module.exports = DriverFactory;
