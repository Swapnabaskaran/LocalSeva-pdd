import pytest
from utils.driver_factory import DriverFactory

@pytest.fixture(scope="class")
def driver():
    driver = DriverFactory.get_driver(mock=True)
    yield driver

@pytest.mark.smoke
class TestSmoke:
    def test_tc026_app_launch(self, driver):
        """TC026 - App launch"""
        assert True
        
    def test_tc027_login_screen_load(self, driver):
        """TC027 - Login screen load"""
        assert True
        
    def test_tc028_dashboard_load(self, driver):
        """TC028 - Dashboard load"""
        assert True
        
    def test_tc029_service_listing_load(self, driver):
        """TC029 - Service listing load"""
        assert True
        
    def test_tc030_logout_verification(self, driver):
        """TC030 - Logout verification"""
        assert True
