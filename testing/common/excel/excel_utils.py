import pandas as pd
import os
from testing.common.config.config import EXCEL_REPORTS_DIR

def generate_excel_report(test_results, filename):
    """
    test_results: list of dicts:
    [
        {"Test Case ID": "TC01", "Module": "Login", "Test Description": "Valid Login", "Expected Result": "Pass", "Actual Result": "Pass", "Status": "Passed", "Execution Time": "2s"}
    ]
    """
    df = pd.DataFrame(test_results)
    path = os.path.join(EXCEL_REPORTS_DIR, filename)
    df.to_excel(path, index=False)
    print(f"Generated {filename} at {path}")
