<template>
    <p class="bg-blue-600 text-white">The list of smoothies</p>
    <SmoothieCard v-for="(smoothie, index) of smoothiesList" :key="index" :smoothie="smoothie"></SmoothieCard>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"

import Smoothie from "../models/Smoothie"
import SmoothieCard from "./SmoothieCard.vue"
import { getAllSmoothies } from '../api/read'

export default defineComponent({
    components: {
        SmoothieCard
    },
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