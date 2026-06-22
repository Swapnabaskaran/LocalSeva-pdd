import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

export const EquipmentRentalScreen: React.FC<any> = ({ navigation }) => {
  const formattedTitle = "EquipmentRentalScreen".replace(/Screen$/, '').replace(/([A-Z])/g, ' $1').trim();

  return (
    <ScrollView className="flex-1 bg-slate-50 p-5">
      <View className="mb-6 flex-row justify-between items-center">
        <View className="flex-1">
          <Text className="text-2xl font-black text-slate-800">{formattedTitle}</Text>
          <Text className="text-slate-500 text-sm mt-1">Manage your {formattedTitle.toLowerCase()}</Text>
        </View>
      </View>

      <View className="flex-row justify-between mb-6">
        <View className="bg-white border border-slate-200 p-4 rounded-2xl flex-1 mr-2 shadow-sm">
          <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Data Point 1</Text>
          <Text className="text-xl font-black text-slate-800">42</Text>
        </View>
        <View className="bg-white border border-slate-200 p-4 rounded-2xl flex-1 ml-2 shadow-sm">
          <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Data Point 2</Text>
          <Text className="text-xl font-black text-slate-800">1,024</Text>
        </View>
      </View>

      <Text className="text-lg font-black text-slate-800 mb-4">Recent Items</Text>
      <View className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden mb-8">
        {[1, 2, 3, 4].map(i => (
          <TouchableOpacity key={i} className={`p-5 flex-row justify-between items-center ${i !== 4 ? 'border-b border-slate-100' : ''}`}>
            <View>
              <Text className="font-bold text-slate-800">{formattedTitle} #{i}</Text>
              <Text className="text-xs text-slate-400 mt-1">Active status</Text>
            </View>
            <View className="bg-orange-100 px-3 py-1 rounded-full">
              <Text className="text-xs font-bold text-orange-600">View</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        className="bg-orange-500 py-4 rounded-xl mb-4 shadow-md shadow-orange-500/30"
        onPress={() => console.log('Action')}
      >
        <Text className="text-center text-white font-black text-lg">Perform Action</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        className="bg-slate-200 py-4 rounded-xl mb-12"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-center text-slate-700 font-bold">Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EquipmentRentalScreen;
