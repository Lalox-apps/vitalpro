import { useThemeStore } from "@/stores/theme-store";
import { Text, View } from "react-native";

export default function Exercises() {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  

  return (
    <View
      className={`flex-1 px-4 py-6 ${
        isDark ? "bg-dark-background" : "bg-background"
      }`}
    >
      <Text
        className={`text-2xl font-bold mb-6 ${
          isDark ? "text-dark-foreground" : "text-foreground"
        }`}
      >
      Actividad 
      </Text>

     
    </View>
  );
}
