import Smoothie from "../models/Smoothie"
import Ingredient from "../models/Ingredient"

import {smoothies} from '../data/smoothies.json'
import {ingredients} from '../data/ingredients.json'

// GET SMOOTHIE
export async function getSmoothie(id: number): Promise<Smoothie> {
    return smoothies.find((s) => s.id === id) as Smoothie
}

// GET ALL SMOOTHIES
export async function getAllSmoothies(): Promise<Smoothie[]> {
    return smoothies as Smoothie[]
}
// GET INGREDIENT
export async function getIngredient(id: number): Promise<Ingredient> {
    return ingredients.find((i) => i.id === id) as Ingredient
}

// GET ALL INGREDIENTS
export async function getAllIngredients(): Promise<Ingredient[]> {
    return ingredients as Ingredient[]
}
