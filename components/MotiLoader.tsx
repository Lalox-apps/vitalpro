import { useThemeStore } from "@/stores/theme-store";
import { MotiView } from "moti";
import React from "react";
import { View } from "react-native";
import { Easing } from "react-native-reanimated";

export function MotiLoader() {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const dotColor = isDark ? "#8AB4F8" : "#1A73E8";

  return (
    <View
      style={{
        width: 100,
        height: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {[0, 1, 2].map((i) => (
        <MotiView
          key={i}
          from={{ opacity: 0.4, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.3 }}
          transition={{
            type: "timing",
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            loop: true,
            delay: i * 150,
          }}
          style={{
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: dotColor,
          }}
        />
      ))}
    </View>
  );
}
