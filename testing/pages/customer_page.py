from selenium.webdriver.common.by import By
from .base_page import BasePage

class CustomerPage(BasePage):
    # Locators
    SEARCH_INPUT = (By.CSS_SELECTOR, "input[placeholder*='Search']")
    SEARCH_BUTTON = (By.CSS_SELECTOR, "button:has(svg.lucide-search)")
    SERVICE_CARD = (By.CSS_SELECTOR, ".service-card, div:has(h3)")
    BOOK_NOW_BTN = (By.XPATH, "//button[contains(text(), 'Book')]")
    WALLET_BALANCE = (By.XPATH, "//*[contains(text(), 'Balance')]")
    FAVORITE_BTN = (By.CSS_SELECTOR, "button:has(svg.lucide-heart)")

    def search_service(self, query):
        self.navigate_to("/search")
        self.send_keys(self.SEARCH_INPUT, query)
        self.click(self.SEARCH_BUTTON)

    def book_service(self):
        self.navigate_to("/services")
        self.click(self.SERVICE_CARD)
        self.click(self.BOOK_NOW_BTN)
        
    def view_wallet(self):
        self.navigate_to("/wallet")
        return self.is_visible(self.WALLET_BALANCE)

    def add_favorite(self):
        self.navigate_to("/services")
        self.click(self.FAVORITE_BTN)

    def execute_generic_module(self, path):
        """Fallback interaction for arbitrary modules built generically."""
        self.navigate_to(path)
        # Attempt to click any action button on the screen to simulate interaction
        action_btn = (By.CSS_SELECTOR, "button")
        if self.is_visible(action_btn):
            self.click(action_btn)
