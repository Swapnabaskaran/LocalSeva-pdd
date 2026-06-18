import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-row items-center p-4 border-b border-slate-200 bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-slate-800">Settings</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Notifications */}
        <View className="mb-6 bg-white rounded-xl p-4 shadow-sm">
          <Text className="text-lg font-bold text-slate-800 mb-4">Notifications</Text>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-slate-600 font-medium">Push Notifications</Text>
            <Switch value={pushEnabled} onValueChange={setPushEnabled} trackColor={{ true: '#2563EB', false: '#CBD5E1' }} />
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-slate-600 font-medium">Email Alerts</Text>
            <Switch value={emailEnabled} onValueChange={setEmailEnabled} trackColor={{ true: '#2563EB', false: '#CBD5E1' }} />
          </View>
        </View>

        {/* Appearance */}
        <View className="mb-6 bg-white rounded-xl p-4 shadow-sm">
          <Text className="text-lg font-bold text-slate-800 mb-4">Appearance</Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-slate-600 font-medium">Dark Mode</Text>
            <Switch value={darkMode} onValueChange={setDarkMode} trackColor={{ true: '#2563EB', false: '#CBD5E1' }} />
          </View>
        </View>

        {/* Account Actions */}
        <View className="bg-white rounded-xl shadow-sm">
          <TouchableOpacity className="p-4 border-b border-slate-100 flex-row items-center">
            <Ionicons name="lock-closed-outline" size={20} color="#64748B" className="mr-3" />
            <Text className="text-slate-700 font-medium ml-3">Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity className="p-4 border-b border-slate-100 flex-row items-center">
            <Ionicons name="language-outline" size={20} color="#64748B" className="mr-3" />
            <Text className="text-slate-700 font-medium ml-3">Language (English)</Text>
          </TouchableOpacity>
          <TouchableOpacity className="p-4 flex-row items-center">
            <Ionicons name="trash-outline" size={20} color="#EF4444" className="mr-3" />
            <Text className="text-red-500 font-bold ml-3">Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
