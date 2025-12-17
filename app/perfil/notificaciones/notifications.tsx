import { useThemeStore } from "@/stores/theme-store";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Pressable, Switch, Text, TouchableOpacity, View } from "react-native";

export default function ReminderSettings() {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const [isEnabled, setIsEnabled] = useState(true);
  const [showPicker, setShowPicker] = useState(false);
  const [time, setTime] = useState(new Date());

  const toggleSwitch = () => setIsEnabled(!isEnabled);

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") setShowPicker(false);
    if (selectedDate) setTime(selectedDate);
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
        Recordatorios
      </Text>

      {/* Switch */}
      <View
        className={`flex-row items-center justify-between px-4 py-4 rounded-xl mb-6 ${
          isDark ? "bg-dark-card" : "bg-card"
        }`}
      >
        <Text className={isDark ? "text-dark-foreground" : "text-foreground"}>
          Activar recordatorios
        </Text>

        <Switch
          value={isEnabled}
          onValueChange={toggleSwitch}
          trackColor={{ false: "#9CA3AF", true: "#4ade80" }}
          thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
        />
      </View>

      {/* Selector de hora */}
      <Text className={`mb-2 ${isDark ? "text-dark-muted" : "text-muted"}`}>
        Hora del recordatorio
      </Text>

      <Pressable
        disabled={!isEnabled}
        onPress={() => setShowPicker(true)}
        className={`w-full px-3 py-4 rounded-xl mb-6 ${
          isDark ? "bg-dark-card" : "bg-card"
        } ${!isEnabled && "opacity-40"}`}
      >
        <Text className={isDark ? "text-dark-foreground" : "text-foreground"}>
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
      </Pressable>

      {/* Time Picker Modal */}
      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleTimeChange}
        />
      )}

      {/* Botón Guardar */}
      <TouchableOpacity
        disabled={!isEnabled}
        className={`bg-primary dark:bg-dark-primary p-4 rounded-xl ${
          !isEnabled && "opacity-40"
        }`}
      >
        <Text className="text-center text-white font-semibold text-base">
          Guardar recordatorio
        </Text>
      </TouchableOpacity>
    </View>
  );
}
