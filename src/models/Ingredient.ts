import {IngredientType} from './IngredientType'

export default interface Ingredient extends Object{
    id: number,
    name: string,
    type: IngredientType
}