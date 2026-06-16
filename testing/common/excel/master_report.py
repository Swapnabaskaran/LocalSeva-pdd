import os
import pandas as pd
from testing.common.config.config import SELENIUM_EXCEL, SECURITY_EXCEL, APPIUM_EXCEL, MASTER_EXCEL, EXCEL_REPORTS_DIR

def generate_master_report():
    all_results = []
    
    total_passed = 0
    total_failed = 0
    total_tests = 0
    
    # Read individual reports
    reports = [
        ("Selenium", SELENIUM_EXCEL),
        ("Security", SECURITY_EXCEL),
        ("Appium", APPIUM_EXCEL)
    ]
    
    for category, path in reports:
        if os.path.exists(path):
            if category == "Appium":
                try:
                    df = pd.read_excel(path, sheet_name="Test Cases")
                except Exception as e:
                    print(f"Failed to read 'Test Cases' sheet from Appium report: {e}")
                    df = pd.read_excel(path)
            else:
                df = pd.read_excel(path)
            # count status
            passed = len(df[df['Status'] == 'Passed'])
            failed = len(df[df['Status'] == 'Failed'])
            total_passed += passed
            total_failed += failed
            total_tests += len(df)
            
            df['Category'] = category
            all_results.append(df)
        else:
            print(f"Warning: {path} not found.")
            
    if not all_results:
        print("No reports found to aggregate.")
        return
        
    master_df = pd.concat(all_results, ignore_index=True)
    
    # Write to master excel
    with pd.ExcelWriter(MASTER_EXCEL, engine='openpyxl') as writer:
        master_df.to_excel(writer, sheet_name='All Tests', index=False)
        
        # Write Summary Sheet
        success_rate = (total_passed / total_tests) * 100 if total_tests > 0 else 0
        summary_data = {
            "Metric": ["Total Tests", "Passed", "Failed", "Success Rate"],
            "Value": [total_tests, total_passed, total_failed, f"{success_rate:.2f}%"]
        }
        summary_df = pd.DataFrame(summary_data)
        summary_df.to_excel(writer, sheet_name='Summary', index=False)
        
    print(f"Master report generated at {MASTER_EXCEL}")
    print(f"Summary: {total_tests} Tests, {total_passed} Passed, {total_failed} Failed. Success Rate: {success_rate:.2f}%")

if __name__ == "__main__":
    generate_master_report()
