from appium.webdriver.common.appiumby import AppiumBy
from pages.base_page import BasePage

class LoginPage(BasePage):
    def __init__(self, driver):
        super().__init__(driver)
        self.username_input = (AppiumBy.ACCESSIBILITY_ID, "usernameInput")
        self.password_input = (AppiumBy.ACCESSIBILITY_ID, "passwordInput")
        self.login_button = (AppiumBy.ACCESSIBILITY_ID, "loginButton")
        self.logout_button = (AppiumBy.ACCESSIBILITY_ID, "logoutButton")

    def enter_username(self, text):
        self.send_keys(*self.username_input, text)

    def enter_password(self, text):
        self.send_keys(*self.password_input, text)

    def click_login(self):
        self.click(*self.login_button)
        
    def click_logout(self):
        self.click(*self.logout_button)
