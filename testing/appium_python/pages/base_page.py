class BasePage:
    def __init__(self, driver):
        self.driver = driver

    def find_element(self, locator_type, locator_value):
        if not self.driver:
            return None # Mock
        return self.driver.find_element(locator_type, locator_value)

    def click(self, locator_type, locator_value):
        element = self.find_element(locator_type, locator_value)
        if element:
            element.click()

    def send_keys(self, locator_type, locator_value, text):
        element = self.find_element(locator_type, locator_value)
        if element:
            element.send_keys(text)
