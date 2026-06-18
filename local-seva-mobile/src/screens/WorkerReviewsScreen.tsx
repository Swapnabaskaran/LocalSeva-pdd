import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function WorkerReviewsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-row items-center p-4 border-b border-slate-200 bg-white shadow-sm z-10">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-800">Customer Feedback</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Rating Summary */}
        <View className="bg-amber-500 rounded-3xl p-6 mb-6 shadow-md shadow-amber-500/30 flex-row items-center justify-between">
          <View>
            <Text className="text-amber-100 font-medium mb-1">Average Rating</Text>
            <View className="flex-row items-end">
              <Text className="text-white text-5xl font-black">4.8</Text>
              <Text className="text-amber-100 text-xl font-bold mb-1 ml-1">/ 5</Text>
            </View>
          </View>
          <View className="items-center">
            <Ionicons name="star" size={48} color="#FFFFFF" />
            <Text className="text-amber-100 font-bold mt-1">124 Reviews</Text>
          </View>
        </View>

        {/* Review List */}
        {[
          { name: 'Alice M.', rating: 5, date: '2 days ago', comment: 'Very professional, arrived exactly on time and fixed my sink in under an hour.' },
          { name: 'Bob T.', rating: 4, date: '1 week ago', comment: 'Good job, but a bit pricey.' },
          { name: 'Carol K.', rating: 5, date: '2 weeks ago', comment: 'Lifesaver! Fixed a burst pipe at 2am.' }
        ].map((item, index) => (
          <View key={index} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="font-bold text-slate-800 text-base">{item.name}</Text>
              <View className="flex-row bg-amber-50 px-2 py-1 rounded-full border border-amber-100">
                <Ionicons name="star" size={14} color="#F59E0B" />
                <Text className="text-amber-700 font-bold text-xs ml-1">{item.rating}</Text>
              </View>
            </View>
            <Text className="text-slate-600 italic text-sm leading-5 mb-2">"{item.comment}"</Text>
            <Text className="text-xs text-slate-400 text-right">{item.date}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
