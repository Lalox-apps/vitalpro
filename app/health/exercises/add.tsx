import { useThemeStore } from "@/stores/theme-store";
import { useExerciseStore } from "@/stores/useExerciseStore";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RegisterExercise() {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const { addExercise } = useExerciseStore();

  const [type, setType] = useState("");
  const [minutes, setMinutes] = useState("");
  const [intensity, setIntensity] = useState("");

  const handleSave = async () => {
    if (!type.trim() || !minutes.trim()) {
      Alert.alert("Campos incompletos", "Ingresa el tipo y duración del ejercicio.");
      return;
    }

    const duration = parseInt(minutes);

    await addExercise({
      type,
      duration,
      intensity: intensity || "normal",
      date: new Date().toISOString(),
    });

    Alert.alert("Guardado", "Tu actividad física ha sido registrada.");
    setType("");
    setMinutes("");
    setIntensity("");
  };

  return (
    <View
      className={`flex-1 px-4 py-6 ${
        isDark ? "bg-dark-background" : "bg-background"
      }`}
    >
      <Text
        className={`text-2xl font-bold mb-6 ${
          isDark ? "text-dark-foreground" : "text-foreground"
        }`}
      >
        Registrar Actividad Física
      </Text>

      {/* Tipo */}
      <Text
        className={`mb-2 ${
          isDark ? "text-dark-muted" : "text-muted"
        }`}
      >
        Tipo de ejercicio
      </Text>
      <TextInput
        value={type}
        onChangeText={setType}
        placeholder="Ej: Natación, caminata, gimnasio..."
        placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
        className={`w-full px-3  py-4 rounded-xl mb-4 ${
          isDark ? "bg-dark-card text-dark-foreground" : "bg-card text-foreground"
        }`}
      />

      {/* Minutos */}
      <Text
        className={`mb-2 ${
          isDark ? "text-dark-muted" : "text-muted"
        }`}
      >
        Duración (minutos)
      </Text>
      <TextInput
        value={minutes}
        onChangeText={setMinutes}
        placeholder="Ej: 45"
        keyboardType="numeric"
        placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
        className={`w-full px-3  py-4 rounded-xl mb-4 ${
          isDark ? "bg-dark-card text-dark-foreground" : "bg-card text-foreground"
        }`}
      />

    
      <Text
        className={`mb-2 ${
          isDark ? "text-dark-muted" : "text-muted"
        }`}
      >
        Intensidad
      </Text>
      <TextInput
        value={intensity}
        onChangeText={setIntensity}
        placeholder="Baja, normal o alta"
        placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
        className={`w-full px-3 rounded-xl  py-4 mb-6 ${
          isDark ? "bg-dark-card text-dark-foreground" : "bg-card text-foreground"
        }`}
      />

      {/* Botón guardar */}
      <TouchableOpacity
        onPress={handleSave}
        className="bg-primary dark:bg-dark-primary p-4 rounded-xl"
      >
        <Text className="text-center text-white font-semibold text-base">
          Guardar actividad
        </Text>
      </TouchableOpacity>
    </View>
  );
}
