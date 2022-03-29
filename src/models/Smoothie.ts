import Ingredient from "./Ingredient";

export default interface Smoothie extends Object{
    id: number,
    name: string,
    ingredients: Array<Ingredient>
}