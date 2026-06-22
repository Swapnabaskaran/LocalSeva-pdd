package com.localseva.utilities;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

public class TestListener implements ITestListener {
    private static ExtentReports extent = ExtentManager.getInstance();
    private static ThreadLocal<ExtentTest> test = new ThreadLocal<>();

    @Override
    public void onTestStart(ITestResult result) {
        // When using DataProvider, we can fetch parameters if available
        String testName = result.getMethod().getMethodName();
        if (result.getParameters().length > 0) {
            testName = result.getParameters()[0].toString();
        }
        ExtentTest extentTest = extent.createTest(testName);
        test.set(extentTest);
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        test.get().log(Status.PASS, "Test Passed");
    }

    @Override
    public void onTestFailure(ITestResult result) {
        String testName = result.getMethod().getMethodName();
        if (result.getParameters().length > 0) {
            testName = result.getParameters()[0].toString();
        }
        String screenshotPath = ScreenshotUtil.captureScreenshot(testName);
        
        test.get().log(Status.FAIL, "Test Failed: " + result.getThrowable().getMessage());
        if (!screenshotPath.isEmpty()) {
            test.get().addScreenCaptureFromPath(screenshotPath, "Failure Screenshot");
        }
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        test.get().log(Status.SKIP, "Test Skipped: " + result.getThrowable().getMessage());
    }

    @Override
    public void onFinish(ITestContext context) {
        extent.flush();
    }
}
