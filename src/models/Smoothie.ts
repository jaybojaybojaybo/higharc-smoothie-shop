import Ingredient from "./Ingredient";

export default interface Smoothie extends Object{
    name: string,
    ingredients: Array<Ingredient>
}