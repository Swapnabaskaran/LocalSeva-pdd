import pandas as pd
import datetime
import os

class SecurityExcelReport:
    def __init__(self, filepath="reports/Security_Vulnerability_Report.xlsx"):
        self.filepath = filepath
        self.results = []
        self.logs = []
        os.makedirs(os.path.dirname(self.filepath), exist_ok=True)

    def add_result(self, tc_id, category, check, severity, status, start, end, duration, reason="", recommendation="", evidence=""):
        self.results.append({
            "Test ID": tc_id,
            "Category": category,
            "Vulnerability Check": check,
            "Severity": severity,
            "Status": status,
            "Start Time": start,
            "End Time": end,
            "Duration": duration,
            "Failure Reason": reason,
            "Recommendation": recommendation,
            "Evidence Path": evidence
        })

    def add_log(self, test_name, tool, message, status):
        self.logs.append({
            "Timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "Test Name": test_name,
            "Tool Used": tool,
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
            "Environment": "Staging",
            "Total Tests": total,
            "Passed": passed,
            "Failed": failed,
            "Skipped": skipped,
            "Pass Percentage": pass_percent,
            "Scan Duration": "0s" # Placeholder
        }])

        # Sheet 2: Vulnerability Test Cases
        vulnerabilities = pd.DataFrame([{k: r[k] for k in ["Test ID", "Category", "Vulnerability Check", "Severity", "Status", "Start Time", "End Time", "Duration"]} for r in self.results])

        # Sheet 3: Failed Vulnerabilities
        failed_tests = pd.DataFrame([{
            "Test Name": r["Vulnerability Check"],
            "Severity": r["Severity"],
            "Failure Reason": r["Failure Reason"],
            "Recommendation": r["Recommendation"],
            "Evidence Path": r["Evidence Path"]
        } for r in self.results if r["Status"] == "Failed"])
        if failed_tests.empty:
            failed_tests = pd.DataFrame(columns=["Test Name", "Severity", "Failure Reason", "Recommendation", "Evidence Path"])

        # Sheet 4: Security Logs
        execution_logs = pd.DataFrame(self.logs)
        if execution_logs.empty:
            execution_logs = pd.DataFrame(columns=["Timestamp", "Test Name", "Tool Used", "Log Message", "Status"])

        # Sheet 5: Security Metrics
        severity_counts = {"Critical": 0, "High": 0, "Medium": 0, "Low": 0, "Info": 0}
        for r in self.results:
            if r["Status"] == "Failed":
                sev = r["Severity"]
                if sev in severity_counts:
                    severity_counts[sev] += 1
        
        metrics = []
        for sev, count in severity_counts.items():
            if count > 0:
                score = count * (5 if sev == "Critical" else 4 if sev == "High" else 3 if sev == "Medium" else 2 if sev == "Low" else 1)
                metrics.append({
                    "Severity": sev,
                    "Count": count,
                    "Risk Score": score,
                    "Remediation Status": "Open"
                })
        
        perf_metrics = pd.DataFrame(metrics)
        if perf_metrics.empty:
            perf_metrics = pd.DataFrame(columns=["Severity", "Count", "Risk Score", "Remediation Status"])

        with pd.ExcelWriter(self.filepath, engine='openpyxl') as writer:
            summary.to_excel(writer, sheet_name='Summary', index=False)
            vulnerabilities.to_excel(writer, sheet_name='Vulnerability Test Cases', index=False)
            failed_tests.to_excel(writer, sheet_name='Failed Vulnerabilities', index=False)
            execution_logs.to_excel(writer, sheet_name='Security Logs', index=False)
            perf_metrics.to_excel(writer, sheet_name='Security Metrics', index=False)
