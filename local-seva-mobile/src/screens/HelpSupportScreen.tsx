import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HelpSupportScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-row items-center p-4 border-b border-slate-200 bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-800">Help & Support</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Search Bar Placeholder */}
        <View className="bg-white rounded-xl p-3 flex-row items-center mb-6 shadow-sm border border-slate-100">
          <Ionicons name="search" size={20} color="#94A3B8" />
          <Text className="text-slate-400 ml-2">Search for help...</Text>
        </View>

        <Text className="text-lg font-bold text-slate-800 mb-4">Frequently Asked Questions</Text>
        
        <View className="bg-white rounded-xl shadow-sm mb-6">
          {['How do I cancel a booking?', 'How is pricing calculated?', 'Is my payment secure?', 'How do I become a provider?'].map((q, i) => (
            <TouchableOpacity key={i} className="p-4 border-b border-slate-100 flex-row justify-between items-center">
              <Text className="text-slate-700 font-medium">{q}</Text>
              <Ionicons name="chevron-down" size={20} color="#94A3B8" />
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-lg font-bold text-slate-800 mb-4">Contact Us</Text>
        
        <View className="flex-row justify-between">
          <TouchableOpacity className="flex-1 bg-white rounded-xl p-4 shadow-sm border border-slate-100 items-center mr-2">
            <View className="w-12 h-12 rounded-full bg-blue-50 items-center justify-center mb-2">
              <Ionicons name="chatbubbles-outline" size={24} color="#2563EB" />
            </View>
            <Text className="font-bold text-slate-800">Live Chat</Text>
            <Text className="text-xs text-slate-500 mt-1">24/7 Available</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-1 bg-white rounded-xl p-4 shadow-sm border border-slate-100 items-center ml-2">
            <View className="w-12 h-12 rounded-full bg-emerald-50 items-center justify-center mb-2">
              <Ionicons name="call-outline" size={24} color="#10B981" />
            </View>
            <Text className="font-bold text-slate-800">Call Us</Text>
            <Text className="text-xs text-slate-500 mt-1">Mon-Fri, 9am-6pm</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
