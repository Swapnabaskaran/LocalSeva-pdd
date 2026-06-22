import pandas as pd
import random
import os

# Define exact quotas for each module to total 360
MODULES = {
    "Authentication": {"count": 40, "scenarios": ["Registration", "Login", "OTP Verification", "Forgot Password", "Session Management", "Auto Login", "Logout", "Invalid Credentials", "Biometric Validation"]},
    "Dashboard": {"count": 40, "scenarios": ["Dashboard Load", "Quick Actions", "Statistics Widgets", "Recent Bookings", "Recommendations", "Refresh Actions", "Offline Dashboard State"]},
    "Service Discovery": {"count": 50, "scenarios": ["Search Services", "Search Suggestions", "Category Browsing", "Filters", "Sorting", "Service Details", "Reviews", "Similar Services", "Service Availability"]},
    "Booking Flow": {"count": 90, "scenarios": ["Service Customization", "Add-ons", "Slot Selection", "Address Selection", "Address Creation", "Address Editing", "Promo Application", "Wallet Usage", "Payment Selection", "Booking Confirmation", "Booking Cancellation", "Booking Reschedule", "Booking Tracking", "Booking History", "Invoice Viewing"]},
    "Wallet": {"count": 20, "scenarios": ["Wallet Balance", "Add Money", "Cashback", "Transaction History", "Wallet Payments"]},
    "Subscription": {"count": 20, "scenarios": ["Plan Purchase", "Upgrade", "Downgrade", "Renewal", "Cancellation"]},
    "Notification": {"count": 20, "scenarios": ["Push Notifications", "In-App Notifications", "Notification Redirection", "Read Status", "Delete Notification"]},
    "Review & Rating": {"count": 20, "scenarios": ["Submit Review", "Star Rating", "Photo Upload", "Helpful Votes", "Review Visibility"]},
    "Referral & Coupon": {"count": 20, "scenarios": ["Referral Sharing", "Referral Tracking", "Coupon Validation", "Coupon Redemption"]},
    "Video Consultation": {"count": 15, "scenarios": ["Consultation Booking", "Join Session", "Consultation Notes", "Follow-up Actions"]},
    "Profile Management": {"count": 25, "scenarios": ["Profile Update", "Password Change", "Profile Picture Upload", "Address Management", "Notification Settings", "Language Settings", "Account Deletion"]}
}

test_cases = []
tc_counter = 1

for module, info in MODULES.items():
    scenarios = info["scenarios"]
    count = info["count"]
    
    for i in range(count):
        tc_id = f"APP-{tc_counter:03d}"
        
        # Intentional Failures
        if tc_id == "APP-359":
            desc = "Invalid Booking Edge Case"
            status = "Fail"
        elif tc_id == "APP-360":
            desc = "Unsupported Profile Media Upload"
            status = "Fail"
        else:
            base_scenario = scenarios[i % len(scenarios)]
            desc = f"Validate {base_scenario} - Variation {i+1}"
            status = "Pass"
            
        exec_time = f"{random.randint(5, 45)}s"
        expected = f"{base_scenario} works as expected" if status == "Pass" else "Expected strict validation failure"
        
        test_cases.append({
            "Test Case ID": tc_id,
            "Module": module,
            "Description": desc,
            "Expected Result": expected,
            "Intended Status": status,
            "Execution Time": exec_time
        })
        tc_counter += 1

df = pd.DataFrame(test_cases)
output_path = os.path.join(os.path.dirname(__file__), "src", "test", "resources", "testdata.xlsx")
os.makedirs(os.path.dirname(output_path), exist_ok=True)
df.to_excel(output_path, index=False)

print(f"Generated {len(test_cases)} unique test cases successfully into {output_path}.")
