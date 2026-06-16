$ErrorActionPreference = "Stop"

$LocalsevaDir = "C:\Users\HP\Downloads\localseva"
$TestingDir = "$LocalsevaDir\testing"
$env:PYTHONPATH = $LocalsevaDir

cd $TestingDir

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "    LocalSeva Unified Testing Framework   " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

Write-Host "`n[1/4] Activating Python Virtual Environment..." -ForegroundColor Yellow
.\venv\Scripts\activate

Write-Host "`n[2/4] Running Selenium Web E2E Tests..." -ForegroundColor Yellow
python -m pytest selenium/tests/test_web.py --html=reports/html/Selenium_Report.html

Write-Host "`n[3/4] Running Security Vulnerability Tests..." -ForegroundColor Yellow
python -m pytest security/api_tests/test_security.py --html=reports/html/Security_Report.html

Write-Host "`n[4/4] Running Appium Mobile E2E Tests (Mock)..." -ForegroundColor Yellow
cd appium
npm run test:mock
cd ..

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "    Generating Master Execution Report    " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
python common/excel/master_report.py

Write-Host "`nAll tests completed successfully! Reports are available in testing/reports/excel" -ForegroundColor Green
