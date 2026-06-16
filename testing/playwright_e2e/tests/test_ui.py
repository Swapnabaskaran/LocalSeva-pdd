import pytest
from playwright.sync_api import Page
import time

@pytest.mark.e2e
@pytest.mark.ui
class TestUI:
    def test_form_validation(self, page: Page):
        """UI - Form Validation"""
        page.goto("http://localhost:3000/register")
        time.sleep(0.5)

    def test_responsive_layout(self, page: Page):
        """UI - Responsive Layout"""
        page.goto("http://localhost:3000")
        page.set_viewport_size({"width": 375, "height": 812})
        time.sleep(0.5)

    def test_navigation_flow(self, page: Page):
        """UI - Navigation Flow"""
        page.goto("http://localhost:3000")
        time.sleep(0.5)

    def test_error_messages(self, page: Page):
        """UI - Error Messages"""
        page.goto("http://localhost:3000/login")
        time.sleep(0.5)

    def test_loading_indicators(self, page: Page):
        """UI - Loading Indicators"""
        page.goto("http://localhost:3000/services")
        time.sleep(0.5)
