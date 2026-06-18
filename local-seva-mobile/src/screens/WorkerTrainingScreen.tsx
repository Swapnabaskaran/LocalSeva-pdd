import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function WorkerTrainingScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-row items-center p-4 border-b border-slate-200 bg-white shadow-sm z-10">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-800">Training Center</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        <View className="bg-blue-600 rounded-2xl p-5 mb-6 shadow-md shadow-blue-500/30">
          <Text className="text-white text-lg font-bold mb-1">Safety First</Text>
          <Text className="text-blue-100 mb-4">Complete the new safety guidelines module to unlock premium jobs.</Text>
          <TouchableOpacity className="bg-white py-2 rounded-xl items-center">
            <Text className="text-blue-600 font-bold">Start Module</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-slate-800 text-lg font-bold mb-4">Video Tutorials</Text>

        {[
          { title: 'Customer Interaction Guidelines', duration: '5:20', icon: 'people' },
          { title: 'Using the Payment System', duration: '3:45', icon: 'card' },
          { title: 'Handling Disputes', duration: '8:10', icon: 'warning' }
        ].map((item, index) => (
          <TouchableOpacity key={index} className="flex-row items-center bg-white rounded-2xl p-3 shadow-sm border border-slate-100 mb-3">
            <View className="w-16 h-16 bg-slate-100 rounded-xl items-center justify-center mr-3 relative">
              <Ionicons name={item.icon as any} size={24} color="#64748B" />
              <View className="absolute inset-0 bg-black/10 rounded-xl items-center justify-center">
                <Ionicons name="play-circle" size={32} color="#FFFFFF" />
              </View>
            </View>
            <View className="flex-1">
              <Text className="font-bold text-slate-800 mb-1 leading-5">{item.title}</Text>
              <Text className="text-xs text-slate-500">Video • {item.duration}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
