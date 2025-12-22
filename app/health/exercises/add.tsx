import { supabase } from '@/libs/supabase';
import { useThemeStore } from '@/stores/theme-store';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const gradientColors = isDark
    ? ['#0D1117', '#161B22']
    : ['#F7F9FC', '#EAF1FB'];

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    setLoading(false);
  };

  return (
    <LinearGradient colors={gradientColors as any} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 items-center justify-center px-6">
            <View
              className={`w-full max-w-md rounded-3xl p-8 shadow-xl border ${
                isDark
                  ? 'bg-dark-card border-dark-border'
                  : 'bg-card border-border'
              }`}
            >
              <Text
                className={`text-3xl font-bold text-center mb-2 ${
                  isDark ? 'text-dark-foreground' : 'text-foreground'
                }`}
              >
                VitalPro
              </Text>

              <Text
                className={`text-center mb-8 ${
                  isDark ? 'text-dark-muted' : 'text-muted'
                }`}
              >
                Bienestar • Meditación • Progreso
              </Text>

              <TextInput
                placeholder="Correo electrónico"
                placeholderTextColor={isDark ? '#6B7280' : '#94A3B8'}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                className={`rounded-xl px-4 py-3 mb-4 border ${
                  isDark
                    ? 'bg-dark-background text-dark-foreground border-dark-border'
                    : 'bg-background text-foreground border-border'
                }`}
              />

              <TextInput
                placeholder="Contraseña"
                placeholderTextColor={isDark ? '#6B7280' : '#94A3B8'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                className={`rounded-xl px-4 py-3 mb-6 border ${
                  isDark
                    ? 'bg-dark-background text-dark-foreground border-dark-border'
                    : 'bg-background text-foreground border-border'
                }`}
              />

              <TouchableOpacity
                onPress={handleLogin}
                disabled={loading}
                className={`rounded-xl py-4 mb-4 ${
                  isDark ? 'bg-dark-primary' : 'bg-primary'
                }`}
              >
                <Text className="text-center text-white font-semibold text-lg">
                  {loading ? 'Ingresando…' : 'Iniciar sesión'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text
                  className={`text-center ${
                    isDark ? 'text-dark-accent' : 'text-accent'
                  }`}
                >
                  ¿Olvidaste tu contraseña?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
