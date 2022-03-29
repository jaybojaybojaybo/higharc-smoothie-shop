<template>
    <div class="p-5">
        <h1 class="font-bold">{{ smoothieData.name }}</h1>
        <h2>Ingredients:</h2>
        <li v-for="(ingredient, index) in smoothieData.ingredients">
            {{ ingredient.name }}
            {{ ingredient.type }}
        </li>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, toRef } from "vue";

import Smoothie from '../models/Smoothie'
import Ingredient from '../models/Ingredient'
import { getAllIngredients } from '../api/read'

export default defineComponent({
    props: {
        smoothie: {
            type: Object as PropType<Smoothie>,
            required: true,
        }
    },
    setup(props) {
        const smoothieData = toRef(props, 'smoothie').value
        let ingredientOptions = ref<Ingredient[]>()
        onMounted(async() => {
            console.log('cards are mounted')
            ingredientOptions.value = await getAllIngredients() as Ingredient[]
        })
        return {
            smoothieData,
            ingredientOptions
        }
    }
})

</script>