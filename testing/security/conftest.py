import pytest
import os
import time
from testing.common.excel.excel_utils import generate_excel_report

test_results = []

@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    rep = outcome.get_result()
    
    if rep.when == 'call':
        status = "Passed" if rep.passed else "Failed"
        test_id = f"SEC_{len(test_results) + 1:02d}"
        desc = item.function.__doc__ or item.name
        
        result = {
            "Test Case ID": test_id,
            "Module": "Security",
            "Test Description": desc.strip(),
            "Expected Result": "Secure",
            "Actual Result": status,
            "Status": status,
            "Execution Time": f"{rep.duration:.2f}s"
        }
        test_results.append(result)

def pytest_sessionfinish(session, exitstatus):
    generate_excel_report(test_results, "Security_Report.xlsx")
