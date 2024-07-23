export interface Recette {
    id: number;
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    prepTime: number;
    servings: number;
    createdAt: string;
    updatedAt: string;
    signature: string;
    category: string;
    img: string;
}