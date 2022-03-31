<template></template>

<script lang="ts">
import { defineComponent, inject, onMounted, PropType, ref, computed, toRef, watch } from "vue"

import { Object3D, Vector3, Mesh, InstancedMesh, DoubleSide, Color, MeshStandardMaterial } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { CSS3DSprite } from "three/examples/jsm/renderers/CSS3DRenderer";

import Smoothie from '../models/Smoothie'
import Ingredient from '../models/Ingredient'
import { getAllIngredients } from '../api/read'

export default defineComponent({
    props: {
        smoothies: {
            type: Object as PropType<Smoothie[]>,
            required: true,
        },
        coords: {
            type: Object as PropType<Vector3[]>,
            required: true,
        }
    },
    emits: ['deleteSmoothie'],
    setup(props, { emit }) {
        const smoothieData = toRef(props, 'smoothies')
        const smoothiePoints = toRef(props, 'coords')
        const webGlScene = inject('webGlScene') as Object3D
        const css3dScene = inject('css3dScene') as Object3D
        // empty object for carrying transforms
        const instancedSmoothie = new Object3D()
        let scaleFactor = 0.002
        // This version traverses the glTF for its children.
        const smoothieCount = computed(() => smoothieData.value.length)

        const initInstancedSmoothies = (smoothies: Smoothie[]) => {
            console.log('initting instanced Smoothie')
            const loader = new GLTFLoader()
            loader.load("/Smoothie.glb", (gltf) => {
                let model = gltf.scene
                model.traverse(function (child) {
                    if (child instanceof Mesh) {
                        const smoothieMesh = new InstancedMesh(
                            child.geometry,
                            child.material,
                            smoothieCount.value
                        )
                        webGlScene.add(smoothieMesh)
                        // loop over smoothiesRef.value to get positioning and rotation for smoothiesRef.value
                        for (let smoothie of smoothies) {
                            let pointPosition = smoothiePoints.value[smoothies.indexOf(smoothie)] as Vector3
                            instancedSmoothie.position.copy(pointPosition)
                            instancedSmoothie.scale.set(scaleFactor, scaleFactor, scaleFactor)
                            instancedSmoothie.updateMatrix()
                            smoothieMesh.setMatrixAt(smoothies.indexOf(smoothie), instancedSmoothie.matrix)
                            smoothieMesh.instanceMatrix.needsUpdate = true;
                            // smoothieMesh.setColorAt(smoothiesRef.value.indexOf(smoothie), new Color(color)) // Default smoothie
                            // Increasing material roughness to reflect less lighting
                            (smoothieMesh.material as MeshStandardMaterial).roughness = 1.0;
                            (smoothieMesh.material as MeshStandardMaterial).side = DoubleSide
                            // smoothieMesh.instanceColor.needsUpdate = true;
                            
                            // ADD CSS3DSPRITE TO CSS3DSCENE FOR EACH SMOOTHIE AT SMOOTHIE'S COORDS
                            let smoothieHeaderString = 
                                `<h1 class="text-2xl font-bold text-white p-1">${smoothie.name}</h1>`
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
                            css.name = 'name'
                            css.position.copy(pointPosition);
                            css.position.y -= .2
                            const cssScaleFactor = .007
                            css.scale.set(cssScaleFactor, cssScaleFactor, cssScaleFactor);
                            css.updateMatrix()
                            // ADD TO SCENE
                            css3dScene.add(css);
                        }
                    }
                })
            })
        }

        watch(
            () => smoothieData.value.length, 
            (newValue: number) => {
                webGlScene.children.forEach((child) => {
                    if (child instanceof InstancedMesh) {
                        console.log('instanced mesh should be removed')
                        child.parent?.remove(child)
                    }
                })
                css3dScene.children.forEach((child) => {
                    if (child.name === 'name') {
                        child.parent?.remove(child)
                    }
                })
                initInstancedSmoothies(smoothieData.value)
            }
        )

        onMounted(async () => {
            initInstancedSmoothies(smoothieData.value)
        })

        return {
            smoothieData,
        }
    }
})

</script>