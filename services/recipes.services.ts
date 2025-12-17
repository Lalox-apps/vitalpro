import { supabase } from '@/libs/supabase';
import { Recipe } from '@/types/recipe';

export const getRecipes = async (): Promise<Recipe[]> => {
const { data, error }  = await supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
  
  return data as Recipe[] ;
};
