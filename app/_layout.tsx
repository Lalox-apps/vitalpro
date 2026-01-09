
import DatabaseInitializer from "@/components/DatabaseInitializer";
import LoaderOverlay from "@/components/LoaderOverlay";
import ThemeProvider from "@/components/ThemeProvider";
import { api } from "@/core/api";
import { getToken } from "@/core/auth";
import { useAuthStore } from "@/stores/auth-stores";
import { useThemeStore } from "@/stores/theme-store";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect, useState } from "react";
import { Text, View } from "react-native";
import "../global.css";


export default function RootLayout() {
  const { theme } = useThemeStore();
  const { setSession, clearSession } = useAuthStore();
  const [booting, setBooting] = useState(true);
  const isDark = theme === "dark";


  useEffect(() => {
    const boot = async () => {
      const token = await getToken();

      if (!token) {
        setBooting(false);
        return;
      }

      api.setToken(token);

      const res = await api.get('users/me');

      if (res.success) {
        setSession(token, res.data);
      } else {
        clearSession();
      }

      setBooting(false);
    };

    boot();
  }, [setSession, clearSession]);

  if (booting) {
    return null; 
  }
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

