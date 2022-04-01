<template></template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted, PropType, toRef, ref, watch } from "vue";

import { Scene, Vector3, Event, Color, Object3D } from "three"; //Removed Color
import { CSS3DSprite } from "three/examples/jsm/renderers/CSS3DRenderer";

import Smoothie from "../models/Smoothie";
import Ingredient from "../models/Ingredient";
import ingredients from '../data/ingredients.json'
import { getAllIngredients } from "../api/read";

export default defineComponent({
    props: {
        smoothie: {
          type: Object as PropType<Smoothie>,
          required: true,
        },
    },
    emits: ['closeSelectedSmoothie', 'deleteSmoothie'],
    setup(props, { emit }) {
        const currentSmoothie = toRef(props, 'smoothie')
        const css3dScene = inject("css3dScene") as Scene;
        const ingredientOptions = ref([] as Ingredient[])
        const contentString = ref("")
        const css = ref({} as CSS3DSprite)
        const x = -2.7
        const y = 0
        const z = 1

        async function detailsFormInit(smoothie: Smoothie) {
            console.log('7')
            let ingredientsContent = ref("")
            for (let iO of (smoothie as Smoothie).ingredients) {
                let ingredientNameHtml = String.raw
                    `<div class="w-full px-3">                        
                        <span class="form-label ml-2">${iO.name}</span>
                    </div>`
                ingredientsContent.value += ingredientNameHtml
            }
            // CREATE DETAILS HTML
            contentString.value = 
                `<h1 class="text-2xl font-bold text-smoothie-blue">Name: <span class="text-white">${smoothie.name}</span></h1>
                <div class="justify-center flex text-white">
                    <h2 class="text-lg font-semibold text-smoothie-blue block">Ingredients: </h2>` +
                    ingredientsContent.value
                + `</div>
                <button type="button"
                        class="bg-gray-300 hover:bg-red-600 text-gray-800 hover:text-white font-bold py-2 px-4 my-2 rounded-l">
                    DELETE SMOOTHIE
                </button>`
            // PREP FORM FOR CSS3D
            const currentSmoothieContent = new DOMParser().parseFromString(
                contentString.value,
                "text/html"
            );
            currentSmoothieContent.body.style.background = new Color(0x000000).getStyle();
            // CREATE CSS3D
            css.value = new CSS3DSprite(currentSmoothieContent.body);
            css.value.position.copy(new Vector3(x, y, z));
            const scaleFactor = .007
            css.value.scale.set(scaleFactor, scaleFactor, scaleFactor);
            // LISTENERS
            css.value.element.addEventListener('mousedown', handleClick, true)
            // ADD TO SCENE
            css3dScene.add(css.value);
        }

        watch(
            () => (currentSmoothie.value as Smoothie), 
            (newValue: Smoothie) => {
                // emit('closeSelectedSmoothie', false)
                detailsFormInit(newValue)
            }
        )

        onMounted(async() => {            
            detailsFormInit(currentSmoothie.value)
        })

        onUnmounted(() => {
            console.log('Details unmounting')
            css.value.parent?.remove(css.value)
            css.value.element.removeEventListener('click', handleClick)
        });

        function handleClick(event: Event) {
            console.log('handling click in details display: ', event.target)            
            event.preventDefault()
            if ((event.target as HTMLInputElement).type === 'button') {
                event.stopImmediatePropagation()
                emit('deleteSmoothie', currentSmoothie.value)
            } 
        }

        return {
            handleClick,
            detailsFormInit
        }
    },
});
</script>
