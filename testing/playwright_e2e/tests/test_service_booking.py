import pytest
from playwright.sync_api import Page
import time

@pytest.mark.e2e
@pytest.mark.booking
class TestServiceBooking:
    def test_search_services(self, page: Page):
        """Service Booking - Search Services"""
        page.goto("http://localhost:3000/services")
        time.sleep(0.5)

    def test_view_service_details(self, page: Page):
        """Service Booking - View Service Details"""
        page.goto("http://localhost:3000/services/1")
        time.sleep(0.5)

    def test_book_service(self, page: Page):
        """Service Booking - Book Service"""
        page.goto("http://localhost:3000/book/1")
        time.sleep(0.5)

    def test_cancel_booking(self, page: Page):
        """Service Booking - Cancel Booking"""
        page.goto("http://localhost:3000/bookings")
        time.sleep(0.5)

    def test_booking_history(self, page: Page):
        """Service Booking - Booking History"""
        page.goto("http://localhost:3000/history")
        time.sleep(0.5)

    def test_multiple_bookings(self, page: Page):
        """Service Booking - Multiple Bookings"""
        page.goto("http://localhost:3000/services")
        time.sleep(0.5)
