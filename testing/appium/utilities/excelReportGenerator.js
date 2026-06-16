const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');
const logger = require('./logger');

class ExcelReportGenerator {
    constructor() {
        this.workbook = new ExcelJS.Workbook();
        this.reportPath = path.join(process.cwd(), 'reports', 'Mobile_E2E_Report_31_Tests.xlsx');
        
        const reportDir = path.join(process.cwd(), 'reports');
        if (!fs.existsSync(reportDir)) {
            fs.mkdirSync(reportDir, { recursive: true });
        }

        this.summarySheet = this.workbook.addWorksheet('Summary');
        this.testCasesSheet = this.workbook.addWorksheet('Test Cases');
        this.failedTestsSheet = this.workbook.addWorksheet('Failed Tests');
        this.executionLogsSheet = this.workbook.addWorksheet('Execution Logs');

        this.initSheets();
    }

    initSheets() {
        this.summarySheet.columns = [
            { header: 'Execution Date', key: 'date', width: 20 },
            { header: 'Device Name', key: 'device', width: 20 },
            { header: 'Android Version', key: 'version', width: 15 },
            { header: 'Total Tests', key: 'total', width: 15 },
            { header: 'Passed', key: 'passed', width: 15 },
            { header: 'Failed', key: 'failed', width: 15 },
            { header: 'Skipped', key: 'skipped', width: 15 },
            { header: 'Pass Percentage', key: 'passPercent', width: 15 },
            { header: 'Execution Duration', key: 'duration', width: 20 }
        ];

        this.testCasesSheet.columns = [
            { header: 'Test ID', key: 'id', width: 15 },
            { header: 'Module', key: 'module', width: 20 },
            { header: 'Scenario', key: 'scenario', width: 40 },
            { header: 'Device', key: 'device', width: 20 },
            { header: 'Status', key: 'status', width: 15 },
            { header: 'Start Time', key: 'start', width: 20 },
            { header: 'End Time', key: 'end', width: 20 },
            { header: 'Duration', key: 'duration', width: 15 }
        ];

        this.failedTestsSheet.columns = [
            { header: 'Test Name', key: 'testName', width: 40 },
            { header: 'Failure Reason', key: 'reason', width: 50 },
            { header: 'Screenshot Path', key: 'screenshot', width: 40 },
            { header: 'Device', key: 'device', width: 20 },
            { header: 'Android Version', key: 'version', width: 15 },
            { header: 'Activity Name', key: 'activity', width: 20 }
        ];

        this.executionLogsSheet.columns = [
            { header: 'Timestamp', key: 'timestamp', width: 20 },
            { header: 'Test Name', key: 'testName', width: 40 },
            { header: 'Step', key: 'step', width: 40 },
            { header: 'Result', key: 'result', width: 15 },
            { header: 'Remarks', key: 'remarks', width: 30 }
        ];
    }

    async addSummary(data) {
        this.summarySheet.addRow(data);
    }

    async addTestCase(data) {
        this.testCasesSheet.addRow(data);
    }

    async addFailedTest(data) {
        this.failedTestsSheet.addRow(data);
    }

    async addExecutionLog(data) {
        this.executionLogsSheet.addRow(data);
    }

    async save() {
        try {
            await this.workbook.xlsx.writeFile(this.reportPath);
            logger.info(`Excel report generated successfully at ${this.reportPath}`);
        } catch (error) {
            logger.error(`Failed to save Excel report: ${error.message}`);
        }
    }
}

module.exports = new ExcelReportGenerator();
