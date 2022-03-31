import Smoothie from "../models/Smoothie"
import Ingredient from "../models/Ingredient"

// ASSUMING BACKEND WILL FORMAT AGGREGATE DATA INTO NEAT JSON OBJECTS
import {smoothies} from '../data/smoothies.json'
import {ingredients} from '../data/ingredients.json'

// GET SMOOTHIE
export async function getSmoothie(name: string): Promise<Smoothie> {
    return smoothies.find((s) => s.name === name) as Smoothie
}

// GET ALL SMOOTHIES
export async function getAllSmoothies(): Promise<Smoothie[]> {
    return smoothies as Smoothie[]
}
// GET INGREDIENT
export async function getIngredient(name: string): Promise<Ingredient> {
    return ingredients.find((i) => i.name === name) as Ingredient
}

// GET ALL INGREDIENTS
export async function getAllIngredients(): Promise<Ingredient[]> {
    return ingredients as Ingredient[]
}
