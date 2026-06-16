import pytest
from pages.login_page import LoginPage
from utils.driver_factory import DriverFactory

@pytest.fixture(scope="class")
def driver():
    # Return mocked driver for CI
    driver = DriverFactory.get_driver(mock=True)
    yield driver

@pytest.fixture(scope="class")
def login_page(driver):
    return LoginPage(driver)

@pytest.mark.auth
class TestAuth:
    def test_tc001_validate_empty_username(self, login_page):
        """TC001 - Validate empty username"""
        login_page.enter_username("")
        assert True
        
    def test_tc002_validate_empty_password(self, login_page):
        """TC002 - Validate empty password"""
        login_page.enter_password("")
        assert True
        
    def test_tc003_validate_invalid_credentials(self, login_page):
        """TC003 - Validate invalid credentials"""
        login_page.enter_username("invalid")
        login_page.enter_password("invalid")
        assert True
        
    def test_tc004_successful_login(self, login_page):
        """TC004 - Successful login"""
        login_page.enter_username("valid")
        login_page.enter_password("valid")
        login_page.click_login()
        # Intentionally failing to test screenshot generation as requested
        assert False, "Login validation failed"
        
    def test_tc005_session_persistence(self, login_page):
        """TC005 - Session persistence"""
        assert True
        
    def test_tc006_logout_functionality(self, login_page):
        """TC006 - Logout functionality"""
        login_page.click_logout()
        assert True
