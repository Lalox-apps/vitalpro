import { getThemeStyles } from "@/components/Theme";
import { useThemeStore } from "@/stores/theme-store";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

function Card({ children , style}: any) {
 
  return (
    <View className={ `${style.card}`}>
      {children}
    </View>
  );
}

function Option({ label, isLast, href , style}: any) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => href && router.push(href)}
      className={`py-3 ${
        !isLast ? "border-b border-border dark:border-dark-border" : ""
      }`}
    >
      <Text className={`${style.textMuted}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function HealthScreen() {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";
  const styles = getThemeStyles(isDark);
  return (
    <ScrollView
      className={`flex-1 px-4 pt-6 ${
      styles.background
      }`}
    >
   
      <Text className={`text-2xl font-semibold mb-6 ${styles.text}`}>
        Salud & Bienestar
      </Text>
      
      <Card  style={styles}>
        <Text className={`text-lg font-semibold mb-2 ${styles.text}`}>
          Actividad física
        </Text>

        <Option label="Registrar entrenamiento"  href="/health/exercises/add" style={styles}/>
        <Option label="Mis rutinas"  href="/health/exercises"  style={styles}/>
        <Option label="Progreso" isLast  style={styles}/>
      </Card>

      <Card style={styles}>
        <Text className={`text-lg font-semibold mb-2 ${styles.text}`}>
          Alimentación
        </Text>

        <Option label="Plan de comidas" href="/health/recipes" style={styles}/>
        <Option label="Hidratación" style={styles} />
        <Option label="Calorías diarias" isLast  style={styles}/>
      </Card>

     
      <Card style={styles}>
        <Text className= {`text-lg font-semibold mb-2 ${styles.text}`}>
          Sueño & Recuperación
        </Text>

        <Option label="Registrar horas de sueño" style={styles}/>
        <Option label="Consejos de recuperación" isLast  style={styles}/>
      </Card>
    </ScrollView>
  );
}
