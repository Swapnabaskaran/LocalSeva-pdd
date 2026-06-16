import pytest
from playwright.sync_api import Page
import time

@pytest.mark.e2e
@pytest.mark.admin
class TestAdmin:
    def test_admin_login(self, page: Page):
        """Admin - Admin Login"""
        page.goto("http://localhost:3000/admin/login")
        time.sleep(0.5)

    def test_user_management(self, page: Page):
        """Admin - User Management"""
        page.goto("http://localhost:3000/admin/users")
        time.sleep(0.5)

    def test_provider_management(self, page: Page):
        """Admin - Provider Management"""
        page.goto("http://localhost:3000/admin/providers")
        time.sleep(0.5)

    def test_booking_monitoring(self, page: Page):
        """Admin - Booking Monitoring"""
        page.goto("http://localhost:3000/admin/bookings")
        time.sleep(0.5)
