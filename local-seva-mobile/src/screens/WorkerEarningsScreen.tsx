import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function WorkerEarningsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-row items-center p-4 border-b border-slate-200 bg-white shadow-sm z-10">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-800">My Earnings</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Total Balance Card */}
        <View className="bg-emerald-600 rounded-3xl p-6 mb-6 shadow-md shadow-emerald-500/30 items-center">
          <Text className="text-emerald-100 font-medium mb-1">Available for Payout</Text>
          <Text className="text-white text-5xl font-black mb-4">$1,240.50</Text>
          <TouchableOpacity className="bg-white px-8 py-3 rounded-full shadow-sm">
            <Text className="text-emerald-700 font-bold">Withdraw Funds</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View className="flex-row justify-between mb-8">
          <View className="bg-white flex-1 mr-2 p-4 rounded-2xl shadow-sm border border-slate-100 items-center">
            <Text className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">This Week</Text>
            <Text className="text-slate-800 text-xl font-black">$450.00</Text>
          </View>
          <View className="bg-white flex-1 ml-2 p-4 rounded-2xl shadow-sm border border-slate-100 items-center">
            <Text className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Jobs</Text>
            <Text className="text-slate-800 text-xl font-black">24</Text>
          </View>
        </View>

        <Text className="text-slate-800 text-lg font-bold mb-4">Recent Transactions</Text>
        
        {/* Transaction List */}
        <View className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2">
          {[1, 2, 3, 4].map((item, index) => (
            <View key={index} className={`flex-row items-center justify-between p-3 ${index !== 3 ? 'border-b border-slate-50' : ''}`}>
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-emerald-50 items-center justify-center mr-3">
                  <Ionicons name="arrow-down" size={16} color="#10B981" />
                </View>
                <View>
                  <Text className="font-bold text-slate-800">AC Repair Service</Text>
                  <Text className="text-xs text-slate-400">Oct 12 • ID: #902{item}</Text>
                </View>
              </View>
              <Text className="font-bold text-emerald-600">+$85.00</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
