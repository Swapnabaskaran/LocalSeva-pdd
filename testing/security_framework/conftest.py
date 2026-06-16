import pytest
import os
import datetime
from utils.excel_report import SecurityExcelReport
from utils.logger import SecurityLogger

reporter = SecurityExcelReport()
log = SecurityLogger.get_logger("SecurityConftest")

@pytest.fixture(scope="session", autouse=True)
def setup_teardown():
    os.makedirs("reports", exist_ok=True)
    yield
    reporter.generate()

@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    report = outcome.get_result()
    
    if report.when == "call":
        # Extract Test ID and Description from docstring
        doc = item.function.__doc__ or item.name
        parts = doc.split(" - ", 1)
        tc_id = parts[0].strip() if len(parts) > 1 else item.name
        check_name = parts[1].strip() if len(parts) > 1 else item.name
        
        module = item.module.__name__.split("_")[-1].replace(".py", "").capitalize()
        duration = f"{report.duration:.2f}s"
        status = "Passed" if report.passed else "Failed" if report.failed else "Skipped"
        
        reason = ""
        recommendation = ""
        severity = "High" # Default
        
        if report.failed:
            reason = str(report.longrepr.reprcrash.message) if hasattr(report.longrepr, 'reprcrash') else str(report.longrepr)[:200]
            if "Content-Security-Policy" in reason:
                severity = "Medium"
                recommendation = "Implement CSP header across all pages."
        
        reporter.add_result(
            tc_id=tc_id,
            category=f"{module} Security",
            check=check_name,
            severity=severity,
            status=status,
            start=datetime.datetime.now().strftime("%H:%M:%S"),
            end=(datetime.datetime.now() + datetime.timedelta(seconds=report.duration)).strftime("%H:%M:%S"),
            duration=duration,
            reason=reason,
            recommendation=recommendation,
            evidence="reports/security_execution.log" if report.failed else ""
        )
        
        reporter.add_log(check_name, "Pytest (ZAP/Nmap Mock)", f"Executed {tc_id} with status {status}", status)
        log.info(f"Security Test {tc_id} completed: {status}")
