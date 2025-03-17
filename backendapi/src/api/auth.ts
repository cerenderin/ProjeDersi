import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API URL'ini emülatör için güncelle
const API_URL = 'http://10.0.2.2:7178'; // Android Emülatör için

// Axios instance oluşturma
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Register fonksiyonu
export const register = async (
  fullName: string,
  email: string,
  phone: string,
  password: string
) => {
  try {
    const response = await api.post('/api/account/register', {
      fullName,
      email,
      phone,
      password,
    });

    return {
      success: true,
      message: response.data.message || 'Kayıt işlemi başarılı!',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Kayıt işlemi başarısız oldu. Lütfen tekrar deneyin.',
    };
  }
};

// Login fonksiyonu
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/api/account/login', {
      email,
      password,
    });

    // Token'ı AsyncStorage'a kaydet
    if (response.data.token) {
      await AsyncStorage.setItem('token', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }

    return {
      success: true,
      message: response.data.message || 'Giriş başarılı!',
      token: response.data.token,
      user: response.data.user,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Giriş işlemi başarısız oldu. Lütfen bilgilerinizi kontrol edin.',
    };
  }
}; 