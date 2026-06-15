import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function KYCUploadScreen() {
  const navigation = useNavigation<any>();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    if (!imageUri) return;
    setUploading(true);
    try {
      // In production:
      // const response = await fetch(imageUri);
      // const blob = await response.blob();
      // const storageRef = ref(storage, `kyc/${user.uid}/id_document.jpg`);
      // await uploadBytes(storageRef, blob);
      // const downloadURL = await getDownloadURL(storageRef);
      // await apiClient.post('/workers/kyc', { documentUrl: downloadURL });
      
      setTimeout(() => {
        Alert.alert('Success', 'KYC Document uploaded and pending verification!');
        setUploading(false);
        navigation.goBack();
      }, 1500);
    } catch (error: any) {
      Alert.alert('Error', error.message);
      setUploading(false);
    }
  };

  return (
    <View className="flex-1 bg-slate-50 pt-12 px-6">
      <TouchableOpacity onPress={() => navigation.goBack()} className="mb-6">
        <Text className="text-blue-600 font-bold">← Back to Dashboard</Text>
      </TouchableOpacity>

      <Text className="text-3xl font-bold text-slate-800 mb-2">KYC Verification</Text>
      <Text className="text-slate-600 mb-8">Please upload a clear photo of your Government ID to complete your registration.</Text>

      <TouchableOpacity 
        className="w-full h-48 bg-white border-2 border-dashed border-slate-300 rounded-2xl items-center justify-center mb-8 overflow-hidden"
        onPress={pickImage}
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} className="w-full h-full" />
        ) : (
          <>
            <Text className="text-4xl mb-2">📸</Text>
            <Text className="text-slate-500 font-semibold">Tap to select ID Document</Text>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        className={`w-full p-4 rounded-xl shadow-md ${imageUri ? 'bg-blue-600' : 'bg-slate-300'}`}
        onPress={handleUpload}
        disabled={!imageUri || uploading}
      >
        <Text className="text-white text-center font-bold text-lg">
          {uploading ? 'Uploading...' : 'Submit for Verification'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
