import { getRecipes } from '@/services/recipes.services';
import { Recipe } from '@/types/recipe';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function RecipesScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    getRecipes().then(setRecipes);
  }, []);

  return (
    <View>
      {recipes.map(recipe => (
        <Text key={recipe.id}>{recipe.title}</Text>
      ))}
    </View>
  );
}
