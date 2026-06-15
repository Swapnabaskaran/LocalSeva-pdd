import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CATEGORIES = [
  { id: '1', title: 'Home Cleaning', icon: '🧹' },
  { id: '2', title: 'AC Service', icon: '❄️' },
  { id: '3', title: 'Plumbing', icon: '🔧' },
  { id: '4', title: 'Electrical', icon: '⚡' },
];

const RECOMMENDED = [
  { id: '101', title: 'Deep Home Cleaning', price: '$49', rating: '4.8', jobs: '2k+' },
  { id: '102', title: 'AC General Service', price: '$29', rating: '4.9', jobs: '5k+' },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <ScrollView className="flex-1 bg-slate-50 pt-12 px-6">
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-slate-500 text-sm font-semibold">Location</Text>
          <Text className="text-slate-800 text-lg font-bold">San Francisco, CA</Text>
        </View>
        <View className="h-10 w-10 bg-blue-100 rounded-full items-center justify-center">
          <Text className="text-xl">👤</Text>
        </View>
      </View>

      <View className="mb-6">
        <TextInput 
          className="w-full bg-white p-4 rounded-xl shadow-sm border border-slate-100"
          placeholder="Search for a service... e.g., Plumber"
        />
      </View>

      <Text className="text-xl font-bold text-slate-800 mb-4">Categories</Text>
      <View className="flex-row flex-wrap justify-between mb-8">
        {CATEGORIES.map((cat) => (
          <TouchableOpacity 
            key={cat.id} 
            className="w-[48%] bg-white p-4 rounded-xl shadow-sm mb-4 items-center border border-slate-50"
          >
            <Text className="text-3xl mb-2">{cat.icon}</Text>
            <Text className="text-sm font-bold text-slate-700 text-center">{cat.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text className="text-xl font-bold text-slate-800 mb-4">AI Recommended</Text>
      <View className="mb-10">
        {RECOMMENDED.map((service) => (
          <TouchableOpacity 
            key={service.id}
            className="flex-row bg-white p-4 rounded-xl shadow-sm mb-4 border border-slate-50 items-center justify-between"
            onPress={() => navigation.navigate('ServiceDetail', { service })}
          >
            <View>
              <Text className="text-lg font-bold text-slate-800 mb-1">{service.title}</Text>
              <View className="flex-row items-center space-x-2">
                <Text className="text-yellow-500 font-bold text-sm">★ {service.rating}</Text>
                <Text className="text-slate-400 text-xs">({service.jobs} jobs)</Text>
              </View>
            </View>
            <View className="bg-blue-50 px-3 py-1 rounded-lg">
              <Text className="text-blue-600 font-bold">{service.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
