import ThemeProvider from "@/components/ThemeProvider";
import { useThemeStore } from "@/stores/theme-store";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  const { theme} = useThemeStore();
  return (
   
    <ThemeProvider>
    <Stack>
    <Stack.Screen 
      name="(tabs)"
      options={{
        headerShown:false
      }}
    />
  </Stack>
  </ThemeProvider>
 
  )
}
