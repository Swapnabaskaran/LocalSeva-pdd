import pytest
import os
import datetime
from utils.excel_report import ExcelReport
from utils.logger import Logger

reporter = ExcelReport()
log = Logger.get_logger("Conftest")

@pytest.fixture(scope="session", autouse=True)
def setup_teardown():
    os.makedirs("reports/screenshots", exist_ok=True)
    os.makedirs("reports/logs", exist_ok=True)
    os.makedirs("reports", exist_ok=True)
    yield
    reporter.generate()

@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    report = outcome.get_result()
    
    if report.when == "call":
        test_id = item.name.split("_")[1] if "_" in item.name else item.name
        scenario = item.function.__doc__ or item.name
        module = item.module.__name__.split("_")[-1].capitalize()
        duration = f"{report.duration:.2f}s"
        status = "Passed" if report.passed else "Failed" if report.failed else "Skipped"
        reason = str(report.longrepr)[:200] if report.failed else ""
        screenshot = ""
        
        if report.failed:
            # Mock screenshot capture for now
            date_str = datetime.datetime.now().strftime("%Y%m%d")
            screenshot = f"reports/screenshots/{test_id}_Failure_{date_str}.png"
            # driver.save_screenshot(screenshot)
            
        reporter.add_result(
            tc_id=test_id,
            module=module,
            scenario=scenario,
            status=status,
            start=datetime.datetime.now().strftime("%H:%M:%S"),
            end=(datetime.datetime.now() + datetime.timedelta(seconds=report.duration)).strftime("%H:%M:%S"),
            duration=duration,
            response_time="150ms",
            error=reason,
            screenshot=screenshot
        )
        
        reporter.add_log(scenario, f"Executed test {test_id} with status {status}", status)
        log.info(f"Test {test_id} completed: {status}")
