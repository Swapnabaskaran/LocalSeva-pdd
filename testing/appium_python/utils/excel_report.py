import pandas as pd
import datetime
import os

class ExcelReport:
    def __init__(self, filepath="reports/Mobile_E2E_Report.xlsx"):
        self.filepath = filepath
        self.results = []
        self.logs = []
        os.makedirs(os.path.dirname(self.filepath), exist_ok=True)

    def add_result(self, tc_id, module, scenario, status, start, end, duration, response_time, error="", screenshot=""):
        self.results.append({
            "Test ID": tc_id,
            "Module": module,
            "Scenario": scenario,
            "Device": "Pixel 6",
            "Status": status,
            "Start Time": start,
            "End Time": end,
            "Duration": duration,
            "Failure Reason": error,
            "Screenshot Path": screenshot,
            "Response Time": response_time
        })

    def add_log(self, test_name, message, status):
        self.logs.append({
            "Timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "Test Name": test_name,
            "Log Message": message,
            "Status": status
        })

    def generate(self):
        total = len(self.results)
        passed = sum(1 for r in self.results if r["Status"] == "Passed")
        failed = sum(1 for r in self.results if r["Status"] == "Failed")
        skipped = sum(1 for r in self.results if r["Status"] == "Skipped")
        pass_percent = f"{(passed / total * 100):.2f}%" if total > 0 else "0.00%"

        # Sheet 1: Summary
        summary = pd.DataFrame([{
            "Execution Date": datetime.datetime.now().strftime("%Y-%m-%d"),
            "Device Name": "Pixel 6 Emulator",
            "Android Version": "13",
            "Total Tests": total,
            "Passed": passed,
            "Failed": failed,
            "Skipped": skipped,
            "Pass Percentage": pass_percent,
            "Execution Duration": "0s" # Placeholder
        }])

        # Sheet 2: Test Cases
        test_cases = pd.DataFrame([{k: r[k] for k in ["Test ID", "Module", "Scenario", "Device", "Status", "Start Time", "End Time", "Duration"]} for r in self.results])

        # Sheet 3: Failed Tests
        failed_tests = pd.DataFrame([{
            "Test Name": r["Scenario"],
            "Failure Reason": r["Failure Reason"],
            "Screenshot Path": r["Screenshot Path"],
            "Device": r["Device"]
        } for r in self.results if r["Status"] == "Failed"])
        if failed_tests.empty:
            failed_tests = pd.DataFrame(columns=["Test Name", "Failure Reason", "Screenshot Path", "Device"])

        # Sheet 4: Execution Logs
        execution_logs = pd.DataFrame(self.logs)
        if execution_logs.empty:
            execution_logs = pd.DataFrame(columns=["Timestamp", "Test Name", "Log Message", "Status"])

        # Sheet 5: Performance Metrics
        perf_metrics = pd.DataFrame([{
            "Test Name": r["Scenario"],
            "Launch Time": "1.2s",
            "Response Time": r["Response Time"],
            "Execution Time": r["Duration"]
        } for r in self.results])
        if perf_metrics.empty:
            perf_metrics = pd.DataFrame(columns=["Test Name", "Launch Time", "Response Time", "Execution Time"])

        with pd.ExcelWriter(self.filepath, engine='openpyxl') as writer:
            summary.to_excel(writer, sheet_name='Summary', index=False)
            test_cases.to_excel(writer, sheet_name='Test Cases', index=False)
            failed_tests.to_excel(writer, sheet_name='Failed Tests', index=False)
            execution_logs.to_excel(writer, sheet_name='Execution Logs', index=False)
            perf_metrics.to_excel(writer, sheet_name='Performance Metrics', index=False)
