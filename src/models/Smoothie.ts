import { Ingredient } from "./Ingredient";

export interface Smoothie {
    id: number,
    name: string,
    ingredients: Array<Ingredient>
}