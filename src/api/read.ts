import Smoothie from "../models/Smoothie"
import Ingredient from "../models/Ingredient"

import {smoothies} from '../data/smoothies.json'
import {ingredients} from '../data/ingredients.json'
// GET SMOOTHIE

// GET ALL SMOOTHIES
export async function getAllSmoothies(): Promise<Smoothie[]> {
    return smoothies as Smoothie[]
}
// GET INGREDIENT

// GET ALL INGREDIENTS
export async function getAllIngredients(): Promise<Ingredient[]> {
    return ingredients as Ingredient[]
}
