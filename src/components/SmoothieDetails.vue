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
          required: false,
        },
    },
    emits: ['addSmoothie', 'deleteSmoothie'],
    setup(props, { emit }) {
        const currentSmoothie = toRef(props, 'smoothie')
        const css3dScene = inject("css3dScene") as Scene;
        const ingredientOptions = ref([] as Ingredient[])
        const contentString = ref("")
        const css = ref({} as CSS3DSprite)
        const x = -2.7
        const y = 0
        const z = 1

        async function detailsFormInit() {
            let ingredientsContent = ref("")
            for (let iO of (currentSmoothie.value as Smoothie).ingredients) {
                let ingredientNameHtml = String.raw
                    `<div class="w-full px-3">                        
                        <span class="form-label inline-block ml-2">${iO.name}</span>
                    </div>`
                ingredientsContent.value += ingredientNameHtml
            }
            // CREATE DETAILS HTML
            contentString.value = 
                `<h1 class="text-2xl font-bold text-white">${currentSmoothie.value?.name}</h1>
                <div class="justify-center flex text-white">` +
                    ingredientsContent.value
                + `</div>`
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
                console.log('smoothie update in Readout!')
                emit('closeSelectedSmoothie')
            }
        )

        onMounted(async() => {            
            detailsFormInit()
        })

        onUnmounted(() => {
            css.value.parent?.remove(css.value)
            css.value.element.removeEventListener('click', handleClick)
        });

        function handleClick(event: Event) {
            console.log('handling click in readoutdisplay: ', event.target)            
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
