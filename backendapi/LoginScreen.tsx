import { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert, ScrollView, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { Link, router } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import { login } from '../src/api/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    // Form validasyonu
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      const response = await login(email, password);
      
      if (response.success) {
        Alert.alert('Başarılı', response.message, [
          {
            text: 'Tamam',
            onPress: () => {
              // Ana sayfaya yönlendir
              router.replace('/home');
            },
          },
        ]);
      } else {
        Alert.alert('Hata', response.message);
      }
    } catch (error) {
      Alert.alert('Hata', 'Giriş işlemi sırasında bir hata oluştu');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Text style={styles.subtitle}>Sokak Dostlarımız İçin</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>E-POSTA</Text>
              <TextInput
                style={styles.input}
                placeholder="E-posta adresinizi giriniz"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.label}>ŞİFRE</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Şifrenizi giriniz"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  {showPassword ? <EyeOff size={20} color="#666" /> : <Eye size={20} color="#666" />}
                </Pressable>
              </View>
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginButton, email && password ? styles.loginButtonActive : null]}
              disabled={!email || !password}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>GİRİŞ YAP</Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>veya</Text>
              <View style={styles.dividerLine} />
            </View>

            <Link href="/register" asChild>
              <TouchableOpacity style={styles.registerButton}>
                <Text style={styles.registerButtonText}>YENİ HESAP OLUŞTUR</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  formContainer: {
    gap: 16,
  },
  inputWrapper: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginLeft: 4,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#e65c00',
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#ccc',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  loginButtonActive: {
    backgroundColor: '#e65c00',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    color: '#666',
    paddingHorizontal: 16,
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: '#fff',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e65c00',
  },
  registerButtonText: {
    color: '#e65c00',
    fontSize: 16,
    fontWeight: '700',
  },
}); 