import json
import pandas as pd
import datetime
import os

RESULTS_FILE = "reports/results.json"
REPORT_FILE = "reports/excel/Mobile_E2E_Report.xlsx"

def generate_report():
    if not os.path.exists(RESULTS_FILE):
        print(f"Results file {RESULTS_FILE} not found. Ensure tests run first.")
        # Create empty if not found
        results = {"test_cases": [], "execution_logs": []}
    else:
        with open(RESULTS_FILE, "r") as f:
            results = json.load(f)
            
    test_cases = results.get("test_cases", [])
    execution_logs = results.get("execution_logs", [])
    
    total = len(test_cases)
    passed = sum(1 for tc in test_cases if tc['status'] == 'Passed')
    failed = sum(1 for tc in test_cases if tc['status'] == 'Failed')
    skipped = sum(1 for tc in test_cases if tc['status'] == 'Skipped')
    
    pass_percent = f"{(passed / total * 100):.2f}%" if total > 0 else "0.00%"
    
    # Sheet 1: Summary
    summary_data = {
        "Execution Date": [datetime.datetime.now().strftime("%Y-%m-%d")],
        "Device Name": ["Desktop Chrome"],
        "Android Version": ["N/A"],
        "Total Tests": [total],
        "Passed": [passed],
        "Failed": [failed],
        "Skipped": [skipped],
        "Pass Percentage": [pass_percent],
        "Execution Duration": ["0s"]
    }
    df_summary = pd.DataFrame(summary_data)
    
    # Sheet 2: Test Cases
    # Test ID, Module, Scenario, Device, Status, Start Time, End Time, Duration
    tc_data = []
    failed_data = []
    perf_data = []
    
    for tc in test_cases:
        tc_data.append({
            "Test ID": tc['id'],
            "Module": tc['module'],
            "Scenario": tc['scenario'],
            "Device": tc['device'],
            "Status": tc['status'],
            "Start Time": tc['start'],
            "End Time": tc['end'],
            "Duration": tc['duration']
        })
        
        perf_data.append({
            "Test Name": tc['testName'],
            "Response Time": tc.get('responseTime', 'N/A'),
            "Page Load Time": tc.get('pageLoadTime', 'N/A'),
            "API Time": tc.get('apiTime', 'N/A')
        })
        
        if tc['status'] == 'Failed':
            failed_data.append({
                "Test Name": tc['testName'],
                "Failure Reason": tc['reason'],
                "Screenshot Path": tc['screenshot'],
                "Device": tc['device']
            })
            
    df_tc = pd.DataFrame(tc_data)
    df_failed = pd.DataFrame(failed_data)
    
    # Sheet 4: Execution Logs
    # Timestamp, Test Name, Log Message, Status
    logs_data = []
    for log in execution_logs:
        logs_data.append({
            "Timestamp": log['timestamp'],
            "Test Name": log['testName'],
            "Log Message": log['message'],
            "Status": log['status']
        })
    df_logs = pd.DataFrame(logs_data)
    
    # Sheet 5: Performance Metrics
    df_perf = pd.DataFrame(perf_data)
    
    # Ensure columns exist even if empty
    if df_tc.empty:
        df_tc = pd.DataFrame(columns=["Test ID", "Module", "Scenario", "Device", "Status", "Start Time", "End Time", "Duration"])
    if df_failed.empty:
        df_failed = pd.DataFrame(columns=["Test Name", "Failure Reason", "Screenshot Path", "Device"])
    if df_logs.empty:
        df_logs = pd.DataFrame(columns=["Timestamp", "Test Name", "Log Message", "Status"])
    if df_perf.empty:
        df_perf = pd.DataFrame(columns=["Test Name", "Response Time", "Page Load Time", "API Time"])

    os.makedirs(os.path.dirname(REPORT_FILE), exist_ok=True)

    with pd.ExcelWriter(REPORT_FILE, engine='openpyxl') as writer:
        df_summary.to_excel(writer, sheet_name='Summary', index=False)
        df_tc.to_excel(writer, sheet_name='Test Cases', index=False)
        df_failed.to_excel(writer, sheet_name='Failed Tests', index=False)
        df_logs.to_excel(writer, sheet_name='Execution Logs', index=False)
        df_perf.to_excel(writer, sheet_name='Performance Metrics', index=False)
        
    print(f"Generated {REPORT_FILE}")

if __name__ == "__main__":
    generate_report()
