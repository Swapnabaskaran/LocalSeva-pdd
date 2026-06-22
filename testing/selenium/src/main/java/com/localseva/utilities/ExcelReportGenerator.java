package com.localseva.utilities;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;

public class ExcelReportGenerator {
    private List<String[]> results = new ArrayList<>();

    public synchronized void addResult(String tcId, String module, String desc, String expected, String actual, String status, long duration, String browser, String env) {
        results.add(new String[]{tcId, module, desc, expected, actual, status, String.valueOf(duration) + "ms", browser, env});
    }

    public synchronized void generateReport(String path) {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Test Results");
        
        Row header = sheet.createRow(0);
        String[] columns = {"Test Case ID", "Module", "Description", "Expected Result", "Actual Result", "Status", "Execution Time", "Browser", "Environment"};
        for (int i = 0; i < columns.length; i++) {
            header.createCell(i).setCellValue(columns[i]);
        }

        int rowNum = 1;
        for (String[] result : results) {
            Row row = sheet.createRow(rowNum++);
            for (int i = 0; i < result.length; i++) {
                row.createCell(i).setCellValue(result[i]);
            }
        }

        try (FileOutputStream fileOut = new FileOutputStream(path)) {
            workbook.write(fileOut);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
