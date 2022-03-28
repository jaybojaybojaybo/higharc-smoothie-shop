<template>
    <p class="bg-blue-600 text-white">The list of smoothies</p>
    <p v-for="(smoothie, index) in smoothies">{{ smoothie.name }}</p>
</template>

<script lang="ts">
import { onMounted, ref } from "vue"
import { Smoothie } from "../models/Smoothie"

import {getAllSmoothies} from '../api/read'

export default {
    setup() {
        let smoothies = ref<Smoothie[]>()
        onMounted(async () => {
            console.log('hey what')
            smoothies.value = await getAllSmoothies() as Smoothie[]
        })
        return {
            smoothies
        }
    }
}
</script>