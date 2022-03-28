<template>
    <p class="bg-blue-600 text-white">The list of smoothies</p>
    <p v-for="(smoothie, index) of smoothiesList" :key="index">{{ smoothie.name }}</p>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import { Smoothie } from "../models/Smoothie"

import { getAllSmoothies } from '../api/read'

export default defineComponent({
    setup() {
        let smoothiesList = ref<Smoothie[]>()
        onMounted(async () => {
            console.log('hey what')
            smoothiesList.value = await getAllSmoothies() as Smoothie[]
        })
        return {
            smoothiesList
        }
    }
})
</script>