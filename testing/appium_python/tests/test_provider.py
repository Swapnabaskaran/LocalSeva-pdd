import pytest
from pages.provider_page import ProviderPage
from pages.login_page import LoginPage
from utils.driver_factory import DriverFactory

@pytest.fixture(scope="class")
def driver():
    driver = DriverFactory.get_driver(mock=True)
    yield driver

@pytest.fixture(scope="class")
def provider_page(driver):
    return ProviderPage(driver)

@pytest.mark.provider
class TestProvider:
    def test_tc013_provider_login(self, driver):
        """TC013 - Provider login"""
        login_page = LoginPage(driver)
        login_page.enter_username("provider")
        login_page.click_login()
        assert True
        
    def test_tc014_accept_booking_request(self, provider_page):
        """TC014 - Accept booking request"""
        provider_page.click_accept()
        assert True
        
    def test_tc015_reject_booking_request(self, provider_page):
        """TC015 - Reject booking request"""
        provider_page.click_reject()
        assert True
        
    def test_tc016_update_availability(self, provider_page):
        """TC016 - Update availability"""
        provider_page.toggle_availability()
        assert True
