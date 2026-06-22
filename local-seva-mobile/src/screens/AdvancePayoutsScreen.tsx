import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';

export const AdvancePayoutsScreen: React.FC<any> = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const availableBalance = 4500;
  const earlyFeePercentage = 2.5;

  const history = [
    { id: 'TRX-9921', date: '12 Jun 2026', amount: 2000, status: 'Completed' },
    { id: 'TRX-8834', date: '05 May 2026', amount: 1500, status: 'Completed' },
    { id: 'TRX-7742', date: '18 Apr 2026', amount: 3000, status: 'Completed' },
  ];

  const calculateFee = () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return 0;
    return (val * earlyFeePercentage) / 100;
  };

  const parsedAmount = parseFloat(amount);
  const isValidAmount = !isNaN(parsedAmount) && parsedAmount > 0 && parsedAmount <= availableBalance;

  return (
    <ScrollView className="flex-1 bg-slate-50 p-5">
      <View className="mb-6">
        <Text className="text-2xl font-black text-slate-800">Advance Payouts</Text>
        <Text className="text-slate-500 text-sm mt-1">Request early access to your earnings</Text>
      </View>
      
      <View className="bg-white border border-slate-200 rounded-3xl p-5 mb-6 shadow-sm">
        <Text className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-1">Eligible Balance</Text>
        <Text className="text-4xl font-black text-slate-800 mb-6">₹{availableBalance.toLocaleString()}</Text>

        <Text className="text-xs font-bold text-slate-500 uppercase mb-2">Withdrawal Amount</Text>
        <View className="relative mb-4">
          <Text className="absolute left-4 top-4 text-slate-400 font-bold z-10">₹</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="Enter amount"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-800 font-bold"
          />
        </View>

        <View className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-slate-500">Requested Amount</Text>
            <Text className="text-sm font-bold text-slate-800">₹{isValidAmount ? parsedAmount.toLocaleString() : '0'}</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-slate-500">Early Access Fee (2.5%)</Text>
            <Text className="text-sm font-bold text-red-500">- ₹{calculateFee().toLocaleString()}</Text>
          </View>
          <View className="flex-row justify-between pt-2 border-t border-slate-200 mt-1">
            <Text className="font-bold text-slate-800">You will receive</Text>
            <Text className="font-black text-green-600 text-lg">
              ₹{isValidAmount ? (parsedAmount - calculateFee()).toLocaleString() : '0'}
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          className={`py-4 rounded-xl flex-row justify-center items-center ${isValidAmount ? 'bg-orange-500 shadow-md shadow-orange-500/30' : 'bg-slate-300'}`}
          disabled={!isValidAmount}
        >
          <Text className={`font-black ${isValidAmount ? 'text-white' : 'text-slate-500'}`}>Request Transfer</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-lg font-black text-slate-800 mb-4">Recent Payouts</Text>
      <View className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden mb-8">
        {history.map((item, index) => (
          <View key={item.id} className={`p-5 flex-row justify-between items-center ${index !== history.length - 1 ? 'border-b border-slate-100' : ''}`}>
            <View>
              <Text className="font-black text-slate-800">₹{item.amount.toLocaleString()}</Text>
              <Text className="text-xs text-slate-400 font-medium mt-1">{item.id}</Text>
            </View>
            <View className="items-end">
              <Text className="text-sm font-bold text-green-600">{item.status}</Text>
              <Text className="text-xs text-slate-400 mt-1">{item.date}</Text>
            </View>
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
export default AdvancePayoutsScreen;
