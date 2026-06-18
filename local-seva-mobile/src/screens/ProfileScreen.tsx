import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { apiClient } from '../api/apiClient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const { user } = useAuthStore();
  const navigation = useNavigation<any>();
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
    <ScrollView className="flex-1 bg-slate-50 px-4 pt-12">
      <Text className="text-3xl font-bold text-slate-800 mb-6 px-2">Profile</Text>
      
      {/* Account Info Card */}
      <View className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-6">
        <View className="flex-row items-center mb-4">
          <View className="w-14 h-14 bg-blue-100 rounded-full items-center justify-center mr-4">
            <Ionicons name="person" size={28} color="#2563EB" />
          </View>
          <View>
            <Text className="text-lg font-bold text-slate-800">{user?.email || user?.phoneNumber}</Text>
            <Text className="text-sm font-medium text-slate-400 capitalize">{profileData?.role}</Text>
          </View>
        </View>
        
        <View className="flex-row justify-between pt-4 border-t border-slate-100">
          <View>
            <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Wallet</Text>
            <Text className="text-base text-green-600 font-bold">${profileData?.walletBalance}</Text>
          </View>
          <View>
            <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Points</Text>
            <Text className="text-base text-blue-600 font-bold">{profileData?.loyaltyPoints}</Text>
          </View>
        </View>
      </View>

      {/* Menu Options */}
      <Text className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Preferences</Text>
      
      <View className="bg-white rounded-2xl shadow-sm border border-slate-100 mb-6">
        <TouchableOpacity 
          className="flex-row items-center justify-between p-4 border-b border-slate-50"
          onPress={() => navigation.navigate('Settings')}
        >
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-slate-100 items-center justify-center mr-3">
              <Ionicons name="settings-outline" size={18} color="#475569" />
            </View>
            <Text className="text-base font-medium text-slate-700">Settings</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
        </TouchableOpacity>

        <TouchableOpacity 
          className="flex-row items-center justify-between p-4 border-b border-slate-50"
          onPress={() => navigation.navigate('Notifications')}
        >
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center mr-3">
              <Ionicons name="notifications-outline" size={18} color="#2563EB" />
            </View>
            <Text className="text-base font-medium text-slate-700">Notifications</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
        </TouchableOpacity>

        <TouchableOpacity 
          className="flex-row items-center justify-between p-4 border-b border-slate-50"
          onPress={() => navigation.navigate('PaymentMethods')}
        >
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-emerald-50 items-center justify-center mr-3">
              <Ionicons name="card-outline" size={18} color="#10B981" />
            </View>
            <Text className="text-base font-medium text-slate-700">Payment Methods</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
        </TouchableOpacity>

        <TouchableOpacity 
          className="flex-row items-center justify-between p-4"
          onPress={() => navigation.navigate('ReviewsRatings')}
        >
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-amber-50 items-center justify-center mr-3">
              <Ionicons name="star-outline" size={18} color="#F59E0B" />
            </View>
            <Text className="text-base font-medium text-slate-700">My Reviews</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
        </TouchableOpacity>
      </View>

      <Text className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Support</Text>

      <View className="bg-white rounded-2xl shadow-sm border border-slate-100 mb-8">
        <TouchableOpacity 
          className="flex-row items-center justify-between p-4 border-b border-slate-50"
          onPress={() => navigation.navigate('HelpSupport')}
        >
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-purple-50 items-center justify-center mr-3">
              <Ionicons name="help-circle-outline" size={18} color="#8B5CF6" />
            </View>
            <Text className="text-base font-medium text-slate-700">Help & Support</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
        </TouchableOpacity>

        <TouchableOpacity 
          className="flex-row items-center justify-between p-4"
          onPress={() => navigation.navigate('Chat')}
        >
          <View className="flex-row items-center">
            <View className="w-8 h-8 rounded-full bg-pink-50 items-center justify-center mr-3">
              <Ionicons name="chatbubble-ellipses-outline" size={18} color="#EC4899" />
            </View>
            <Text className="text-base font-medium text-slate-700">Messages</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
