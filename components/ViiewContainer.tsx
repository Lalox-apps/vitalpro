import { useThemeStore } from "@/stores/theme-store";
import React, { ReactNode } from 'react';
import { View } from 'react-native';
export default function ViewContainer({children}:{children: ReactNode}){
 const { theme } = useThemeStore();
  const isDark = theme === "dark";
  return (
    <View className={isDark? "bg-black" : "bg-white p-10" } style={{ flex: 1 }}>
      {children}
    </View>
  )
}

