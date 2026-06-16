import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
REPORTS_DIR = os.path.join(BASE_DIR, "reports")
EXCEL_REPORTS_DIR = os.path.join(REPORTS_DIR, "excel")

SELENIUM_EXCEL = os.path.join(EXCEL_REPORTS_DIR, "Selenium_Report.xlsx")
SECURITY_EXCEL = os.path.join(EXCEL_REPORTS_DIR, "Security_Report.xlsx")
APPIUM_EXCEL = os.path.join(EXCEL_REPORTS_DIR, "Appium_Report.xlsx")
MASTER_EXCEL = os.path.join(EXCEL_REPORTS_DIR, "Master_Report.xlsx")

# Ensure dirs exist
os.makedirs(EXCEL_REPORTS_DIR, exist_ok=True)
