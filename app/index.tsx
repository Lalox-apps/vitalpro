import CustomButton from '@/components/CustomButton';
import { api } from '@/core/api';
import { useThemeStore } from '@/stores/theme-store';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  Alert,
  ColorValue,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'L' | 'R'>('L');

  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  /* 🎨 Gradient refinado */
  const gradientColors: readonly [ColorValue, ColorValue] = isDark
    ? ['#0D1117', '#161B22']
    : ['#F7F9FC', '#E6EEFF'];

    const handleLogin = async () => {
      const res = await api.post('auth/login', {
        email,
        password,
      });
      
      if (res.success) {
        console.log('LOGIN OK', res.data);
      } else {
        Alert.alert('Error', res.message ?? 'Error');
      }
      
    };
    
    const handleRegister = async () => {
      try {
        setLoading(true);
       
  
      } catch (e) {
        Alert.alert('Error', 'No se pudo crear la cuenta');
      } finally {
        setLoading(false);
      }
    };
    

  return (
    <LinearGradient colors={gradientColors} style={{ flex: 1 }}>
      {/* 🧠 Logo sombra / identidad */}
      {/* <Image
        source={require('@/assets/images/logo-vitalpro.png')}
        resizeMode="contain"
        style={{
          position: 'absolute',
          right: -60,
          top: '30%',
          width: 260,
          height: 260,
          opacity: isDark ? 0.05 : 0.08,
          tintColor: isDark ? '#FFFFFF' : '#1A73E8',
        }}
      /> */}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 items-center justify-center px-6">
            {/* 🪟 Card principal */}
            <View
              className={`w-full max-w-md rounded-[32px] p-8 shadow-xl border ${
                isDark
                  ? 'bg-dark-card/90 border-dark-border'
                  : 'bg-card/95 border-border'
              }`}
            >
              {/* 🧠 Marca */}
              <Text
                className={`text-3xl font-semibold tracking-tight text-center ${
                  isDark ? 'text-dark-foreground' : 'text-foreground'
                }`}
              >
                VitalPro
              </Text>

              {/* 🧘 Propósito */}
              <Text
                className={`text-sm text-center mt-1 mb-8 ${
                  isDark ? 'text-dark-muted' : 'text-muted'
                }`}
              >
                Bienestar • Meditación • Progreso
              </Text>

              {/* 🔁 Contexto Login / Register */}
              <Text
                className={`text-xl font-medium text-center mb-6 ${
                  isDark ? 'text-dark-foreground' : 'text-foreground'
                }`}
              >
                {step === 'L'
                  ? 'Bienvenido de nuevo'
                  : 'Crea tu cuenta'}
              </Text>

              {/* ✏️ Email */}
              <TextInput
                placeholder="Correo electrónico"
                placeholderTextColor={isDark ? '#6B7280' : '#94A3B8'}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                className={`h-14 rounded-2xl px-5 mb-4 border ${
                  isDark
                    ? 'bg-dark-background text-dark-foreground border-dark-border'
                    : 'bg-background text-foreground border-border'
                }`}
              />

              {/* 🔒 Password */}
              <TextInput
                placeholder="Contraseña"
                placeholderTextColor={isDark ? '#6B7280' : '#94A3B8'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                className={`h-14 rounded-2xl px-5 mb-6 border ${
                  isDark
                    ? 'bg-dark-background text-dark-foreground border-dark-border'
                    : 'bg-background text-foreground border-border'
                }`}
              />

              {/* 🔘 CTA principal */}
              <CustomButton
                variant="primary"
                disable={loading || email === '' || password.length < 6}
                onPress={() => {
                  step === 'L' ? handleLogin() : handleRegister();
                }}
                title={
                  loading
                    ? 'Procesando…'
                    : step === 'L'
                    ? 'Iniciar sesión'
                    : 'Crear cuenta'
                }
              />

              {/* 🔗 Links secundarios */}
              {step === 'L' && (
                <TouchableOpacity className="mt-4">
                  <Text
                    className={`text-center ${
                      isDark ? 'text-dark-accent' : 'text-accent'
                    }`}
                  >
                    ¿Olvidaste tu contraseña?
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                className="mt-4"
                onPress={() => setStep(step === 'L' ? 'R' : 'L')}
              >
                <Text
                  className={`text-center font-medium ${
                    isDark ? 'text-dark-accent' : 'text-accent'
                  }`}
                >
                  {step === 'L'
                    ? 'Crear una cuenta'
                    : 'Ya tengo una cuenta'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
