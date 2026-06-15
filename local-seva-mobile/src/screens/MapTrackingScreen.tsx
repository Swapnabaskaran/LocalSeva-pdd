import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

export default function MapTrackingScreen() {
  const navigation = useNavigation<any>();

  // Mock locations
  const customerLocation = { latitude: 37.7749, longitude: -122.4194 };
  const workerLocation = { latitude: 37.7849, longitude: -122.4094 };

  return (
    <View className="flex-1">
      <MapView 
        className="flex-1"
        initialRegion={{
          latitude: 37.7799,
          longitude: -122.4144,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={customerLocation} title="Your Location" description="Service Address" pinColor="blue" />
        <Marker coordinate={workerLocation} title="Professional" description="Arriving in 15 mins" pinColor="red" />
      </MapView>

      <View className="absolute bottom-0 w-full bg-white p-6 rounded-t-3xl shadow-lg border-t border-slate-100">
        <Text className="text-xl font-bold text-slate-800 mb-2">Tracking your Service</Text>
        <Text className="text-slate-600 mb-6">Your professional is on the way and will arrive in approx 15 minutes.</Text>
        
        <View className="flex-row items-center justify-between mb-8">
          <View className="flex-row items-center space-x-4">
            <View className="h-12 w-12 bg-blue-100 rounded-full items-center justify-center">
              <Text className="text-xl">👨‍🔧</Text>
            </View>
            <View>
              <Text className="font-bold text-slate-800">John Doe</Text>
              <Text className="text-slate-500 text-sm">Expert Plumber</Text>
            </View>
          </View>
          <View className="bg-green-100 px-3 py-1 rounded-lg">
            <Text className="text-green-700 font-bold">4.9 ★</Text>
          </View>
        </View>

        <TouchableOpacity 
          className="w-full bg-blue-600 p-4 rounded-xl shadow-md"
          onPress={() => navigation.navigate('MainTabs')} // Go back to Home
        >
          <Text className="text-white text-center font-bold text-lg">Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
