import { Pressable, ScrollView, Text, View } from 'react-native';

export type MealType = 'desayuno' | 'comida' | 'cena' | 'snack';

interface Props {
  value: MealType | 'all';
  onChange: (value: MealType | 'all') => void;
  isDark: boolean;
}

const OPTIONS: { label: string; value: MealType | 'all'; emoji: string }[] = [
  { label: 'Todo', value: 'all', emoji: '🍽️' },
  { label: 'Desayuno', value: 'desayuno', emoji: '☀️' },
  { label: 'Comida', value: 'comida', emoji: '🥗' },
  { label: 'Cena', value: 'cena', emoji: '🌙' },
  { label: 'Snack', value: 'snack', emoji: '🍎' },
];

export function MealTypeFilter({ value, onChange, isDark }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      className="mb-4"
    >
      <View className="flex-row">
        {OPTIONS.map((opt) => {
          const active = value === opt.value;

          return (
            <Pressable
              key={opt.value}
              onPress={() => onChange(opt.value)}
              className={`mr-3 px-4 py-2 rounded-full flex-row items-center ${
                active
                  ? 'bg-primary'
                  : isDark
                  ? 'bg-dark-background'
                  : 'bg-background'
              }`}
              style={({ pressed }) => [
                pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] },
              ]}
            >
              <Text
                className={`mr-1 ${
                  active
                    ? 'text-white'
                    : isDark
                    ? 'text-dark-foreground'
                    : 'text-foreground'
                }`}
              >
                {opt.emoji}
              </Text>
              <Text
                className={`text-sm font-medium ${
                  active
                    ? 'text-white'
                    : isDark
                    ? 'text-dark-foreground'
                    : 'text-foreground'
                }`}
              >
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
