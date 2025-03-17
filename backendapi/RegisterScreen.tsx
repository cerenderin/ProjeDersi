import { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import { register } from '../src/api/auth';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: 'Edirne', // Lokasyon varsayılan olarak Edirne
    password: '',
  });

  const handleRegister = async () => {
    // Form validasyonu
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Hata', 'Şifre en az 6 karakter olmalıdır.');
      return;
    }

    try {
      const response = await register(
        formData.fullName,
        formData.email,
        formData.phone,
        formData.password
      );

      if (response.success) {
        Alert.alert('Başarılı', response.message, [
          {
            text: 'Tamam',
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ]);
      } else {
        Alert.alert('Hata', response.message);
      }
    } catch (error) {
      Alert.alert('Hata', 'Kayıt işlemi sırasında bir hata oluştu.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Bilgilerim</Text>

        <TextInput
          style={styles.input}
          placeholder="Adı Soyadı"
          value={formData.fullName}
          onChangeText={(text) => setFormData({ ...formData, fullName: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="E-Posta"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Telefon Numarası"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          keyboardType="phone-pad"
        />

        <Text style={styles.sectionTitle}>Semtim</Text>
        <TouchableOpacity style={styles.locationButton} onPress={() => setFormData({ ...formData, location: 'Edirne' })}>
          <Text style={styles.locationButtonText}>Edirne Seçildi</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Şifrem</Text>
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry
        />

        <Text style={styles.terms}>
          Kişisel Verilerin Korunması ve İşlenmesine İlişkin Aydınlatma Metni'ni okudum, anladım. KVKK gereği kişisel verilerin korunması amacıyla KVKK'ya uygun bir şekilde işlenmesine ve saklanmasına rıza gösteriyorum.
        </Text>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>KAYDET</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 20,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e65c00',
    marginTop: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#e65c00',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  locationButton: {
    height: 50,
    backgroundColor: '#e65c00',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  terms: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  registerButton: {
    backgroundColor: '#e65c00',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 