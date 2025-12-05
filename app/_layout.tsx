
import DatabaseInitializer from "@/components/DatabaseInitializer";
import ThemeProvider from "@/components/ThemeProvider";
import { useThemeStore } from "@/stores/theme-store";
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";
import { Text, TouchableOpacity, View } from "react-native";
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
    
  </Stack>
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

const BackButton=()=>{
  const router = useRouter();
return(
  <TouchableOpacity
  onPress={()=>router.back()}
  >
   <Ionicons  name="arrow-back" size={24} color="#1A73E8"/>
</TouchableOpacity>
)
}
