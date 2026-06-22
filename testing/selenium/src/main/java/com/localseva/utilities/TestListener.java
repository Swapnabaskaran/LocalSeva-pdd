package com.localseva.utilities;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;

public class TestListener implements ITestListener {
    private static ExtentReports extent = ExtentManager.getInstance();
    private static ThreadLocal<ExtentTest> test = new ThreadLocal<>();
    private static ExcelReportGenerator excelReport = new ExcelReportGenerator();
    private long startTime;

    @Override
    public void onStart(ITestContext context) {
        new File("reports").mkdirs();
        new File("screenshots").mkdirs();
        new File("logs").mkdirs();
    }

    @Override
    public void onTestStart(ITestResult result) {
        startTime = System.currentTimeMillis();
        ExtentTest extentTest = extent.createTest(result.getMethod().getMethodName());
        test.set(extentTest);
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        long duration = System.currentTimeMillis() - startTime;
        test.get().log(Status.PASS, "Test Passed");
        String module = result.getTestClass().getRealClass().getSimpleName().replace("Tests", "");
        excelReport.addResult("TC_" + System.currentTimeMillis(), module, result.getMethod().getMethodName(), "Expected Pass", "Passed", "PASS", duration, "Chrome", "QA");
    }

    @Override
    public void onTestFailure(ITestResult result) {
        long duration = System.currentTimeMillis() - startTime;
        String base64Screenshot = ((TakesScreenshot) BaseTest.getDriver()).getScreenshotAs(OutputType.BASE64);
        test.get().log(Status.FAIL, "Test Failed: " + result.getThrowable().getMessage());
        test.get().addScreenCaptureFromBase64String(base64Screenshot, "Failure Screenshot");
        
        // Save screenshot to file
        try {
            byte[] decoded = Base64.getDecoder().decode(base64Screenshot);
            Files.write(Paths.get("screenshots/" + result.getMethod().getMethodName() + ".png"), decoded);
        } catch (IOException e) {
            e.printStackTrace();
        }

        String module = result.getTestClass().getRealClass().getSimpleName().replace("Tests", "");
        excelReport.addResult("TC_" + System.currentTimeMillis(), module, result.getMethod().getMethodName(), "Expected Pass", "Failed", "FAIL", duration, "Chrome", "QA");
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        test.get().log(Status.SKIP, "Test Skipped");
    }

    @Override
    public void onFinish(ITestContext context) {
        extent.flush();
        excelReport.generateReport("reports/Selenium_Report.xlsx");
        
        // Generate a dummy HTML version of Excel
        try {
            Files.write(Paths.get("reports/Selenium_Report.html"), "<html><body><h1>Selenium Report</h1><p>Check the Extent Report or Excel file for details.</p></body></html>".getBytes());
        } catch(Exception e) {}
    }
}
