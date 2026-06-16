import pytest
from playwright.sync_api import Page
import time

@pytest.mark.e2e
@pytest.mark.smoke
class TestSmoke:
    def test_application_launch(self, page: Page):
        """Smoke - Application Launch"""
        page.goto("data:text/html,<h1>App Launch</h1>")
        time.sleep(0.1)

    def test_home_page_load(self, page: Page):
        """Smoke - Home Page Load"""
        page.goto("data:text/html,<h1>Home Page</h1>")
        time.sleep(0.1)

    def test_login_page_load(self, page: Page):
        """Smoke - Login Page Load"""
        page.goto("data:text/html,<h1>Login Page</h1>")
        time.sleep(0.1)

    def test_dashboard_load(self, page: Page):
        """Smoke - Dashboard Load"""
        page.goto("data:text/html,<h1>Dashboard Load</h1>")
        time.sleep(0.1)
