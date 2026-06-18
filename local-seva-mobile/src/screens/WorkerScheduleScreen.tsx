import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function WorkerScheduleScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-row items-center justify-between p-4 border-b border-slate-200 bg-white shadow-sm z-10">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#1E293B" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-slate-800">My Schedule</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="add-circle" size={28} color="#2563EB" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Calendar Strip Placeholder */}
        <View className="flex-row justify-between items-center mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <View key={i} className={`items-center justify-center w-10 h-14 rounded-full ${i === 2 ? 'bg-blue-600 shadow-md' : ''}`}>
              <Text className={`text-xs ${i === 2 ? 'text-blue-100' : 'text-slate-400'}`}>{day}</Text>
              <Text className={`font-bold mt-1 ${i === 2 ? 'text-white' : 'text-slate-800'}`}>{10 + i}</Text>
            </View>
          ))}
        </View>

        <Text className="text-slate-800 text-lg font-bold mb-4">Wednesday, Oct 12</Text>

        {/* Schedule Items */}
        <View className="relative">
          {/* Timeline Line */}
          <View className="absolute left-[39px] top-0 bottom-0 w-px bg-slate-200" />
          
          {[
            { time: '09:00 AM', title: 'Plumbing Repair', address: '123 Main St, Apt 4B', color: 'bg-blue-500', bg: 'bg-blue-50' },
            { time: '11:30 AM', title: 'Pipe Installation', address: '450 West Ave', color: 'bg-purple-500', bg: 'bg-purple-50' },
            { time: '02:00 PM', title: 'Blocked Drain', address: '88 North Road', color: 'bg-amber-500', bg: 'bg-amber-50' }
          ].map((item, index) => (
            <View key={index} className="flex-row mb-6">
              <View className="w-20 items-end pr-4 py-2">
                <Text className="text-xs font-bold text-slate-500">{item.time}</Text>
              </View>
              <View className="relative flex-1">
                <View className={`absolute -left-2 top-3 w-4 h-4 rounded-full ${item.color} border-4 border-white z-10`} />
                <View className={`${item.bg} p-4 rounded-2xl ml-4`}>
                  <Text className="font-bold text-slate-800 mb-1">{item.title}</Text>
                  <View className="flex-row items-center">
                    <Ionicons name="location" size={12} color="#64748B" />
                    <Text className="text-xs text-slate-500 ml-1">{item.address}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
