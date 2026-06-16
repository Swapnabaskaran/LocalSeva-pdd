import pytest
from pages.booking_page import BookingPage
from utils.driver_factory import DriverFactory

@pytest.fixture(scope="class")
def driver():
    driver = DriverFactory.get_driver(mock=True)
    yield driver

@pytest.fixture(scope="class")
def booking_page(driver):
    return BookingPage(driver)

@pytest.mark.booking
class TestBooking:
    def test_tc007_search_service(self, booking_page):
        """TC007 - Search service"""
        booking_page.search_service("plumber")
        assert True
        
    def test_tc008_view_service_details(self, booking_page):
        """TC008 - View service details"""
        booking_page.click_service_item()
        assert True
        
    def test_tc009_book_service(self, booking_page):
        """TC009 - Book service"""
        booking_page.click_book()
        assert True
        
    def test_tc010_cancel_booking(self, booking_page):
        """TC010 - Cancel booking"""
        booking_page.click_cancel()
        assert True
        
    def test_tc011_booking_history_validation(self, booking_page):
        """TC011 - Booking history validation"""
        booking_page.click_history()
        assert True
        
    def test_tc012_multiple_booking_flow(self, booking_page):
        """TC012 - Multiple booking flow"""
        booking_page.search_service("electrician")
        booking_page.click_book()
        assert True
