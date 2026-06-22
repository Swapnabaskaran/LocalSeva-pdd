package com.localseva.utilities;

import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.io.FileHandler;

import java.io.File;
import java.io.IOException;

public class ScreenshotUtil {
    public static String captureScreenshot(String testName) {
        if (DriverFactory.getDriver() == null) {
            return "";
        }
        File src = ((TakesScreenshot) DriverFactory.getDriver()).getScreenshotAs(OutputType.FILE);
        String path = System.getProperty("user.dir") + "/screenshots/" + testName + ".png";
        File destination = new File(path);
        try {
            FileHandler.copy(src, destination);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return path;
    }
}
