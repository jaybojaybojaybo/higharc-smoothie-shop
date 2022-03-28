import { Smoothie } from "../models/Smoothie"
import { Ingredient } from "../models/Ingredient"

import {smoothies} from '../data/smoothies.json'
// GET SMOOTHIE

// GET ALL SMOOTHIES
export async function getAllSmoothies(): Promise<Smoothie[]> {
    return smoothies as Smoothie[]
}
// GET INGREDIENT

// GET ALL INGREDIENTS
