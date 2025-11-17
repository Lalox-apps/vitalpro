import { useThemeStore } from "@/stores/theme-store";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: isDark ? "#8AB4F8" : "#1A73E8",
        tabBarInactiveTintColor: isDark ? "#6B7280" : "#94A3B8",
        tabBarBackground: () => null,
        tabBarStyle: {
          backgroundColor: isDark ? "#161B22" : "#FFFFFF",
          borderTopWidth: 0.5,
          borderTopColor: isDark ? "#2D333B" : "#E2E8F0",
          height: 70,
          paddingBottom: 10,
          paddingTop: 5,
        },

        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home-filled" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="health"
        options={{
          title: "Salud",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-hospital" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="habits"
        options={{
          title: "Hábitos",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="check-circle" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
