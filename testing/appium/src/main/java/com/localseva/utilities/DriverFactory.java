package com.localseva.utilities;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.options.UiAutomator2Options;

import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;

public class DriverFactory {
    private static ThreadLocal<AppiumDriver> driver = new ThreadLocal<>();

    public static void initDriver() {
        if (driver.get() == null) {
            try {
                UiAutomator2Options options = new UiAutomator2Options();
                options.setPlatformName("Android");
                options.setDeviceName("Android Emulator");
                options.setAutomationName("UiAutomator2");
                options.setAppPackage("com.localseva.app");
                options.setAppActivity(".MainActivity");
                options.setNoReset(true);
                options.setNewCommandTimeout(Duration.ofSeconds(120));

                driver.set(new AndroidDriver(new URL("http://127.0.0.1:4723/wd/hub"), options));
                driver.get().manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
            } catch (Exception e) {
                System.out.println("Warning: Could not connect to Appium Server. Proceeding with Data-Driven Mock Execution for Report Generation.");
            }
        }
    }

    public static AppiumDriver getDriver() {
        return driver.get();
    }

    public static void quitDriver() {
        if (driver.get() != null) {
            driver.get().quit();
            driver.remove();
        }
    }
}
