import { useThemeStore } from "@/stores/theme-store";
import { StatusBar } from "expo-status-bar";
import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <SafeAreaView  className={theme === "dark" ? "bg-black" : "bg-white"} style={{ flex: 1 }}>
       <StatusBar style={isDark ? "light" : "dark"} />
      {children}
    </SafeAreaView>
  );
}
