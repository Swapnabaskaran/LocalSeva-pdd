import { create } from 'zustand';
import { User as FirebaseUser } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: FirebaseUser | null;
  role: 'customer' | 'worker' | 'admin' | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  token: string | null;
  setUser: (user: FirebaseUser | null) => void;
  setRole: (role: 'customer' | 'worker' | 'admin') => void;
  setToken: (token: string | null) => void;
  setInitializing: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  isAuthenticated: false,
  isInitializing: true,
  token: null,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setRole: (role) => set({ role }),
  setToken: (token) => {
    set({ token });
    if (token) {
      AsyncStorage.setItem('api_token', token).catch(console.error);
    } else {
      AsyncStorage.removeItem('api_token').catch(console.error);
    }
  },
  setInitializing: (isInitializing) => set({ isInitializing }),
}));
