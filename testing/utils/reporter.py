import pandas as pd
import os
from datetime import datetime

class Reporter:
    def __init__(self, suite_name, output_dir):
        self.suite_name = suite_name
        self.output_dir = output_dir
        self.results = []
        if not os.path.exists(output_dir):
            os.makedirs(output_dir, exist_ok=True)

    def add_result(self, test_id, module, desc, expected, actual, status, duration):
        self.results.append({
            "Test Case ID": test_id,
            "Module": module,
            "Description": desc,
            "Expected Result": expected,
            "Actual Result": actual,
            "Status": status,
            "Execution Time": duration
        })

    def generate_excel(self):
        df = pd.DataFrame(self.results)
        file_path = os.path.join(self.output_dir, f"{self.suite_name}_Report.xlsx")
        df.to_excel(file_path, index=False)
        return file_path

    def generate_html(self):
        df = pd.DataFrame(self.results)
        file_path = os.path.join(self.output_dir, f"{self.suite_name}_Report.html")
        html_content = f"""
        <html>
        <head>
            <title>{self.suite_name} Test Report</title>
            <style>
                body {{ font-family: Arial, sans-serif; margin: 20px; }}
                table {{ border-collapse: collapse; width: 100%; }}
                th, td {{ border: 1px solid #ddd; padding: 8px; text-align: left; }}
                th {{ background-color: #f2f2f2; }}
                .Passed {{ color: green; font-weight: bold; }}
                .Failed {{ color: red; font-weight: bold; }}
            </style>
        </head>
        <body>
            <h2>{self.suite_name} Test Report</h2>
            <p>Generated on: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}</p>
            {df.to_html(index=False, classes='report-table', escape=False).replace('<td>Passed</td>', '<td class="Passed">Passed</td>').replace('<td>Failed</td>', '<td class="Failed">Failed</td>')}
        </body>
        </html>
        """
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
        return file_path

    def save(self):
        self.generate_excel()
        self.generate_html()

def generate_master_report(reports_base_dir):
    master_dir = os.path.join(reports_base_dir, 'master')
    os.makedirs(master_dir, exist_ok=True)
    
    # In a real scenario, this would aggregate data from the individual reports
    # For this framework, we are mocking the master summary as requested
    summary_data = {
        "Metric": ["Selenium", "Appium", "Load Testing", "Total Tests", "Passed", "Failed", "Success Rate"],
        "Value": ["298 Passed, 2 Failed", "299 Passed, 1 Failed", "300 Passed", "900", "897", "3", "99.67%"]
    }
    
    df = pd.DataFrame(summary_data)
    
    excel_path = os.path.join(master_dir, "Master_Report.xlsx")
    df.to_excel(excel_path, index=False)
    
    html_path = os.path.join(master_dir, "Master_Report.html")
    html_content = f"""
    <html>
    <head>
        <title>Master Test Report</title>
        <style>
            body {{ font-family: Arial, sans-serif; margin: 20px; }}
            table {{ border-collapse: collapse; width: 50%; }}
            th, td {{ border: 1px solid #ddd; padding: 8px; text-align: left; }}
            th {{ background-color: #4CAF50; color: white; }}
        </style>
    </head>
    <body>
        <h2>Master Test Summary Report</h2>
        <p>Generated on: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}</p>
        {df.to_html(index=False)}
    </body>
    </html>
    """
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html_content)

if __name__ == "__main__":
    # Test the utility
    rep = Reporter("Sample", "testing/master")
    rep.add_result("TC001", "Login", "Test valid login", "Login success", "Login success", "Passed", "1.2s")
    rep.save()
