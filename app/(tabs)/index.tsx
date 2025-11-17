import { useThemeStore } from "@/stores/theme-store";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <ScrollView
      className={`flex-1 px-5 pt-10 
        ${isDark ? "bg-dark-background" : "bg-background"}`}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View className="mb-6">
        <Text
          className={`text-2xl font-semibold 
            ${isDark ? "text-dark-foreground" : "text-foreground"}`}
        >
          Bienvenido a VitalPro 👋
        </Text>
        <Text
          className={`mt-2 text-base 
            ${isDark ? "text-dark-muted" : "text-muted"}`}
        >
          Tu bienestar masculino en un solo lugar.
        </Text>
      </View>

      {/* ACCESOS RÁPIDOS */}
      <View className="flex-row justify-between gap-3 mb-6">
        <QuickButton
          title="Salud"
          icon="local-hospital"
          dark={isDark}
        />
        <QuickButton
          title="Hábitos"
          icon="check-circle"
          dark={isDark}
        />
        <QuickButton
          title="Meditación"
          icon="self-improvement"
          dark={isDark}
        />
      </View>

      {/* TARJETA — RECOMENDACIÓN DEL DÍA */}
      <View
        className={`p-5 rounded-2xl mb-6 
          ${isDark ? "bg-dark-card" : "bg-card"}`}
      >
        <Text
          className={`text-lg font-semibold mb-2 
            ${isDark ? "text-dark-foreground" : "text-foreground"}`}
        >
          Recomendación del día
        </Text>

        <Text
          className={`${isDark ? "text-dark-muted" : "text-muted"} leading-5`}
        >
          Bebe 2 litros de agua hoy y realiza 10 minutos de respiración
          diafragmática para mejorar la salud prostática.
        </Text>
      </View>

      {/* PROGRESO DE HÁBITOS */}
      <View
        className={`p-5 rounded-2xl mb-6 
          ${isDark ? "bg-dark-card" : "bg-card"}`}
      >
        <Text
          className={`text-lg font-semibold mb-3 
            ${isDark ? "text-dark-foreground" : "text-foreground"}`}
        >
          Tu progreso
        </Text>

        <HabitBar label="Agua diaria" progress={70} dark={isDark} />
        <HabitBar label="Ejercicio" progress={40} dark={isDark} />
        <HabitBar label="Meditación" progress={20} dark={isDark} />
      </View>

      {/* TARJETA — CONSEJO DE ESTILO DE VIDA */}
      <View
        className={`p-5 rounded-2xl mb-10 
          ${isDark ? "bg-dark-card" : "bg-card"}`}
      >
        <Text
          className={`text-lg font-semibold mb-2 
            ${isDark ? "text-dark-foreground" : "text-foreground"}`}
        >
          Consejo de estilo de vida
        </Text>

        <Text
          className={`${isDark ? "text-dark-muted" : "text-muted"} leading-5`}
        >
          Evita estar sentado por periodos largos. Haz pausas de 5 minutos cada
          hora para mejorar la circulación y reducir la presión prostática.
        </Text>
      </View>
    </ScrollView>
  );
}

/* -----------------------------
   COMPONENTES DE LA PANTALLA
--------------------------------*/

function QuickButton({ title, icon, dark }: any) {
  return (
    <TouchableOpacity
      className={`w-24 h-24 rounded-2xl items-center justify-center 
        ${dark ? "bg-dark-card" : "bg-card"}`}
      activeOpacity={0.7}
    >
      <MaterialIcons
        name={icon}
        size={32}
        color={dark ? "#8AB4F8" : "#1A73E8"}
      />
      <Text className={`mt-2 text-sm ${dark ? "text-dark-foreground" : "text-foreground"}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

function HabitBar({ label, progress, dark }: any) {
  return (
    <View className="mb-4">
      <Text className={`${dark ? "text-dark-foreground" : "text-foreground"} mb-1`}>
        {label}
      </Text>

      <View
        className={`h-3 rounded-full 
          ${dark ? "bg-dark-border" : "bg-border"}`}
      >
        <View
          style={{ width: `${progress}%` }}
          className={`h-3 rounded-full 
            ${dark ? "bg-dark-primary" : "bg-primary"}`}
        />
      </View>
    </View>
  );
} 
