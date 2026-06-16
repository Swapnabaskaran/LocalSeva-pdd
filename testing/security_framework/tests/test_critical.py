import pytest

@pytest.mark.critical
class TestCriticalSecurity:
    def test_vs037(self):
        """VS037 - Missing Content Security Policy Header"""
        assert False, "Application does not implement Content-Security-Policy header on selected pages."
