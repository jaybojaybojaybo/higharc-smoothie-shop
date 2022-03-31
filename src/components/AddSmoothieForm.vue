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

        async function addFormInit() {
            // GET INGREDIENT OPTIONS
            ingredientOptions.value = await getAllIngredients() as Ingredient[]
            let ingredientsContent = ref("")
            // CREATE INGREDIENT FORM INPUTS
            for (let iO of ingredientOptions.value) {
                let ingredientCheckboxString = String.raw
                    `<div class="w-full px-3">
                        <input  id="${iO.name}"
                                type="checkbox" 
                                class="form-checkbox h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 transition duration-200 mt-1 bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                        >
                        <span for="${iO.name}" class="form-label inline-block ml-2">${iO.name}</span>
                    </div>`
                ingredientsContent.value += ingredientCheckboxString
            }
            // CREATE FORM
            contentString.value = 
                `<h1 class="text-2xl font-bold text-white">New Smoothie</h1>
                <div class="justify-center flex text-white">
                    <form class="max-w-xs" id="smoothie-form">
                        <label class="items-center my-2">
                            <span for="name" class="text-white font-semibold">Smoothie Name: </span>
                            <input type="text" class="mt-1 block w-md text-black text-center px-5" id="name">
                        </label>
                        <span class="text-white font-semibold">Ingredients:</span>
                        <label class="items-center">` +
                            ingredientsContent.value
                        + `</label>
                        <button type="button"
                                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 my-2 rounded-l"
                        >
                            Add New Smoothie
                        </button>
                    </form>
                </div>`
            // PREP FORM FOR CSS3D
            const smoothieContent = new DOMParser().parseFromString(
                contentString.value,
                "text/html"
            );
            smoothieContent.body.style.background = new Color(0x000000).getStyle();
            // CREATE CSS3D
            css.value = new CSS3DSprite(smoothieContent.body);
            css.value.position.copy(new Vector3(x, y, z));
            const scaleFactor = .007
            css.value.scale.set(scaleFactor, scaleFactor, scaleFactor);
            // LISTENERS
            css.value.element.addEventListener('mousedown', handleClick, true)
            // ADD TO SCENE
            css3dScene.add(css.value);
        }

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
            }
        )

        onMounted(async() => {            
            addFormInit()
        })

        onUnmounted(() => {
            css.value.parent?.remove(css.value)
            css.value.element.removeEventListener('click', handleClick)
        });

        function handleClick(event: Event) {
            console.log('handling click in readoutdisplay: ', event.target)            
            event.preventDefault()
            if ((event.target as HTMLInputElement).type === 'checkbox') {
                event.stopImmediatePropagation()
                document.getElementById(event.target.id)?.toggleAttribute('checked')
            } else if ((event.target as HTMLInputElement).type === 'text') {
                event.stopImmediatePropagation()
                document.getElementById(event.target.id)?.focus()
            } else if ((event.target as HTMLInputElement).type === 'button') {
                event.stopImmediatePropagation()
                createSmoothie()
                resetForm()
            } 
        }

        let createSmoothie = () => {
            // blank Smoothie object
            const formData = {
                name: "",
                ingredients: []
            } as Smoothie
            // data from form
            formData.name = (document.getElementById('name') as HTMLInputElement).value
            if (ingredientOptions.value) {
                for (let iO of ingredientOptions.value) {
                    let element = document.getElementById(iO.name) as HTMLInputElement
                    if (element.checked) {
                        formData.ingredients.push(iO)
                    }
                }
            }

            // Add to sessionSmoothieList
            const form = ref(document.getElementById('smoothie-form') as HTMLFormElement)
            form.value.reset()
            emit('addSmoothie', formData)
        }

        let resetForm = () => {
            for (let i0 of ingredientOptions.value) {
                (document.getElementById(i0.name) as HTMLInputElement).checked = false
            }
        }

        return {
            handleClick,
            addFormInit,
            detailsFormInit
        }
    },
});
</script>
