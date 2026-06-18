import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ChatScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-row items-center p-4 border-b border-slate-200 bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <View className="w-10 h-10 rounded-full bg-slate-200 items-center justify-center mr-3">
          <Ionicons name="person" size={20} color="#94A3B8" />
        </View>
        <View>
          <Text className="text-lg font-bold text-slate-800">John Doe</Text>
          <Text className="text-xs text-emerald-500 font-medium">Online</Text>
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 p-4" contentContainerStyle={{ paddingBottom: 20 }}>
          {/* Provider Message */}
          <View className="flex-row mb-4">
            <View className="bg-white rounded-2xl rounded-tl-none p-3 max-w-[80%] shadow-sm border border-slate-100">
              <Text className="text-slate-700">Hello! I'm on my way to your location. Should be there in 15 mins.</Text>
              <Text className="text-[10px] text-slate-400 mt-1 text-right">10:42 AM</Text>
            </View>
          </View>

          {/* User Message */}
          <View className="flex-row justify-end mb-4">
            <View className="bg-blue-600 rounded-2xl rounded-tr-none p-3 max-w-[80%] shadow-sm">
              <Text className="text-white">Great, thanks for letting me know! The gate code is 1234.</Text>
              <Text className="text-[10px] text-blue-200 mt-1 text-right">10:45 AM</Text>
            </View>
          </View>
        </ScrollView>

        <View className="p-3 bg-white border-t border-slate-200 flex-row items-center">
          <TouchableOpacity className="mr-3">
            <Ionicons name="add-circle-outline" size={28} color="#94A3B8" />
          </TouchableOpacity>
          <View className="flex-1 bg-slate-100 rounded-full px-4 py-2 mr-3 flex-row items-center">
            <TextInput 
              placeholder="Type a message..." 
              className="flex-1 text-slate-800"
              placeholderTextColor="#94A3B8"
            />
          </View>
          <TouchableOpacity className="w-10 h-10 bg-blue-600 rounded-full items-center justify-center shadow-sm">
            <Ionicons name="send" size={18} color="#FFFFFF" className="ml-1" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
