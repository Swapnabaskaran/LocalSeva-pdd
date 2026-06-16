# LocalSeva Appium E2E Testing Framework

This is a complete Appium-based Mobile End-to-End Testing Framework for the LocalSeva Android application.

## Tech Stack
- **Appium 2.x**
- **Python 3.11+**
- **Pytest**
- **Page Object Model (POM)**
- **OpenPyXL / Pandas** (Custom Excel Reporting)

## Setup Appium & Dependencies

1. **Install Node.js & Appium:**
   ```bash
   npm i -g appium
   appium driver install uiautomator2
   ```

2. **Install Python Dependencies:**
   ```bash
   cd testing/appium_python
   pip install -r requirements.txt
   ```

## Start Emulator & Appium Server

1. Start your Android Emulator (e.g., Pixel 6, API 33/Android 13).
2. Start the Appium Server:
   ```bash
   appium
   ```

## Run Tests & Generate Reports

Run the entire suite of 30 tests and generate the HTML report:
```bash
pytest tests/ -v --html=reports/report.html
```

After execution, the following reports will be generated in `reports/`:
- `Mobile_E2E_Report.xlsx` (Custom 5-sheet report)
- `report.html` (Pytest HTML report)
- `screenshots/` (Captured on failure)
- `logs/` (Execution logs)

## GitHub Actions Usage

This repository is configured with a GitHub Actions workflow (`.github/workflows/mobile-e2e.yml`). Every push to the `main` branch will automatically trigger the pipeline.

The tests run using a Mock Driver to ensure fast CI execution without the overhead of hardware-accelerated emulators on Ubuntu runners. The final `Mobile_E2E_Report.xlsx`, HTML Report, and Screenshots are uploaded as artifacts!
