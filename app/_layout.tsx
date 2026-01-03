
import DatabaseInitializer from "@/components/DatabaseInitializer";
import LoaderOverlay from "@/components/LoaderOverlay";
import ThemeProvider from "@/components/ThemeProvider";
import { useThemeStore } from "@/stores/theme-store";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";
import { Text, View } from "react-native";
import "../global.css";


export default function RootLayout() {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";
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

