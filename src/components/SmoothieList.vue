<template>
    <p class="font-semibold">The list of smoothies:</p>
    <!-- HANDLE FORMATTING OF THE LIST -->
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, reactive, provide } from "vue"
import { Scene, Color, DirectionalLight, HemisphereLight } from 'three'

import Smoothie from "../models/Smoothie"
import { getAllSmoothies } from '../api/read'

import useWebGLRenderer from '../composables/useWebGLRenderer'
import useCss3dRenderer from '../composables/useCss3dRenderer'
import usePerspectiveCamera from '../composables/usePerspectiveCamera'
import useMapControls from '../composables/useMapControls'
import useRaycasting from '../composables/useRaycasting'
import useResizeHandler from '../composables/useResizeHandler'
import useMouseMove from '../composables/useMouseMove'

export default defineComponent({
    components: {
    },
    setup() {
        const smoothiesList = ref<Smoothie[]>([])
        const gridSize = ref(0) // in meters

        // THREE.JS SETUP
        const scene = new Scene()
        scene.background = new Color(0x222222)
        const css3dScene = new Scene()

        // * LIGHTS * //
        const directionalLight = new DirectionalLight( "#0033cc", 5 )
        scene.add(directionalLight)
        const hemisphereLight = new HemisphereLight( 0x0c209b, 0x0c209b, 1.0 )
        scene.add(hemisphereLight)

        // * RENDERERS * //
        const headerHeightRef = ref<number>((document.querySelector('#navbar') ? document.querySelector('#navbar')?.clientHeight : 0) as number)
        const canvasWidthRef = ref(document.documentElement.clientWidth)
        const canvasHeightRef = ref(document.documentElement.clientHeight - headerHeightRef.value)
        const webGLRenderer = useWebGLRenderer(canvasWidthRef.value, canvasHeightRef.value)
        const css3DRenderer = useCss3dRenderer(canvasWidthRef.value, canvasHeightRef.value, headerHeightRef.value)

        // * CAMERA * //
        const perspCamera = reactive(usePerspectiveCamera(gridSize.value, canvasWidthRef.value, canvasHeightRef.value)) 
        // * CONTROLS * //
        const perspMapControlsRef = useMapControls(perspCamera, css3DRenderer.domElement)
        // * RAYCASTER * //
        const { raycasterRef, mouseRef } = useRaycasting()
        raycasterRef.value.setFromCamera(mouseRef.value, perspCamera)

        // * RENDER LOOP - RECURSIVE * //
        const animate = () => {
            perspMapControlsRef.value.update()
            raycasterRef.value.setFromCamera(mouseRef.value, perspCamera)
            webGLRenderer.render(scene, perspCamera)
            css3DRenderer.render(css3dScene, perspCamera)
            window.requestAnimationFrame(animate)
        }

        // Window Events
        function handleResize() {             
            useResizeHandler(
                canvasWidthRef, 
                canvasHeightRef, 
                headerHeightRef, 
                perspCamera, 
                webGLRenderer, 
                css3DRenderer
            ) 
        }

        // Provide scenes so child components can refer to it
        provide('webGlScene', scene)
        provide('css3dScene', css3dScene)

        onMounted(async () => {
            // get localStorage data or initialize from data/smoothies via getAllSmoothies()
            smoothiesList.value = window.localStorage.getItem('smoothies') && typeof window.localStorage.getItem('smoothies') === 'string'            
                ? JSON.parse(window.localStorage.getItem('smoothies') as string) as Smoothie[]
                : await getAllSmoothies() as Smoothie[]

            // THREE SCENE SETUP
            headerHeightRef.value = (document.querySelector('#navbar') ? document.querySelector('#navbar')?.clientHeight : 0) as number
            document.querySelector('#app')?.append(webGLRenderer.domElement)
            css3DRenderer.domElement.id = 'css3DRenderer'
            document.querySelector('#app')?.append(css3DRenderer.domElement)
            useMouseMove(css3DRenderer.domElement, mouseRef.value)
            // EVENTS
            window.addEventListener('resize', handleResize, true)
            animate()
        })

        onUnmounted(() => {
            document.querySelector('#app')?.removeChild(webGLRenderer.domElement)
            document.querySelector('#app')?.removeChild(css3DRenderer.domElement)
            window.removeEventListener('resize', handleResize, true)
            // window.localStorage.setItem('smoothies', JSON.stringify(sessionSmoothiesList.value))
        })

        return {
            smoothiesList
        }
    }
})
</script>