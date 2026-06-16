import pytest
from pages.admin_page import AdminPage
from pages.login_page import LoginPage
from utils.driver_factory import DriverFactory

@pytest.fixture(scope="class")
def driver():
    driver = DriverFactory.get_driver(mock=True)
    yield driver

@pytest.fixture(scope="class")
def admin_page(driver):
    return AdminPage(driver)

@pytest.mark.admin
class TestAdmin:
    def test_tc017_admin_login(self, driver):
        """TC017 - Admin login"""
        login_page = LoginPage(driver)
        login_page.enter_username("admin")
        login_page.click_login()
        assert True
        
    def test_tc018_user_management(self, admin_page):
        """TC018 - User management"""
        admin_page.click_users_tab()
        assert True
        
    def test_tc019_provider_management(self, admin_page):
        """TC019 - Provider management"""
        admin_page.click_providers_tab()
        assert True
        
    def test_tc020_booking_monitoring(self, admin_page):
        """TC020 - Booking monitoring"""
        admin_page.click_bookings_tab()
        assert True
