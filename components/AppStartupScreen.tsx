import { useThemeStore } from "@/stores/theme-store";
import { MotiText, MotiView } from "moti";
import { StyleSheet, View } from "react-native";

export default function AppStartupScreen() {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#0D1117" : "#FFFFFF" },
      ]}
    >
      <MotiView
        from={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "timing", duration: 700 }}
      >
        <MotiText
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing", duration: 900 }}
          style={{
            fontSize: 32,
            fontWeight: "700",
            color: isDark ? "#8AB4F8" : "#1A73E8",
          }}
        >
          GORIN
        </MotiText>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
