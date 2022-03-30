import {IngredientType} from './IngredientType'

export default interface Ingredient extends Object{
    name: string,
    type: IngredientType
}