
import DatabaseInitializer from "@/components/DatabaseInitializer";
import LoaderOverlay from "@/components/LoaderOverlay";
import ThemeProvider from "@/components/ThemeProvider";
import { api } from "@/core/api";
import { getToken } from "@/core/auth";
import { useAuthStore } from "@/stores/auth-stores";
import { useThemeStore } from "@/stores/theme-store";
import { Stack, useRouter } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect } from "react";
import { Text, View } from "react-native";
import "../global.css";


export default function RootLayout() {
  const { theme } = useThemeStore();
  const router = useRouter()
  const { setSession, clearSession, setBooted , booted, isAuthenticated} = useAuthStore();

  useEffect(() => {
    const boot = async () => {
      console.log('🟡 BOOT START');
  
      const token = await getToken();
      console.log('🟡 TOKEN FROM STORAGE:', token);
  
      if (!token) {
        console.log('🔴 NO TOKEN → setBooted');
        setBooted();
        return;
      }
  
      api.setToken(token);
      console.log('🟢 TOKEN SET IN API');
  
      const res = await api.get('users/me', false);
      console.log('🟡 /users/me RESPONSE:', res);
  
      if (res.success) {
        console.log('🟢 SESSION VALID → setSession');
        setSession(token, res.data);
      } else {
        console.log('🔴 SESSION INVALID → clearSession');
        clearSession();
      }
    };
  
    boot();
  }, []);
  
  useEffect(() => {
    if (!booted) return;
  
    if (isAuthenticated) {
      router.replace('/(tabs)');
    } else {
      router.replace('/');
    }
  }, [booted, isAuthenticated]);
  

  return (
    <SQLiteProvider databaseName="gorin.db" useSuspense>
    <Suspense fallback={<FallbackLoader/>}>
   <DatabaseInitializer>
    <ThemeProvider>
    <Stack>
    <Stack.Screen 
      name="index"
      options={{
        headerShown:false,
      }}
    />
    <Stack.Screen 
      name="(tabs)"
      options={{
        headerShown:false,
      }}
    />
    <Stack.Screen 
      name="health"
      options={() => {
        return {
          headerShown: false,

        };
      }}
    />
    <Stack.Screen 
      name="perfil"
      options={() => {
        return {
          headerShown: false,
        };
      }}
    />
    
  </Stack>
  <LoaderOverlay/>
  </ThemeProvider>
  </DatabaseInitializer>
  </Suspense>
  </SQLiteProvider>
  );
}
const FallbackLoader = () => (
  <View className="flex-1 items-center justify-center bg-white">
    <Text style={{ fontSize: 28, fontWeight: "700" }}>Vital Pro</Text>
  </View>
);

