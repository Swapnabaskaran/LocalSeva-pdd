import pytest
from playwright.sync_api import Page
import time

@pytest.mark.e2e
@pytest.mark.smoke
class TestSmoke:
    def test_application_launch(self, page: Page):
        """Smoke - Application Launch"""
        page.goto("http://localhost:3000")
        time.sleep(0.5)

    def test_home_page_load(self, page: Page):
        """Smoke - Home Page Load"""
        page.goto("http://localhost:3000")
        time.sleep(0.5)

    def test_login_page_load(self, page: Page):
        """Smoke - Login Page Load"""
        page.goto("http://localhost:3000/login")
        time.sleep(0.5)

    def test_dashboard_load(self, page: Page):
        """Smoke - Dashboard Load"""
        page.goto("http://localhost:3000/dashboard")
        time.sleep(0.5)
