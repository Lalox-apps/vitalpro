import { getThemeStyles } from "@/components/Theme";
import { useThemeStore } from "@/stores/theme-store";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";
  const styles = getThemeStyles(isDark);
  return (
    <ScrollView
      className={`flex-1 px-5 pt-10  pb-10
        ${styles.background}`}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View className="mb-6">
        <Text
          className={`text-2xl font-semibold 
            ${styles.text}`}
        >
           VitalPro 
        </Text>
        <Text
          className={`mt-2 text-base 
            ${styles.textMuted}`}
        >
          Bienestar masculino.
        </Text>
      </View>

      <View className="flex-row justify-between gap-3 mb-6">
        <QuickButton
          title="Salud"
          icon="local-hospital"
          dark={isDark}
          style={styles}
        />
        <QuickButton
          title="Hábitos"
          icon="check-circle"
          dark={isDark}
          style={styles}
        />
        <QuickButton
          title="Meditación"
          icon="self-improvement"
          dark={isDark}
          style={styles}
        />
      </View>


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

        <HabitBar label="Agua diaria" progress={70}  style={styles}/>
        <HabitBar label="Ejercicio" progress={40}  style={styles}/>
        <HabitBar label="Meditación" progress={20}  style={styles}/>
      </View>

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


function QuickButton({ title, icon, dark, style }: any) {
  return (
    <TouchableOpacity
      className={`w-24 h-24 rounded-2xl items-center justify-center 
        ${style.card}`}
      activeOpacity={0.7}
    >
      <MaterialIcons
        name={icon}
        size={32}
        color={dark ? "#8AB4F8" : "#1A73E8"}
      />
      <Text className={`mt-2 text-sm ${style.colorSecondary}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

function HabitBar({ label, progress, style }: any) {
  return (
    <View className="mb-4">
      <Text className={`${style.text} mb-1`}>
        {label}
      </Text>

      <View
        className={`h-3 rounded-full 
          ${style.border}`}
      >
        <View
          style={{ width: `${progress}%` }}
          className={`h-3 rounded-full 
            ${style.progress}`}
        />
      </View>
    </View>
  );
} 
