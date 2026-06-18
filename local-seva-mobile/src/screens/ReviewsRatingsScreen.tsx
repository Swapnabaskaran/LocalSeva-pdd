import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const REVIEWS = [
  { id: 1, provider: 'John Doe (Plumber)', rating: 5, date: 'Oct 12, 2023', comment: 'Excellent service! Arrived on time and fixed the leak quickly.' },
  { id: 2, provider: 'Sarah Smith (Cleaner)', rating: 4, date: 'Sep 28, 2023', comment: 'Very thorough cleaning, but was 10 minutes late.' },
  { id: 3, provider: 'Mike Johnson (Electrician)', rating: 5, date: 'Aug 15, 2023', comment: 'Professional and courteous. Highly recommended.' },
];

export default function ReviewsRatingsScreen() {
  const navigation = useNavigation();

  const renderStars = (rating: number) => {
    return (
      <View className="flex-row">
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons 
            key={star} 
            name={star <= rating ? "star" : "star-outline"} 
            size={16} 
            color={star <= rating ? "#F59E0B" : "#CBD5E1"} 
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-row items-center p-4 border-b border-slate-200 bg-white shadow-sm z-10">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-800">My Reviews</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {REVIEWS.map((review) => (
          <View key={review.id} className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-slate-100">
            <View className="flex-row justify-between items-start mb-2">
              <View>
                <Text className="font-bold text-slate-800 text-base">{review.provider}</Text>
                <Text className="text-xs text-slate-400 mt-1">{review.date}</Text>
              </View>
              {renderStars(review.rating)}
            </View>
            <Text className="text-slate-600 mt-2 leading-5 italic">"{review.comment}"</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
