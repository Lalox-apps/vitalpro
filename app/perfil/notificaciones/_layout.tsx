import { useThemeStore } from "@/stores/theme-store";
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function NotificationsLayout() {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="notifications"
        options={{
          headerShown: true,
          title: "Noticaciones",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: isDark ? "#000000" : "#FFFFFF",
          },
          headerTitleStyle: {
            color: isDark ? "#FFFFFF" : "#1A73E8",
          },
          headerLeft: () => <BackButton  isDark={isDark}/>,
        }}
      />

    </Stack>
  );
}
const BackButton=({isDark}:{isDark:boolean})=>{
  const router = useRouter();
return(
  <TouchableOpacity
  onPress={()=>router.back()}
  >
   <Ionicons  name="arrow-back" size={24} color={isDark?"#ffffff" :"#1A73E8"}/>
</TouchableOpacity>
)
}