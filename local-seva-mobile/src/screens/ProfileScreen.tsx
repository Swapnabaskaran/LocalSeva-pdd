import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { apiClient } from '../api/apiClient';

export default function ProfileScreen() {
  const { user } = useAuthStore();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // In a real scenario, the token would be attached by the axios interceptor
      // and we would hit the FastAPI endpoint to fetch extended user data
      // const response = await apiClient.get('/users/me');
      // setProfileData(response.data);
      
      // Simulating a delay
      setTimeout(() => {
        setProfileData({
          role: 'customer',
          walletBalance: 150.0,
          loyaltyPoints: 300,
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-50">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-50 px-6 pt-12">
      <Text className="text-3xl font-bold text-slate-800 mb-6">Profile</Text>
      
      <View className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
        <Text className="text-sm font-semibold text-slate-400 mb-1">Account</Text>
        <Text className="text-lg font-bold text-slate-800 mb-4">{user?.email || user?.phoneNumber}</Text>
        
        <View className="h-px bg-slate-100 mb-4 w-full" />
        
        <Text className="text-sm font-semibold text-slate-400 mb-1">Role</Text>
        <Text className="text-base text-slate-700 capitalize mb-4">{profileData?.role}</Text>
        
        <Text className="text-sm font-semibold text-slate-400 mb-1">Wallet Balance</Text>
        <Text className="text-base text-green-600 font-bold">${profileData?.walletBalance}</Text>
      </View>
    </View>
  );
}
