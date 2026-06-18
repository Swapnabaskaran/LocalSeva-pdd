import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NOTIFICATIONS = [
  { id: 1, title: 'Booking Confirmed!', desc: 'Your plumber has accepted the request.', time: '10 mins ago', read: false },
  { id: 2, title: 'Service Completed', desc: 'Please rate your recent electrical service.', time: '2 hours ago', read: false },
  { id: 3, title: 'Promo Offer', desc: 'Get 20% off your next cleaning booking.', time: '1 day ago', read: true },
];

export default function NotificationsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-row items-center p-4 border-b border-slate-200 bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-800">Notifications</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {NOTIFICATIONS.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            className={`mb-3 p-4 rounded-xl flex-row items-center ${item.read ? 'bg-white border border-slate-100' : 'bg-blue-50 border border-blue-100'}`}
          >
            <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${item.read ? 'bg-slate-100' : 'bg-blue-100'}`}>
              <Ionicons name="notifications-outline" size={24} color={item.read ? '#64748B' : '#2563EB'} />
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between items-center mb-1">
                <Text className={`font-bold ${item.read ? 'text-slate-700' : 'text-blue-900'}`}>{item.title}</Text>
                <Text className="text-xs text-slate-500">{item.time}</Text>
              </View>
              <Text className="text-slate-600 text-sm leading-5">{item.desc}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
