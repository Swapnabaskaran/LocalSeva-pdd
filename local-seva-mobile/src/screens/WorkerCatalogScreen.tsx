import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function WorkerCatalogScreen() {
  const navigation = useNavigation();
  const [services, setServices] = useState([
    { id: 1, name: 'Basic Plumbing Repair', price: '$50', active: true },
    { id: 2, name: 'Pipe Installation', price: '$120', active: true },
    { id: 3, name: 'Water Heater Service', price: '$80', active: false },
  ]);

  const toggleService = (id: number) => {
    setServices(services.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-row items-center justify-between p-4 border-b border-slate-200 bg-white shadow-sm z-10">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#1E293B" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-slate-800">My Catalog</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="add" size={28} color="#2563EB" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 p-4">
        <Text className="text-sm text-slate-500 mb-4">Manage the services you offer and set your base prices.</Text>

        {services.map((service) => (
          <View key={service.id} className={`bg-white rounded-2xl p-4 shadow-sm mb-4 border ${service.active ? 'border-blue-100' : 'border-slate-100 opacity-60'}`}>
            <View className="flex-row justify-between items-center mb-2">
              <Text className="font-bold text-slate-800 text-lg">{service.name}</Text>
              <Switch 
                value={service.active} 
                onValueChange={() => toggleService(service.id)} 
                trackColor={{ true: '#2563EB', false: '#CBD5E1' }}
              />
            </View>
            <View className="flex-row justify-between items-center mt-2 pt-3 border-t border-slate-100">
              <View>
                <Text className="text-xs text-slate-400 uppercase tracking-wider font-bold">Base Price</Text>
                <Text className="text-blue-600 font-black text-lg">{service.price}</Text>
              </View>
              <TouchableOpacity className="flex-row items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <Ionicons name="create-outline" size={16} color="#475569" />
                <Text className="text-slate-600 font-bold ml-1 text-xs">Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
