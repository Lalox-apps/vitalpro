import ViewContainer from "@/components/ViiewContainer";
import { useEffect } from "react";
import { Switch, Text, View } from "react-native";
import { useThemeStore } from "../../../stores/theme-store";

export default function ProfileScreen() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  // Aplica la clase global "dark" para tailwind
  useEffect(() => {
    // Solo existe en web, así que lo protegemos
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (theme === "dark") root.classList.add("dark");
      else root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ViewContainer>
      
      {/* Avatar */}
      <View className="items-center mb-6">
        {/* <Image
          source={require("../../assets/avatar.png")}
          className="w-28 h-28 rounded-full"
        /> */}
        <Text className="text-2xl font-semibold mt-3 text-foreground dark:text-dark-foreground">
          Eduardo
        </Text>
        <Text className="text-sm text-muted dark:text-dark-muted mt-1">
          Nivel de bienestar: Intermedio
        </Text>
      </View>

      {/* Opciones */}
      <Text className="text-sm uppercase font-semibold text-muted dark:text-dark-muted mt-3 mb-1">
        Opciones
      </Text>

      <Card>
        <Option label="Mi información" />
        <Option label="Progreso de hábitos" />
        <Option label="Recetas guardadas" />
        <Option label="Ejercicios favoritos" />
        <Option label="Meditaciones guardadas" isLast />
      </Card>

      {/* Apariencia */}
      <Text className="text-sm uppercase font-semibold text-muted dark:text-dark-muted mb-1">
        Apariencia
      </Text>

      <View className="bg-card dark:bg-dark-card p-4 rounded-2xl mb-4 flex-row justify-between items-center">
        <Text className="text-foreground dark:text-dark-foreground">
          Tema oscuro
        </Text>

        {/* SWITCH Controlado por Zustand Persist */}
        <Switch
          value={theme === "dark"}
          onValueChange={toggleTheme}
        />
      </View>

      {/* General */}
      <Text className="text-sm uppercase font-semibold text-muted dark:text-dark-muted mb-1">
        General
      </Text>

      <Card>
        <Option label="Notificaciones" />
        <Option label="Privacidad" />
        <Option label="Acerca de VitalPro" isLast />
      </Card>

      {/* Logout */}
      <View className="items-center mt-4">
        <View className="border border-primary dark:border-dark-primary px-6 py-3 rounded-xl">
          <Text className="text-primary dark:text-dark-primary font-semibold">
            Cerrar sesión
          </Text>
        </View>
      </View>
    </ViewContainer>
  );
}

function Card({ children }:any) {
  return (
    <View className="bg-card dark:bg-dark-card p-4 rounded-2xl mb-4">
      {children}
    </View>
  );
}

function Option({ label, isLast }:any) {
  return (
    <View className={`py-3 ${!isLast ? "border-b border-border dark:border-dark-border" : ""}`}>
      <Text className="text-foreground dark:text-dark-foreground">
        {label}
      </Text>
    </View>
  );
}
