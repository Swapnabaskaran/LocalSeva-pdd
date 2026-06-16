from appium.webdriver.common.appiumby import AppiumBy
from pages.base_page import BasePage

class ProviderPage(BasePage):
    def __init__(self, driver):
        super().__init__(driver)
        self.accept_button = (AppiumBy.ACCESSIBILITY_ID, "acceptBookingBtn")
        self.reject_button = (AppiumBy.ACCESSIBILITY_ID, "rejectBookingBtn")
        self.availability_toggle = (AppiumBy.ACCESSIBILITY_ID, "availabilityToggle")

    def click_accept(self):
        self.click(*self.accept_button)

    def click_reject(self):
        self.click(*self.reject_button)

    def toggle_availability(self):
        self.click(*self.availability_toggle)
