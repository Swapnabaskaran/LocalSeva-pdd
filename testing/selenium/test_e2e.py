import pytest
import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from utils.logger import setup_logger
from utils.reporter import Reporter
from pages.auth_page import AuthPage
from pages.customer_page import CustomerPage
from pages.base_page import BasePage

logger = setup_logger("Selenium_E2E", "testing/selenium/logs")
reporter = Reporter("Selenium", "testing/selenium")

# 21 Modules from Prompt
modules = [
    "User Registration", "User Login", "Service Search", "Service Categories",
    "Service Details", "Service Booking", "Booking Reschedule", "Booking Cancellation",
    "Booking Tracking", "Wallet", "Coupons", "Subscription Plans", "Notifications",
    "Favorites", "Saved Addresses", "Reviews & Ratings", "Referral Program",
    "Video Consultation", "Profile Management", "Customer Dashboard", "Logout"
]

test_data = []
for i in range(1, 301):
    module = modules[i % len(modules)]
    # Exactly 2 intentional failures as requested
    expected_status = "Failed" if i in [150, 250] else "Passed"
    test_data.append((f"TC_E2E_{i:03d}", module, f"Automated UI interaction for {module}", expected_status, i))

@pytest.fixture(scope="module")
def driver():
    """Setup real Chrome webdriver."""
    logger.info("Initializing Real Selenium WebDriver")
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1920,1080")
    
    driver = webdriver.Chrome(options=chrome_options)
    driver.implicitly_wait(2) # Short wait for faster execution of 300 tests
    yield driver
    logger.info("Closing Selenium WebDriver.")
    driver.quit()
    reporter.save()

@pytest.mark.parametrize("test_id, module, desc, expected_status, iteration", test_data)
def test_localseva_e2e_real_ui(driver, test_id, module, desc, expected_status, iteration):
    """
    Data-driven test executing 300 real browser interactions using POM.
    """
    start_time = time.time()
    logger.info(f"Executing: {test_id} - {module}")
    actual_status = "Passed"
    screenshot_path = ""
    
    auth_page = AuthPage(driver)
    customer_page = CustomerPage(driver)
    base_page = BasePage(driver)

    try:
        # Route the module to actual Selenium interaction logic
        if module == "User Login":
            auth_page.login(f"user{iteration}@test.com", "password123")
        elif module == "User Registration":
            auth_page.register(f"Test User {iteration}", f"new{iteration}@test.com", "pass")
        elif module == "Service Search":
            customer_page.search_service("plumber")
        elif module == "Service Booking":
            customer_page.book_service()
        elif module == "Wallet":
            customer_page.view_wallet()
        elif module == "Favorites":
            customer_page.add_favorite()
        else:
            # Generic navigation interaction for other modules
            path = "/" + module.lower().replace(" & ", "-").replace(" ", "-")
            customer_page.execute_generic_module(path)
            
        # Intentional Failure Injection
        if expected_status == "Failed":
            logger.info("Injecting intentional failure (invalid locator)...")
            base_page.click((By.ID, "this-element-does-not-exist"))

    except Exception as e:
        actual_status = "Failed"
        logger.error(f"{test_id} Failed: {str(e)}")
        
        # Real Selenium Screenshot Capture
        screenshots_dir = os.path.join(os.path.dirname(__file__), "screenshots")
        screenshot_path = os.path.join(screenshots_dir, f"{test_id}_failure.png")
        try:
            driver.save_screenshot(screenshot_path)
            logger.info(f"Real screenshot saved to {screenshot_path}")
        except Exception as ss_e:
            logger.error(f"Failed to capture screenshot: {str(ss_e)}")
            
    finally:
        duration = round(time.time() - start_time, 2)
        assert actual_status == expected_status, f"Expected {expected_status} but got {actual_status}"
        
        reporter.add_result(test_id, module, desc, "UI Interaction Successful", f"Interaction {actual_status}", actual_status, f"{duration}s")
