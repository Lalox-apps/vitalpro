import { useThemeStore } from "@/stores/theme-store";
import { ScrollView, Text, View } from "react-native";

function Card({ children }: any) {
  return (
    <View className="bg-card dark:bg-dark-card p-4 rounded-2xl mb-4">
      {children}
    </View>
  );
}

function Option({ label, isLast }: any) {
  return (
    <View
      className={`py-3 ${
        !isLast ? "border-b border-border dark:border-dark-border" : ""
      }`}
    >
      <Text className="text-foreground dark:text-dark-foreground">
        {label}
      </Text>
    </View>
  );
}

export default function HealthScreen() {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <ScrollView
      className={`flex-1 px-4 pt-6 ${
        isDark ? "bg-dark-background" : "bg-background"
      }`}
    >
      {/* Título */}
      <Text className="text-2xl font-semibold mb-6 text-foreground dark:text-dark-foreground">
        Salud & Bienestar
      </Text>

      {/* Card 1 */}
      <Card>
        <Text className="text-lg font-semibold mb-2 text-foreground dark:text-dark-foreground">
          Actividad física
        </Text>

        <Option label="Registrar entrenamiento" />
        <Option label="Mis rutinas" />
        <Option label="Progreso" isLast />
      </Card>

      {/* Card 2 */}
      <Card>
        <Text className="text-lg font-semibold mb-2 text-foreground dark:text-dark-foreground">
          Alimentación
        </Text>

        <Option label="Plan de comidas" />
        <Option label="Hidratación" />
        <Option label="Calorías diarias" isLast />
      </Card>

      {/* Card 3 */}
      <Card>
        <Text className="text-lg font-semibold mb-2 text-foreground dark:text-dark-foreground">
          Sueño & Recuperación
        </Text>

        <Option label="Registrar horas de sueño" />
        <Option label="Consejos de recuperación" isLast />
      </Card>
    </ScrollView>
  );
}
