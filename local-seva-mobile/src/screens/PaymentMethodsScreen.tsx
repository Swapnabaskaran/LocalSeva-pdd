import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function PaymentMethodsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-row items-center p-4 border-b border-slate-200 bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-800">Payment Methods</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        <Text className="text-slate-500 mb-4 ml-1 uppercase text-xs font-bold tracking-wider">Saved Cards</Text>
        
        {/* Card 1 */}
        <View className="bg-slate-800 rounded-2xl p-5 mb-4 shadow-md">
          <View className="flex-row justify-between items-center mb-6">
            <Ionicons name="card" size={32} color="#FFFFFF" />
            <Text className="text-white font-bold text-lg">VISA</Text>
          </View>
          <Text className="text-slate-300 tracking-widest text-lg mb-2">**** **** **** 4242</Text>
          <View className="flex-row justify-between">
            <Text className="text-slate-400">Exp: 12/28</Text>
            <Text className="text-white font-medium">Default</Text>
          </View>
        </View>

        <Text className="text-slate-500 mt-4 mb-4 ml-1 uppercase text-xs font-bold tracking-wider">Other Methods</Text>
        
        <View className="bg-white rounded-xl shadow-sm mb-6">
          <TouchableOpacity className="p-4 border-b border-slate-100 flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Ionicons name="logo-paypal" size={24} color="#00457C" className="mr-3" />
              <Text className="text-slate-700 font-medium ml-2">PayPal</Text>
            </View>
            <Text className="text-blue-600 font-medium">Link</Text>
          </TouchableOpacity>
          <TouchableOpacity className="p-4 flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Ionicons name="phone-portrait-outline" size={24} color="#10B981" className="mr-3" />
              <Text className="text-slate-700 font-medium ml-2">UPI / Wallet</Text>
            </View>
            <Text className="text-blue-600 font-medium">Link</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex-row justify-center items-center mt-2">
          <Ionicons name="add" size={24} color="#2563EB" />
          <Text className="text-blue-600 font-bold ml-2">Add New Payment Method</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
