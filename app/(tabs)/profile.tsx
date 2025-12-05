import { getThemeStyles } from "@/components/Theme";
import ViewContainer from "@/components/ViiewContainer";
import { useEffect } from "react";
import { Switch, Text, View } from "react-native";
import { useThemeStore } from "../../stores/theme-store";

export default function ProfileScreen() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const isDark = theme === "dark";
  const styles = getThemeStyles(isDark);

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
        <Text className={`text-2xl font-semibold mt-3 ${styles.text}`}>
          Eduardo
        </Text>
        <Text className={`text-sm ${styles.textMuted}`}>
          Nivel de bienestar: Intermedio
        </Text>
      </View>

      {/* Opciones */}
      <Text className="text-sm uppercase font-semibold text-muted dark:text-dark-muted mt-3 mb-1">
        Opciones
      </Text>

      <Card style={styles} >
        <Option label="Mi información"  style={styles}/>
        <Option label="Progreso de hábitos" style={styles}/>
        <Option label="Recetas guardadas"  style={styles}/>
        <Option label="Ejercicios favoritos" style={styles}/>
        <Option label="Meditaciones guardadas" isLast style={styles}/>
      </Card>

      {/* Apariencia */}
      <Text className="text-sm uppercase font-semibold text-muted dark:text-dark-muted mb-1">
        Apariencia
      </Text>

      <View className = {`${styles.card} p-4 rounded-2xl mb-4 flex-row justify-between items-center`}>
        <Text className = {`${styles.text}`}>
          Tema oscuro
        </Text>

        {/* SWITCH Controlado por Zustand Persist */}
        <Switch
          value={theme === "dark"}
          onValueChange={toggleTheme}
          trackColor={{true:"#4D9FF5", false: null}}
        />
      </View>

      {/* General */}
      <Text className="text-sm uppercase font-semibold text-muted dark:text-dark-muted mb-1">
        General
      </Text>

      <Card style={styles}>
        <Option label="Notificaciones" style={styles}/>
        <Option label="Privacidad" style={styles}/>
        <Option label="Acerca de VitalPro" isLast style={styles}/>
      </Card>

      {/* Logout */}
      {/* <View className="items-center mt-4">
        <View className="border border-primary dark:border-dark-primary px-6 py-3 rounded-xl">
          <Text className="text-primary dark:text-dark-primary font-semibold">
            Cerrar sesión
          </Text>
        </View>
      </View> */}
    </ViewContainer>
  );
}

function Card({ children, style }:any) {
  return (
    <View className={`${style.card} p-4 rounded-2xl mb-4`}>
      {children}
    </View>
  );
}

function Option({ label, isLast , style}:any) {
  return (
    <View className={`py-3 ${!isLast ? "border-b border-border dark:border-dark-border" : ""}`}>
      <Text className ={`${style.text}`}>
        {label}
      </Text>
    </View>
  );
}
