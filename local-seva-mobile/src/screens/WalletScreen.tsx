import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

export default function WalletScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const handleAddFunds = async () => {
    setLoading(true);
    // In production, we fetch the PaymentIntent client secret from FastAPI backend
    // const response = await apiClient.post('/payments/create-intent', { amount: 5000 });
    // const { clientSecret } = response.data;
    
    // Simulating the intent initialization
    try {
      Alert.alert('Payment Flow', 'Stripe Payment Sheet would open here in production.');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-slate-50 pt-12 px-6">
      <Text className="text-3xl font-bold text-slate-800 mb-6">Wallet & Subscriptions</Text>
      
      <View className="bg-blue-600 p-6 rounded-2xl shadow-md mb-8">
        <Text className="text-blue-100 font-semibold mb-2">Available Balance</Text>
        <Text className="text-4xl font-bold text-white mb-6">$150.00</Text>
        <TouchableOpacity 
          className="bg-white/20 py-3 px-6 rounded-xl self-start"
          onPress={handleAddFunds}
          disabled={loading}
        >
          <Text className="text-white font-bold">{loading ? 'Loading...' : '+ Add Funds'}</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-xl font-bold text-slate-800 mb-4">Active Subscriptions</Text>
      <View className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="font-bold text-lg text-slate-800">LocalSeva Pro</Text>
          <View className="bg-green-100 px-3 py-1 rounded-full">
            <Text className="text-green-700 text-xs font-bold">ACTIVE</Text>
          </View>
        </View>
        <Text className="text-slate-500 mb-4">Free AC Servicing & 10% off all jobs.</Text>
        <Text className="text-slate-400 text-sm">Renews on Oct 15, 2026</Text>
      </View>
      
      <Text className="text-xl font-bold text-slate-800 mb-4">Available Coupons</Text>
      <View className="bg-white p-4 rounded-xl shadow-sm border border-dashed border-blue-300 mb-4 flex-row items-center justify-between">
        <View>
          <Text className="font-bold text-blue-600 text-lg">WELCOME50</Text>
          <Text className="text-slate-500 text-sm">Get 50% off your next booking</Text>
        </View>
        <TouchableOpacity className="bg-blue-50 px-4 py-2 rounded-lg">
          <Text className="text-blue-600 font-bold">Apply</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
