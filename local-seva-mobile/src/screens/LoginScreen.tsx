import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { auth, app } from '../services/firebaseConfig';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [loginMode, setLoginMode] = useState<'email' | 'phone'>('email');
  const recaptchaVerifier = useRef(null);

  const handleEmailLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      Alert.alert('Login Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = async () => {
    if (!email || !password) return;
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      Alert.alert('Signup Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    if (!phoneNumber) return;
    setLoading(true);
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current!
      );
      setVerificationId(verificationId);
      Alert.alert('Success', 'OTP sent to your phone');
    } catch (error: any) {
      Alert.alert('OTP Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!verificationCode) return;
    setLoading(true);
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      await signInWithCredential(auth, credential);
    } catch (error: any) {
      Alert.alert('Verification Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 justify-center items-center bg-slate-50 px-6"
    >
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app ? app.options : undefined}
      />
      
      <Text className="text-3xl font-bold text-blue-600 mb-8">LocalSeva Auth</Text>
      
      <View className="flex-row w-full mb-6 bg-slate-200 rounded-xl p-1">
        <TouchableOpacity 
          className={`flex-1 p-3 rounded-lg ${loginMode === 'email' ? 'bg-white shadow-sm' : ''}`}
          onPress={() => setLoginMode('email')}
        >
          <Text className={`text-center font-bold ${loginMode === 'email' ? 'text-blue-600' : 'text-slate-500'}`}>Email</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`flex-1 p-3 rounded-lg ${loginMode === 'phone' ? 'bg-white shadow-sm' : ''}`}
          onPress={() => setLoginMode('phone')}
        >
          <Text className={`text-center font-bold ${loginMode === 'phone' ? 'text-blue-600' : 'text-slate-500'}`}>Phone</Text>
        </TouchableOpacity>
      </View>

      {loginMode === 'email' ? (
        <>
          <TextInput 
            className="w-full bg-white p-4 rounded-xl border border-slate-200 mb-4 shadow-sm"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput 
            className="w-full bg-white p-4 rounded-xl border border-slate-200 mb-8 shadow-sm"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {loading ? <ActivityIndicator size="large" color="#2563EB" /> : (
            <View className="w-full flex-row space-x-4">
              <TouchableOpacity className="flex-1 bg-white border border-blue-600 p-4 rounded-xl" onPress={handleEmailSignup}>
                <Text className="text-blue-600 text-center font-bold">Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-blue-600 p-4 rounded-xl shadow-md" onPress={handleEmailLogin}>
                <Text className="text-white text-center font-bold">Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <>
          <TextInput 
            className="w-full bg-white p-4 rounded-xl border border-slate-200 mb-4 shadow-sm"
            placeholder="Phone Number (+1234567890)"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            editable={!verificationId}
          />
          {verificationId ? (
            <TextInput 
              className="w-full bg-white p-4 rounded-xl border border-slate-200 mb-8 shadow-sm"
              placeholder="Verification Code"
              value={verificationCode}
              onChangeText={setVerificationCode}
              keyboardType="number-pad"
            />
          ) : null}
          
          {loading ? <ActivityIndicator size="large" color="#2563EB" /> : (
            <TouchableOpacity 
              className="w-full bg-blue-600 p-4 rounded-xl shadow-md" 
              onPress={verificationId ? handleVerifyOTP : handleSendOTP}
            >
              <Text className="text-white text-center font-bold">
                {verificationId ? 'Verify Code' : 'Send OTP'}
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </KeyboardAvoidingView>
  );
}
