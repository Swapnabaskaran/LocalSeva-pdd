package com.localseva.utilities;

import org.apache.poi.ss.usermodel.*;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ExcelUtils {

    public static Object[][] getTestData(String filePath, String sheetName) {
        List<Object[]> dataList = new ArrayList<>();
        try (FileInputStream fis = new FileInputStream(new File(filePath));
             Workbook workbook = WorkbookFactory.create(fis)) {
             
            Sheet sheet = workbook.getSheet(sheetName);
            if (sheet == null) return new Object[0][0];

            int rowCount = sheet.getPhysicalNumberOfRows();
            for (int i = 1; i < rowCount; i++) { // Skip header
                Row row = sheet.getRow(i);
                if (row != null) {
                    // Columns: ID, Module, Scenario, Expected, Status (Intended), ExecutionTime
                    String id = getCellData(row.getCell(0));
                    String module = getCellData(row.getCell(1));
                    String scenario = getCellData(row.getCell(2));
                    String expected = getCellData(row.getCell(3));
                    String intendedStatus = getCellData(row.getCell(4));
                    String executionTime = getCellData(row.getCell(5));
                    
                    dataList.add(new Object[]{id, module, scenario, expected, intendedStatus, executionTime});
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        Object[][] data = new Object[dataList.size()][6];
        for (int i = 0; i < dataList.size(); i++) {
            data[i] = dataList.get(i);
        }
        return data;
    }

    private static String getCellData(Cell cell) {
        if (cell == null) return "";
        switch (cell.getCellType()) {
            case STRING: return cell.getStringCellValue();
            case NUMERIC: return String.valueOf((int)cell.getNumericCellValue());
            default: return "";
        }
    }
}
