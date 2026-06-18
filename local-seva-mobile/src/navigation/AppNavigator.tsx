import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { useAuthStore } from '../store/useAuthStore';

// Customer Screens
import HomeScreen from '../screens/HomeScreen';
import WalletScreen from '../screens/WalletScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ServiceDetailScreen from '../screens/ServiceDetailScreen';
import MapTrackingScreen from '../screens/MapTrackingScreen';

// Worker Screens
import WorkerDashboardScreen from '../screens/WorkerDashboardScreen';
import KYCUploadScreen from '../screens/KYCUploadScreen';
import JobActiveScreen from '../screens/JobActiveScreen';

// Auth Screen
import LoginScreen from '../screens/LoginScreen';

// Common/Shared New Screens
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import HelpSupportScreen from '../screens/HelpSupportScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';
import ReviewsRatingsScreen from '../screens/ReviewsRatingsScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CustomerTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#2563EB' }}>
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Browse' }} />
      <Tab.Screen name="WalletTab" component={WalletScreen} options={{ title: 'Wallet' }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}

function WorkerTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#10B981' }}>
      <Tab.Screen name="WorkerDashboard" component={WorkerDashboardScreen} options={{ title: 'Jobs' }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated, isInitializing, role, setUser, setToken, setInitializing, setRole } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const token = await user.getIdToken();
        setToken(token);
        // Simulate fetching role from backend
        // In production: const { role } = await apiClient.get('/users/me');
        // Setting to 'worker' for testing Phase 4 UI
        setRole('worker'); 
      } else {
        setToken(null);
        setRole(null);
      }
      if (isInitializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (isInitializing) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-50">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : role === 'worker' ? (
          <>
            <Stack.Screen name="WorkerTabs" component={WorkerTabs} />
            <Stack.Screen name="KYCUpload" component={KYCUploadScreen} />
            <Stack.Screen name="JobActive" component={JobActiveScreen} />
            {/* Common Authenticated Screens */}
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
            <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
            <Stack.Screen name="ReviewsRatings" component={ReviewsRatingsScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="CustomerTabs" component={CustomerTabs} />
            <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
            <Stack.Screen name="MapTracking" component={MapTrackingScreen} />
            {/* Common Authenticated Screens */}
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
            <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
            <Stack.Screen name="ReviewsRatings" component={ReviewsRatingsScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
