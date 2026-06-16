# Enterprise Appium E2E Automation Framework

A production-ready End-to-End (E2E) mobile automation framework for Android applications using Appium and Node.js.

## Technology Stack
- **Language**: JavaScript (ES6+)
- **Runtime**: Node.js
- **Automation Tool**: Appium 2.x
- **Mobile Automation**: UiAutomator2 Driver
- **Test Runner**: Mocha
- **Assertion Library**: Chai
- **Reporting**: Mochawesome, ExcelJS
- **Logging**: Winston
- **Architecture**: Page Object Model (POM)

## Project Structure
- `config/`: Appium configurations for APK and Installed App
- `drivers/`: Driver initialization and teardown
- `pages/`: Page Object classes mapping UI screens
- `tests/`: Mocha test scripts
- `utilities/`: Reusable helpers, logging, and gesture actions
- `reports/`: Excel, HTML reports and failure screenshots/logs

## Prerequisites
1. **Node.js** (v16+)
2. **Java JDK** (v11+)
3. **Android Studio & SDK** (Set `ANDROID_HOME` in env)
4. **Appium 2.x**: `npm install -g appium`
5. **Appium UiAutomator2 Driver**: `appium driver install uiautomator2`

## Setup Instructions
1. Clone this repository.
2. Navigate to the framework root directory:
   ```bash
   cd mobile-e2e-framework
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Configuration
Edit `.env` or set environment variables:
- `APK_PATH`: Path to your `.apk` file (default: `./app/app-release.apk`)
- `APP_PACKAGE`: Application package name (e.g., `com.example.app`)
- `APP_ACTIVITY`: Application main activity

## Execution Instructions

Ensure you have a running Android Emulator or a real device connected (`adb devices` should list it). Start your Appium server on another terminal (`appium`).

### Execute Tests via APK (Installs app before testing)
```bash
npm run test:apk
```

### Execute Tests via Installed App
```bash
npm run test:installed
```

### Generate HTML Report (Mochawesome)
```bash
npm run report
```

## Reports & Artifacts
- **Excel Report**: `reports/Mobile_E2E_Report.xlsx`
- **Failure Artifacts**: `reports/failures/` (contains Screenshots and Logcat dumps)
- **Execution Logs**: `logs/execution.log`
