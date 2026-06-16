# LocalSeva Playwright E2E Framework

This is the official Python Playwright End-to-End testing framework for the LocalSeva application.

## Prerequisites
- Python 3.11+
- Node.js (for backend/frontend apps if running locally)

## Installation

1. Create and activate a virtual environment (optional but recommended):
```bash
python -m venv venv
.\venv\Scripts\activate  # Windows
source venv/bin/activate # Mac/Linux
```

2. Install the required Python packages:
```bash
pip install -r requirements.txt
```

3. Install Playwright browsers:
```bash
playwright install chromium
```

## Running Tests

To run the full test suite and automatically capture screenshots and traces for failures:
```bash
python -m pytest tests/
```

To run a specific module (e.g., authentication tests):
```bash
python -m pytest -m auth
```

## Generating the Excel Report

Once the tests have completed, the framework will dump the results into `reports/results.json`.
To convert this into the beautifully formatted `Mobile_E2E_Report.xlsx`:

```bash
python generate_excel_report.py
```

You will find the generated report at `reports/excel/Mobile_E2E_Report.xlsx`.
Screenshots of any failed tests will be automatically saved to `reports/screenshots/`.
