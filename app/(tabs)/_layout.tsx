import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

// Paleta VitalPro
const Colors = {
  light: {
    background: "#FFFFFF",
    tint: "#00796B",
    tabIconDefault: "#A0A0A0",
    tabIconSelected: "#00796B",
  },
  dark: {
    background: "#000000",
    tint: "#4DD0E1",
    tabIconDefault: "#888888",
    tabIconSelected: "#4DD0E1",
  },
};

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          left: 20,
          right: 20,
          height: 70,
          borderRadius: 30,
          paddingBottom: 8,
        },
        
        tabBarActiveTintColor: theme.tabIconSelected,
        tabBarInactiveTintColor: theme.tabIconDefault,
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.tint,
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 20,
        }
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
