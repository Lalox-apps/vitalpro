export type Ingredient = {
    name: string;
    quantity: string;
  };
  
  export type Recipe = {
    id: string;
    title: string;
    description?: string;
    ingredients: Ingredient[];
    instructions: string[];
    health_focus?: string;
    benefits?: string;
    meal_type: 'desayuno' | 'comida' | 'cena' | 'snack';
    prep_time?: number;
    image_url?: string;
    isFavorite: boolean;
    created_at: string;
    updated_at?: string;
  };
  