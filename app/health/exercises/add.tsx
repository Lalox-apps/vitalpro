import { useThemeStore } from "@/stores/theme-store";
import { useExerciseStore } from "@/stores/useExerciseStore";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActionSheetIOS,
  Alert,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterExercise() {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";
  const { exerciseId } = useLocalSearchParams();
  const isEditing = Boolean(exerciseId);
  const { addExercise, exercises, upDateExercise } = useExerciseStore();
  const [type, setType] = useState("");
  const [minutes, setMinutes] = useState("");
  const [intensity, setIntensity] = useState("");

  useEffect(() => {
    if (isEditing) {
      const editExercise = exercises.find(
        (exe) => exe.id === Number(exerciseId)
      );
      if (editExercise) {
        setType(editExercise.type);
        setMinutes(editExercise.duration.toString());
        setIntensity(editExercise.intensity);
      }
    }
  }, []);

  const handleExerciseChange = (itemValue: number | null) => {};
  const handleSave = async () => {
    if (!type.trim() || !minutes.trim()) {
      Alert.alert(
        "Campos incompletos",
        "Ingresa el tipo y duración del ejercicio."
      );
      return;
    }

    const duration = parseInt(minutes);
    if (isEditing) {
      await upDateExercise(
        Number(exerciseId),
        type,
        duration,
        intensity || "normal"
      );
      Alert.alert("Actualizado", "Tu actividad física ha sido actualizada.");
    } else {
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
    }
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
        {isEditing ? "Editar " : "Registar"} Actividad Física
      </Text>

      {/* Tipo */}
      <Text className={`mb-2 ${isDark ? "text-dark-muted" : "text-muted"}`}>
        Tipo de ejercicio
      </Text>
      <TextInput
        value={type}
        onChangeText={setType}
        placeholder="Ej: Natación, caminata, gimnasio..."
        placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
        className={`w-full px-3  py-4 rounded-xl mb-4 ${
          isDark
            ? "bg-dark-card text-dark-foreground"
            : "bg-card text-foreground"
        }`}
      />

      {/* Minutos */}
      <Text className={`mb-2 ${isDark ? "text-dark-muted" : "text-muted"}`}>
        Duración (minutos)
      </Text>
      <TextInput
        value={minutes}
        onChangeText={setMinutes}
        placeholder="Ej: 45"
        keyboardType="numeric"
        placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
        className={`w-full px-3  py-4 rounded-xl mb-4 ${
          isDark
            ? "bg-dark-card text-dark-foreground"
            : "bg-card text-foreground"
        }`}
      />

      {/* <Text
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
      /> */}

      <Text className={`mb-2 ${isDark ? "text-dark-muted" : "text-muted"}`}>
        Intensidad
      </Text>

      <Pressable
        onPress={() => {
          if (Platform.OS === "ios") {
            ActionSheetIOS.showActionSheetWithOptions(
              {
                options: ["Cancelar", "Baja", "Normal", "Alta"],
                cancelButtonIndex: 0,
                userInterfaceStyle: isDark ? "dark" : "light",
              },
              (buttonIndex) => {
                if (buttonIndex === 1) setIntensity("baja");
                if (buttonIndex === 2) setIntensity("normal");
                if (buttonIndex === 3) setIntensity("alta");
              }
            );
          }
        }}
        className={`w-full px-3 py-4 rounded-xl mb-6 ${
          isDark ? "bg-dark-card" : "bg-card"
        }`}
      >
        <Text className={isDark ? "text-dark-foreground" : "text-foreground"}>
          {intensity
            ? intensity.charAt(0).toUpperCase() + intensity.slice(1)
            : "Selecciona intensidad"}
        </Text>
      </Pressable>

      {Platform.OS === "android" && (
        <View
          className={`w-full px-3 py-1 rounded-xl mb-8 ${
            isDark ? "bg-dark-card" : "bg-card"
          }`}
          style={{ height: 52, justifyContent: "center" }}
        >
          <Picker
            selectedValue={intensity}
            onValueChange={(itemValue) => setIntensity(itemValue)}
            dropdownIconColor={isDark ? "#fff" : "#000"}
            style={{
              color: isDark ? "#fff" : "#000",
              backgroundColor: "transparent",
              width: "100%",
              height: "100%",
            }}
          >
            <Picker.Item label="Baja" value="baja" />
            <Picker.Item label="Normal" value="normal" />
            <Picker.Item label="Alta" value="alta" />
          </Picker>
        </View>
      )}

      <TouchableOpacity
        onPress={handleSave}
        className="bg-primary dark:bg-dark-primary p-4 rounded-xl"
      >
        <Text className="text-center text-white font-semibold text-base">
          {isEditing ? "Actualizar" : "Guadar"} actividad
        </Text>
      </TouchableOpacity>
    </View>
  );
}
