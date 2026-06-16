from appium.webdriver.common.appiumby import AppiumBy
from pages.base_page import BasePage

class AdminPage(BasePage):
    def __init__(self, driver):
        super().__init__(driver)
        self.users_tab = (AppiumBy.ACCESSIBILITY_ID, "usersManagementTab")
        self.providers_tab = (AppiumBy.ACCESSIBILITY_ID, "providersManagementTab")
        self.bookings_tab = (AppiumBy.ACCESSIBILITY_ID, "bookingsMonitoringTab")

    def click_users_tab(self):
        self.click(*self.users_tab)

    def click_providers_tab(self):
        self.click(*self.providers_tab)

    def click_bookings_tab(self):
        self.click(*self.bookings_tab)
