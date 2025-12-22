import { supabase } from '@/libs/supabase';
import { useFavoritesStore } from '@/stores/favorites-store';
import { useThemeStore } from '@/stores/theme-store';
import { Recipe } from '@/types/recipe';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

export type Ingredient = {
  name: string;
  quantity: string;
};

export default function RecipeDetailScreen() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const [recipe , setRecipe]= useState<Recipe>()
  const { id } = useLocalSearchParams<{ id: string }>();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(id);

     useEffect(() => {
      supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single()
    .then(({ data }) => setRecipe(data));
}, [id]);
   
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className={isDark ? 'bg-dark-background' : 'bg-background'}
    >
      {recipe?.image_url && (
        <View className='relative'>
          <Image
            source={{ uri: recipe?.image_url }}
            className='w-full h-64'
            resizeMode='cover'
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.6)']}
            className='absolute bottom-0 w-full h-24'
          />
        </View>
      )}

      <View className='px-6 py-6'>
      
        <View className='flex-row justify-between items-start'>
          <Text
            className={`text-2xl font-bold flex-1 ${
              isDark ? 'text-dark-foreground' : 'text-foreground'
            }`}
          >
            {recipe?.title}
          </Text>

          <Pressable 
           onPress={()=> toggleFavorite(id)}
           className='ml-4'>
            <Ionicons
              name={favorite ? 'heart' : 'heart-outline'}
              size={26}
              color={favorite ? '#EF4444' : isDark ? '#fff' : '#000'}
            />
          </Pressable>
        </View>

        <View className='flex-row mt-3'>
          <Badge label={recipe?.meal_type} isDark={isDark} />
          <Badge label={`${recipe?.prep_time} min`} isDark={isDark} />
        </View>

        <Text
          className={`mt-4 text-base leading-6 ${
            isDark ? 'text-muted' : 'text-dark-muted'
          }`}
        >
          {recipe?.description}
        </Text>
        <Section title='Ingredientes' isDark={isDark}>
          {recipe?.ingredients.map((item, index) => (
            <View key={index} className='flex-row justify-between py-2'>
              <Text className={isDark ? 'text-dark-foreground' : 'text-foreground'}>
                • {item.name}
              </Text>
              <Text className={isDark ? 'text-muted' : 'text-dark-muted'}>
                {item.quantity}
              </Text>
            </View>
          ))}
        </Section>
        <Section title='Preparación' isDark={isDark}>
          {recipe?.instructions.map((step, index) => (
            <View key={index} className='flex-row py-2'>
              <Text className='mr-3 font-bold text-primary'>{index + 1}.</Text>
              <Text
                className={`flex-1 ${
                  isDark ? 'text-dark-foreground' : 'text-foreground'
                }`}
              >
                {step}
              </Text>
            </View>
          ))}
        </Section>
        <View className='mt-6 rounded-2xl p-4 bg-green-100/20'>
          <Text className='text-base font-semibold text-green-500 mb-2'>
            Beneficios para la próstata
          </Text>
          <Text className={isDark ? 'text-muted' : 'text-dark-muted'}>
            {recipe?.benefits}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

function Section({
  title,
  isDark,
  children
}: {
  title: string;
  isDark: boolean;
  children: React.ReactNode;
}) {
  return (
    <View className='mt-6'>
      <Text
        className={`text-xl font-semibold mb-3 ${
          isDark ? 'text-dark-foreground' : 'text-foreground'
        }`}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

function Badge({ label, isDark }: { label: string; isDark: boolean }) {
  return (
    <View
      className={`mr-3 px-3 py-1 rounded-xl ${
        isDark ? 'bg-dark-background' : 'bg-gray-200'
      }`}
    >
      <Text className={isDark ? 'text-dark-foreground' : 'text-foreground'}>
        {label}
      </Text>
    </View>
  );
}
