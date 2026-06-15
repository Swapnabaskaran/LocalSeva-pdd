import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default function JobActiveScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const job = route.params?.job;
  
  const [status, setStatus] = useState<'accepted' | 'en_route' | 'in_progress' | 'completed'>('accepted');

  const updateStatus = async (newStatus: any) => {
    if (newStatus === 'en_route') {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      // Start background location tracking to Firebase Realtime / Firestore
    }
    
    if (newStatus === 'in_progress' || newStatus === 'completed') {
      // Prompt for Before/After photos
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (result.canceled) return; // Must take photo to proceed
      // Upload logic here...
    }

    setStatus(newStatus);
    if (newStatus === 'completed') {
      Alert.alert('Job Completed!', `Payment of ${job.price} has been added to your wallet.`);
      navigation.goBack();
    }
  };

  return (
    <ScrollView className="flex-1 bg-slate-50 pt-12 px-6">
      <Text className="text-2xl font-bold text-slate-800 mb-6">Active Job</Text>
      
      <View className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
        <Text className="text-xl font-bold text-slate-800 mb-2">{job?.title}</Text>
        <Text className="text-slate-600 mb-4">📍 {job?.address}</Text>
        
        <View className="flex-row justify-between border-t border-slate-100 pt-4">
          <Text className="text-slate-500 font-semibold">Expected Payout</Text>
          <Text className="text-green-600 font-bold text-lg">{job?.price}</Text>
        </View>
      </View>

      <Text className="font-bold text-slate-800 mb-4 text-lg">Update Status</Text>

      <View className="space-y-4">
        <TouchableOpacity 
          className={`p-4 rounded-xl border ${status === 'accepted' ? 'bg-blue-50 border-blue-600' : 'bg-white border-slate-200'}`}
          onPress={() => updateStatus('en_route')}
          disabled={status !== 'accepted'}
        >
          <Text className={`text-center font-bold ${status === 'accepted' ? 'text-blue-600' : 'text-slate-400'}`}>Start Travel (Share GPS)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className={`p-4 rounded-xl border ${status === 'en_route' ? 'bg-blue-50 border-blue-600' : 'bg-white border-slate-200'}`}
          onPress={() => updateStatus('in_progress')}
          disabled={status !== 'en_route'}
        >
          <Text className={`text-center font-bold ${status === 'en_route' ? 'text-blue-600' : 'text-slate-400'}`}>Arrived - Take "Before" Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className={`p-4 rounded-xl border ${status === 'in_progress' ? 'bg-green-50 border-green-600' : 'bg-white border-slate-200'}`}
          onPress={() => updateStatus('completed')}
          disabled={status !== 'in_progress'}
        >
          <Text className={`text-center font-bold ${status === 'in_progress' ? 'text-green-600' : 'text-slate-400'}`}>Complete - Take "After" Photo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
