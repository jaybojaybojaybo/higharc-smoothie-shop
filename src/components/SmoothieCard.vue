<template></template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted, onUpdated, PropType, ref, toRef } from "vue";

import { Object3D, Vector3, Mesh, DoubleSide, Color, Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { CSS3DSprite } from "three/examples/jsm/renderers/CSS3DRenderer";

import Smoothie from '../models/Smoothie'

export default defineComponent({
    props: {
        smoothie: {
            type: Object as PropType<Smoothie>,
            required: true,
        },
        coord: {
            type: Object as PropType<Vector3>,
            required: true,
        },
        index: {
            type: Number,
            required: false
        }
    },
    setup(props) {
        const smoothieData = toRef(props, 'smoothie')
        const smoothiePoint = toRef(props, 'coord')
        const smoothieIndex = toRef(props, 'index')

        const parentScene = inject('webGlScene') as Object3D
        const css3dScene = inject('css3dScene') as Object3D

        function loadModels() {
            // console.log('loadModels: ', smoothieData)
            const loader = new GLTFLoader()
            loader.load('./Smoothie.glb', (gltf) => {
                let group = gltf.scene
                group.traverse((child) => {
                    if (child instanceof Mesh) {
                        child.name = smoothieData.value.name
                        child.material.side = DoubleSide
                    }
                })
                group.name = (smoothieIndex.value as Number).toString()
                group.scale.set(.2 ,.2, .2)
                group.position.copy(smoothiePoint.value)
                parentScene.add(group)
                // ADD CSS3DSPRITE TO CSS3DSCENE FOR EACH SMOOTHIE AT SMOOTHIE'S COORDS
                let smoothieHeaderString = 
                    `<h1 class="text-2xl font-bold text-white p-1">${smoothieData.value.name}</h1>`
                // PREP FORM FOR CSS3D
                const smoothieLabel = new DOMParser().parseFromString(
                    smoothieHeaderString,
                    "text/html"
                );
                smoothieLabel.body.style.background = new Color(0x00bae9).getStyle();
                // smoothieLabel.body.style.opacity = "0.25"
                // CREATE CSS3D
                let css = new CSS3DSprite(smoothieLabel.body);
                // let smoothieMeshPosition = (smoothieMesh.position as Vector3)
                css.name = 'smoothie_' + smoothieData.value.name
                css.position.copy(smoothiePoint.value);
                css.position.y -= .2
                const cssScaleFactor = .007
                css.scale.set(cssScaleFactor, cssScaleFactor, cssScaleFactor);
                css.updateMatrix()
                // ADD TO SCENE
                css3dScene.add(css);
            })
        }
        
        onMounted(async() => {
            console.log('CARD: mounting')
            loadModels()
        })

        onUpdated(() => {
            console.log('CARD: updating: ', smoothieData.value.index)
            loadModels()
        })

        onUnmounted(() => {
            console.log('CARD: unmounting: ', smoothieData.value.name)
        })
    }
})

</script>