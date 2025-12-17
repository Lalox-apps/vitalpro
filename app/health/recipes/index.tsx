import { RecipeSkeleton } from "@/components/RecipeSkeleton";
import { supabase } from "@/libs/supabase";
import { useThemeStore } from "@/stores/theme-store";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";

export type Recipe = {
  id: string;
  title: string;
  description?: string;
  meal_type: string;
  prep_time?: number;
  image_url?: string;
};
type BadgeVariant = "meal" | "time";
export default function RecipesScreen() {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading]=useState(true)

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("recipes")
        .select("id, title, description, meal_type, prep_time, image_url");
      console.log(data);
      setRecipes(data ?? []);
    };

    fetchRecipes();
    setLoading(false);
  }, []);

  return (
    <View
      className={`flex-1 py-6 ${
        isDark ? "bg-dark-background" : "bg-background"
      }`}
    >
      <Text
        className={`text-2xl mx-6 font-bold mb-6 ${
          isDark ? "text-dark-foreground" : "text-foreground"
        }`}
      >
        Plan de Alimentación
      </Text>

    { loading ?(
       <FlatList
        data={[1, 2, 3]}
        keyExtractor={(item) => item.toString()}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={() => <RecipeSkeleton isDark={isDark} />}
      />
      ) :<FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <RecipeCard recipe={item} isDark={isDark} />}
      /> }
    </View>
  );
}

function RecipeCard({ recipe, isDark }: { recipe: Recipe; isDark: boolean }) {
  return (
    <Pressable className="mb-6 rounded-2xl overflow-hidden">
      <View
        style={{
          backgroundColor: isDark ? "#151520" : "#FFFFFF",
          borderRadius: 20,
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        {recipe.image_url && (
          <Image
            source={{ uri: recipe?.image_url }}
            style={{ width: "100%", height: 160 }}
          />
        )}

        <LinearGradient
          colors={
            isDark
              ? ["transparent", "rgba(0,0,0,0.7)"]
              : ["transparent", "rgba(0,0,0,0.5)"]
          }
          style={{
            position: "absolute",
            bottom: recipe.image_url ? 0 : undefined,
            height: recipe.image_url ? 80 : 0,
            width: "100%",
          }}
        />

        <View className="p-6">
          <Text
            className={`text-lg  font-semibold ${
              isDark ? "text-dark-foreground" : "text-foreground"
            }`}
          >
            {recipe.title.trim()}
          </Text>

          {recipe.description && (
            <Text
              numberOfLines={2}
              className={`text-sm opacity-80 mt-2 ${
                isDark ? "text-muted" : "text-dark-muted"
              }`}
            >
              {recipe.description}
            </Text>
          )}

          <View className="flex-row mt-2 items-center">
            <Badge label={recipe.meal_type} isDark={isDark} variant="meal" />
            {recipe.prep_time && (
              <Badge
                label={`${recipe.prep_time} min`}
                isDark={isDark}
                variant="time"
              />
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

function Badge({
  label,
  isDark,
  variant,
}: {
  label: string;
  isDark: boolean;
  variant: BadgeVariant;
}) {
  const variants = {
    meal: "bg-green-100 text-green-700",
    time: "bg-gray-200 text-gray-700",
  };
  return (
    <View
      className={` py-2 px-2 rounded-xl mr-8 ${variants[variant]}  ${
        isDark ? "bg-dark-card" : "bg-card"
      }`}
    >
      <Text
        className={`text-sm  ${
          isDark ? "text-dark-foreground" : "text-foreground"
        }`}
      >
        {label.trim()}
      </Text>
    </View>
  );
}
