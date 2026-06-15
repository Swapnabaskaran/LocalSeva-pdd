import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StripeProvider } from '@stripe/stripe-react-native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <StripeProvider
        publishableKey="pk_test_placeholder_key" // Replace with EXPO_PUBLIC_STRIPE_KEY
        merchantIdentifier="merchant.com.localseva"
      >
        <AppNavigator />
        <StatusBar style="auto" />
      </StripeProvider>
    </SafeAreaProvider>
  );
}
