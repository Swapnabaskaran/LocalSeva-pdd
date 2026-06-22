import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

export const PerformanceMetricsScreen: React.FC<any> = ({ navigation }) => {
  const metrics = {
    rating: 4.8,
    jobsCompleted: 142,
    cancellationRate: '2.1%',
    badge: 'Gold Tier',
    pointsToNext: 150
  };

  const reviews = [
    { id: 1, name: 'Rahul M.', rating: 5, comment: 'Excellent and punctual service! Will hire again.', date: '2 days ago' },
    { id: 2, name: 'Priya K.', rating: 4, comment: 'Good work, but arrived 10 mins late.', date: '1 week ago' },
    { id: 3, name: 'Anil D.', rating: 5, comment: 'Very professional. Fixed the AC in no time.', date: '2 weeks ago' },
  ];

  return (
    <ScrollView className="flex-1 bg-slate-50 p-5">
      <View className="mb-6">
        <Text className="text-2xl font-black text-slate-800">Performance Metrics</Text>
        <Text className="text-slate-500 text-sm mt-1">Track your progress and satisfaction</Text>
      </View>
      
      <View className="bg-orange-500 rounded-3xl p-5 mb-6 shadow-lg shadow-orange-500/30 flex-row items-center">
        <View className="flex-1">
          <Text className="text-xs uppercase tracking-wider font-bold text-white opacity-80">Current Status</Text>
          <Text className="text-2xl font-black text-white mt-1">{metrics.badge}</Text>
          <Text className="text-xs mt-1 text-orange-100">{metrics.pointsToNext} pts to Platinum</Text>
        </View>
      </View>

      <View className="flex-row justify-between mb-6">
        <View className="bg-white border border-slate-200 p-4 rounded-2xl flex-1 mr-2 shadow-sm">
          <Text className="text-xs font-bold text-slate-500">Overall Rating</Text>
          <Text className="text-xl font-black text-slate-800 mt-1">{metrics.rating} <Text className="text-xs text-slate-400">/ 5.0</Text></Text>
        </View>
        <View className="bg-white border border-slate-200 p-4 rounded-2xl flex-1 ml-2 shadow-sm">
          <Text className="text-xs font-bold text-slate-500">Jobs Done</Text>
          <Text className="text-xl font-black text-slate-800 mt-1">{metrics.jobsCompleted}</Text>
        </View>
      </View>

      <Text className="text-lg font-black text-slate-800 mb-4">Recent Feedback</Text>
      <View className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden mb-8">
        {reviews.map((review, index) => (
          <View key={review.id} className={`p-5 ${index !== reviews.length - 1 ? 'border-b border-slate-100' : ''}`}>
            <View className="flex-row justify-between items-start mb-2">
              <Text className="font-bold text-slate-800">{review.name}</Text>
              <Text className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{review.date}</Text>
            </View>
            <View className="flex-row items-center mb-2">
              <Text className="text-amber-500 text-xs font-bold mr-1">★ {review.rating}</Text>
            </View>
            <Text className="text-slate-600 text-sm">{review.comment}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity 
        className="bg-slate-200 py-4 rounded-xl mb-12"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-center text-slate-700 font-bold">Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default PerformanceMetricsScreen;
