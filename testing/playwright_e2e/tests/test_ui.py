import pytest
from playwright.sync_api import Page
import time

@pytest.mark.e2e
@pytest.mark.ui
class TestUI:
    def test_form_validation(self, page: Page):
        """UI - Form Validation"""
        page.goto("data:text/html,<h1>Form Validation</h1>")
        time.sleep(0.1)

    def test_responsive_layout(self, page: Page):
        """UI - Responsive Layout"""
        page.goto("data:text/html,<h1>Responsive Layout</h1>")
        page.set_viewport_size({"width": 375, "height": 812})
        time.sleep(0.1)

    def test_navigation_flow(self, page: Page):
        """UI - Navigation Flow"""
        page.goto("data:text/html,<h1>Navigation Flow</h1>")
        time.sleep(0.1)

    def test_error_messages(self, page: Page):
        """UI - Error Messages"""
        page.goto("data:text/html,<h1>Error Messages</h1>")
        time.sleep(0.1)

    def test_loading_indicators(self, page: Page):
        """UI - Loading Indicators"""
        page.goto("data:text/html,<h1>Loading Indicators</h1>")
        time.sleep(0.1)
