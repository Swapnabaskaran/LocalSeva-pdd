import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

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

      <Text className="text-xl font-bold text-slate-800 mb-4">Action Center</Text>
      
      <View className="flex-row flex-wrap justify-between mb-8">
        <TouchableOpacity 
          className="bg-white w-[48%] p-4 rounded-xl shadow-sm border border-slate-100 mb-4 items-center"
          onPress={() => navigation.navigate('WorkerEarnings')}
        >
          <View className="w-12 h-12 bg-emerald-50 rounded-full items-center justify-center mb-2">
            <Ionicons name="cash-outline" size={24} color="#10B981" />
          </View>
          <Text className="font-bold text-slate-700">Earnings</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-white w-[48%] p-4 rounded-xl shadow-sm border border-slate-100 mb-4 items-center"
          onPress={() => navigation.navigate('WorkerSchedule')}
        >
          <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center mb-2">
            <Ionicons name="calendar-outline" size={24} color="#2563EB" />
          </View>
          <Text className="font-bold text-slate-700">Schedule</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-white w-[48%] p-4 rounded-xl shadow-sm border border-slate-100 mb-4 items-center"
          onPress={() => navigation.navigate('WorkerCatalog')}
        >
          <View className="w-12 h-12 bg-purple-50 rounded-full items-center justify-center mb-2">
            <Ionicons name="list-outline" size={24} color="#8B5CF6" />
          </View>
          <Text className="font-bold text-slate-700">Catalog</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-white w-[48%] p-4 rounded-xl shadow-sm border border-slate-100 mb-4 items-center"
          onPress={() => navigation.navigate('WorkerReviews')}
        >
          <View className="w-12 h-12 bg-amber-50 rounded-full items-center justify-center mb-2">
            <Ionicons name="star-outline" size={24} color="#F59E0B" />
          </View>
          <Text className="font-bold text-slate-700">Reviews</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-white w-[48%] p-4 rounded-xl shadow-sm border border-slate-100 mb-4 items-center"
          onPress={() => navigation.navigate('WorkerTraining')}
        >
          <View className="w-12 h-12 bg-pink-50 rounded-full items-center justify-center mb-2">
            <Ionicons name="school-outline" size={24} color="#EC4899" />
          </View>
          <Text className="font-bold text-slate-700">Training</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-white w-[48%] p-4 rounded-xl shadow-sm border border-slate-100 mb-4 items-center"
          onPress={() => navigation.navigate('KYCUpload')}
        >
          <View className="w-12 h-12 bg-slate-100 rounded-full items-center justify-center mb-2">
            <Ionicons name="document-text-outline" size={24} color="#64748B" />
          </View>
          <Text className="font-bold text-slate-700">KYC Docs</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-xl font-bold text-slate-800 mb-4">New Job Offers</Text>
      <View className="mb-12">
        {JOB_OFFERS.map((job) => (
          <View key={job.id} className="bg-white p-4 rounded-xl shadow-sm mb-4 border border-slate-100">
            <View className="flex-row justify-between mb-2">
              <Text className="text-lg font-bold text-slate-800">{job.title}</Text>
              <Text className="text-blue-600 font-bold">{job.price}</Text>
            </View>
            <Text className="text-slate-600 mb-1">📍 {job.address} ({job.distance})</Text>
            <Text className="text-slate-500 mb-4">🕒 {job.time}</Text>
            
            <View className="flex-row space-x-3">
              <TouchableOpacity className="flex-1 bg-slate-100 py-3 rounded-lg border border-slate-200 mr-2">
                <Text className="text-slate-600 text-center font-bold">Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="flex-1 bg-blue-600 py-3 rounded-lg shadow-sm ml-2"
                onPress={() => navigation.navigate('JobActive', { job })}
              >
                <Text className="text-white text-center font-bold">Accept Job</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
