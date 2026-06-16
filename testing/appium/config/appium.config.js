require('dotenv').config();

const apkPath = process.env.APK_PATH || './app/app-release.apk';
const appPackage = process.env.APP_PACKAGE || 'com.example.app';
const appActivity = process.env.APP_ACTIVITY || 'com.example.app.MainActivity';

const baseCapabilities = {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': process.env.DEVICE_NAME || 'Android Emulator',
    'appium:newCommandTimeout': 3600,
    'appium:autoGrantPermissions': true,
};

const apkCapabilities = {
    ...baseCapabilities,
    'appium:app': apkPath,
};

const installedAppCapabilities = {
    ...baseCapabilities,
    'appium:appPackage': appPackage,
    'appium:appActivity': appActivity,
    'appium:noReset': true,
};

module.exports = {
    getCapabilities: () => {
        const appType = process.env.APP_TYPE || 'installed';
        return appType === 'apk' ? apkCapabilities : installedAppCapabilities;
    },
    serverConfig: {
        hostname: process.env.APPIUM_HOST || '127.0.0.1',
        port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
        path: '/',
    }
};
