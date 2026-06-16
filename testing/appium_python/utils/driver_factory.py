from appium import webdriver
from appium.options.android import UiAutomator2Options

class DriverFactory:
    @staticmethod
    def get_driver(mock=False):
        options = UiAutomator2Options()
        options.platform_name = 'Android'
        options.automation_name = 'UiAutomator2'
        options.device_name = 'Pixel 6'
        options.platform_version = '13'
        options.app_package = 'com.localseva'
        options.app_activity = 'MainActivity'
        
        if mock:
            # For CI environments where real emulator isn't available
            # We would normally connect to a mock server, but here we return None
            # or a mocked driver instance.
            return None
            
        return webdriver.Remote('http://localhost:4723', options=options)
