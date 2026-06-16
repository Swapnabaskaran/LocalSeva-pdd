from appium.webdriver.common.appiumby import AppiumBy
from pages.base_page import BasePage

class BookingPage(BasePage):
    def __init__(self, driver):
        super().__init__(driver)
        self.search_input = (AppiumBy.ACCESSIBILITY_ID, "searchInput")
        self.service_item = (AppiumBy.ACCESSIBILITY_ID, "serviceItem")
        self.book_button = (AppiumBy.ACCESSIBILITY_ID, "bookButton")
        self.cancel_button = (AppiumBy.ACCESSIBILITY_ID, "cancelButton")
        self.history_tab = (AppiumBy.ACCESSIBILITY_ID, "historyTab")

    def search_service(self, text):
        self.send_keys(*self.search_input, text)

    def click_service_item(self):
        self.click(*self.service_item)

    def click_book(self):
        self.click(*self.book_button)

    def click_cancel(self):
        self.click(*self.cancel_button)
        
    def click_history(self):
        self.click(*self.history_tab)
