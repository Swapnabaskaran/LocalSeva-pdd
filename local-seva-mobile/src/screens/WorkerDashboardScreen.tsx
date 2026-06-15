import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const JOB_OFFERS = [
  { id: '1', title: 'AC General Service', address: '123 Main St, SF', distance: '2.4 mi', price: '$45', time: 'Today, 2:00 PM' },
  { id: '2', title: 'Plumbing Repair', address: '456 Market St, SF', distance: '1.1 mi', price: '$80', time: 'Tomorrow, 10:00 AM' },
];

export default function WorkerDashboardScreen() {
  const navigation = useNavigation<any>();

  return (
    <ScrollView className="flex-1 bg-slate-50 pt-12 px-6">
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-slate-500 text-sm font-semibold">Status: Online</Text>
          <Text className="text-slate-800 text-2xl font-bold">Earnings: $450.00</Text>
        </View>
        <View className="h-10 w-10 bg-green-100 rounded-full items-center justify-center">
          <Text className="text-xl">👨‍🔧</Text>
        </View>
      </View>

      <Text className="text-xl font-bold text-slate-800 mb-4">New Job Offers</Text>
      <View className="mb-8">
        {JOB_OFFERS.map((job) => (
          <View key={job.id} className="bg-white p-4 rounded-xl shadow-sm mb-4 border border-slate-100">
            <View className="flex-row justify-between mb-2">
              <Text className="text-lg font-bold text-slate-800">{job.title}</Text>
              <Text className="text-blue-600 font-bold">{job.price}</Text>
            </View>
            <Text className="text-slate-600 mb-1">📍 {job.address} ({job.distance})</Text>
            <Text className="text-slate-500 mb-4">🕒 {job.time}</Text>
            
            <View className="flex-row space-x-3">
              <TouchableOpacity className="flex-1 bg-slate-100 py-3 rounded-lg border border-slate-200">
                <Text className="text-slate-600 text-center font-bold">Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="flex-1 bg-blue-600 py-3 rounded-lg shadow-sm"
                onPress={() => navigation.navigate('JobActive', { job })}
              >
                <Text className="text-white text-center font-bold">Accept Job</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      
      <TouchableOpacity 
        className="w-full bg-slate-800 p-4 rounded-xl shadow-md"
        onPress={() => navigation.navigate('KYCUpload')}
      >
        <Text className="text-white text-center font-bold text-lg">Update KYC Documents</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
