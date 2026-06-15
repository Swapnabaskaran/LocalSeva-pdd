import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ServiceDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const service = route.params?.service;

  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View className="h-64 bg-blue-600 justify-end p-6">
        <TouchableOpacity 
          className="absolute top-12 left-6 bg-white/20 p-2 rounded-full"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white font-bold">← Back</Text>
        </TouchableOpacity>
        <Text className="text-3xl font-bold text-white mb-2">{service?.title || 'Service Details'}</Text>
        <Text className="text-blue-100 text-lg font-semibold">{service?.price || 'Starting at $0'}</Text>
      </View>

      <View className="p-6 bg-white -mt-4 rounded-t-3xl min-h-screen">
        <Text className="text-xl font-bold text-slate-800 mb-4">Description</Text>
        <Text className="text-slate-600 leading-relaxed mb-8">
          Professional {service?.title?.toLowerCase() || 'service'} delivered by vetted experts. 
          Includes advanced diagnosis, standard materials, and a 30-day service warranty.
        </Text>

        <Text className="text-xl font-bold text-slate-800 mb-4">What's included?</Text>
        <View className="space-y-3 mb-8">
          <Text className="text-slate-600">✓ 30 Day Warranty</Text>
          <Text className="text-slate-600">✓ Background-checked Professionals</Text>
          <Text className="text-slate-600">✓ Quality Standard Materials</Text>
        </View>

        <TouchableOpacity 
          className="w-full bg-blue-600 p-4 rounded-xl shadow-md mt-10"
          onPress={() => navigation.navigate('MapTracking', { serviceId: service?.id })}
        >
          <Text className="text-white text-center font-bold text-lg">Book Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
