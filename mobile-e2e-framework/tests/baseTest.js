const DriverFactory = require('../drivers/driverFactory');
const excelReportGenerator = require('../utilities/excelReportGenerator');
const Helper = require('../utilities/helper');
const logger = require('../utilities/logger');

let driver;
let executionStartTime;
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
let skippedTests = 0;

before(async function () {
    executionStartTime = Date.now();
    logger.info('Starting test suite...');
});

beforeEach(async function () {
    driver = await DriverFactory.initDriver();
    global.driver = driver;
    global.currentTestName = this.currentTest.title;
    totalTests++;
});

afterEach(async function () {
    const testStatus = this.currentTest.state;
    const testName = this.currentTest.title;
    const duration = this.currentTest.duration || 0;

    if (testStatus === 'passed') {
        passedTests++;
    } else if (testStatus === 'failed') {
        failedTests++;
        logger.error(`Test failed: ${testName}`);
        const screenshotPath = await Helper.takeScreenshot(driver, testName);
        const logcatPath = await Helper.captureLogcat(driver, testName);
        
        await excelReportGenerator.addFailedTest({
            testName: testName,
            reason: this.currentTest.err.message,
            screenshot: screenshotPath,
            device: 'Emulator/Device',
            version: 'Android',
            activity: 'Unknown'
        });
    } else {
        skippedTests++;
    }

    await excelReportGenerator.addTestCase({
        id: `TC-${totalTests}`,
        module: this.currentTest.parent.title,
        scenario: testName,
        device: 'Android Device',
        status: testStatus ? testStatus.toUpperCase() : 'SKIPPED',
        start: new Date(Date.now() - duration).toISOString(),
        end: new Date().toISOString(),
        duration: `${duration}ms`
    });

    await DriverFactory.quitDriver(driver);
});

after(async function () {
    const totalDurationMs = Date.now() - executionStartTime;
    
    await excelReportGenerator.addSummary({
        date: new Date().toISOString(),
        device: 'Android Devices',
        version: '10+',
        total: totalTests,
        passed: passedTests,
        failed: failedTests,
        skipped: skippedTests,
        passPercent: totalTests > 0 ? `${((passedTests / totalTests) * 100).toFixed(2)}%` : '0%',
        duration: `${Math.round(totalDurationMs / 1000)}s`
    });

    await excelReportGenerator.save();
    logger.info('Test suite completed. Reports generated.');
});
