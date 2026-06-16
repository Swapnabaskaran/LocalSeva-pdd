import pytest
import os
import time
from testing.common.excel.excel_utils import generate_excel_report

# Store results
test_results = []

@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    # Execute all other hooks to obtain the report object
    outcome = yield
    rep = outcome.get_result()
    
    # We only look at actual failing test calls, not setup/teardown
    if rep.when == 'call':
        status = "Passed" if rep.passed else "Failed"
        # We can extract module name from the file or test name
        test_id = f"TC_{len(test_results) + 1:02d}"
        
        # We get the docstring for description
        desc = item.function.__doc__ or item.name
        
        result = {
            "Test Case ID": test_id,
            "Module": item.module.__name__.split('.')[-1],
            "Test Description": desc.strip(),
            "Expected Result": "Success",
            "Actual Result": status,
            "Status": status,
            "Execution Time": f"{rep.duration:.2f}s"
        }
        test_results.append(result)

def pytest_sessionfinish(session, exitstatus):
    # Generate the excel report at the end
    generate_excel_report(test_results, "Selenium_Report.xlsx")
