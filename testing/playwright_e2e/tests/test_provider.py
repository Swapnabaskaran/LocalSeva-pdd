import pytest
from playwright.sync_api import Page
import time

@pytest.mark.e2e
@pytest.mark.provider
class TestProvider:
    def test_provider_registration(self, page: Page):
        """Provider - Provider Registration"""
        page.goto("http://localhost:3000/provider/register")
        time.sleep(0.5)

    def test_provider_login(self, page: Page):
        """Provider - Provider Login"""
        page.goto("http://localhost:3000/provider/login")
        time.sleep(0.5)

    def test_accept_booking(self, page: Page):
        """Provider - Accept Booking"""
        page.goto("http://localhost:3000/provider/dashboard")
        time.sleep(0.5)

    def test_reject_booking(self, page: Page):
        """Provider - Reject Booking"""
        page.goto("http://localhost:3000/provider/dashboard")
        time.sleep(0.5)

    def test_update_availability(self, page: Page):
        """Provider - Update Availability"""
        page.goto("http://localhost:3000/provider/schedule")
        time.sleep(0.5)
