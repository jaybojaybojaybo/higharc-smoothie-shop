<template>
    <SmoothieCard   :smoothies="smoothiesList"
                    :coords="smoothiePoints"
                    @deleteSmoothie="onDeleteSmoothie"
                    ref="card">
    </SmoothieCard>
    <AddSmoothieForm    v-if="addMode" 
                        @addSmoothie="onAddSmoothie" 
                        @deleteSmoothie="onDeleteSmoothie"
                        ref="addForm">
    </AddSmoothieForm>
    <SmoothieDetails    v-if="!addMode && selectedSmoothie"
                        :smoothie="selectedSmoothie"                        
                        @addSmoothie="onAddSmoothie" 
                        @deleteSmoothie="onDeleteSmoothie"
                        ref="details">
    </SmoothieDetails>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, reactive, provide, Ref } from "vue"

import { Scene, Color, DirectionalLight, HemisphereLight, Vector3, PlaneGeometry, MeshBasicMaterial, DoubleSide, Mesh } from 'three'
import { CSS3DSprite } from "three/examples/jsm/renderers/CSS3DRenderer";

import Smoothie from "../models/Smoothie"
import SmoothieCard from "./SmoothieCard.vue"
import AddSmoothieForm from "./AddSmoothieForm.vue"
import SmoothieDetails from "./SmoothieDetails.vue"
import { getAllSmoothies } from '../api/read'

import useWebGLRenderer from '../composables/useWebGLRenderer'
import useCss3dRenderer from '../composables/useCss3dRenderer'
import usePerspectiveCamera from '../composables/usePerspectiveCamera'
import useMapControls from '../composables/useMapControls'
import useRaycasting from '../composables/useRaycasting'
import useResizeHandler from '../composables/useResizeHandler'
import useMouseMove from '../composables/useMouseMove'
import useIntersectHandler from '../composables/useIntersectHandler'

export default defineComponent({
    components: {
        SmoothieCard,
        AddSmoothieForm,
        SmoothieDetails
    },
    setup() {
        const debug = true
        const smoothiesList = ref<Smoothie[]>([])
        const smoothiePoints = ref<Vector3[]>([])
        const gridSize = ref(0) // in meters
        const selectedSmoothie = ref(smoothiesList.value[0]) as Ref<Smoothie>
        const selectedSmoothiePoint = ref(new Vector3(0, 0, 0)) as Ref<Vector3>
        const card = ref<InstanceType<typeof SmoothieCard>>()
        const addForm = ref<InstanceType<typeof AddSmoothieForm>>()
        const addMode = ref<Boolean>(false)

        const onAddSmoothie = (newSmoothie: Smoothie) => {
            smoothiesList.value.push(newSmoothie)
            if (debug === true) { console.log('adding smoothie!', smoothiesList.value) }
            css3dScene.children.forEach((child) => {
                if (child instanceof CSS3DSprite) {
                    child.parent?.remove(child)
                }
            })
            listInit(scene);
            (card.value as InstanceType<typeof SmoothieCard>).initInstancedSmoothies(smoothiesList.value);
            (addForm.value as InstanceType<typeof AddSmoothieForm>).addFormInit();
        }
        const onDeleteSmoothie = (name: string) => {
            smoothiesList.value = smoothiesList.value?.filter((s) => s.name !== name)
            if (debug === true) {console.log('deleting smoothie! ', smoothiesList.value?.filter((s) => s.name !== name))}
        }

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

        // * EVENTS * //
        // Smoothie Selection
        function clearSmoothieSelection(): void {
            selectedSmoothie.value = {} as Smoothie
            selectedSmoothiePoint.value = new Vector3(0, 0, 0)
            addMode.value = false
        }
        // Smoothie Click
        function handleIntersects(event: MouseEvent) { 
            useIntersectHandler(
                event, 
                raycasterRef, 
                scene, 
                smoothiesList as Ref<Smoothie[]>, 
                selectedSmoothie, 
                clearSmoothieSelection
            )
            addMode.value = false
        }
        css3DRenderer.domElement.addEventListener('click', handleIntersects, true)

        // * List 3D OBJECT METHODS * //
        function listDestroy(scene: Scene): void {
            scene.remove.apply(scene, scene.children)
        }
        function listInit(scene: Scene): void {
            gridSize.value = Math.round(Math.sqrt((smoothiesList.value as Smoothie[]).length))
            // SET BACKGROUND WALL SIZE
            let shopGeo = new PlaneGeometry(gridSize.value * 2, gridSize.value * 2)
            let shopMat = new MeshBasicMaterial({color: 0xb09c61, side: DoubleSide})
            let shopWall = new Mesh(shopGeo, shopMat)
            shopWall.position.z = -5
            scene.add(shopWall)
            // SET GRID
            smoothiePoints.value = smoothiesList.value.map((ssl) => {
                let x, y, z
                x = y = z = 0
                const index = smoothiesList.value.indexOf(ssl)
                if (debug === true) {console.log('gridsize: ', gridSize.value)}
                if (gridSize.value > 1) {
                    x = index%gridSize.value - Math.ceil(gridSize.value/2)/2
                    y = Math.floor(index/gridSize.value) - gridSize.value/2
                } else if (gridSize.value === 1) {
                    x = (index + 1)/gridSize.value - (gridSize.value * 1.5)
                } 
                return new Vector3(x, y, z)
            })
            if (debug === true) {console.log('sessionPoints: ', smoothiePoints.value)}
        }

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
            listInit(scene)
            animate()
        })

        onUnmounted(() => {
            document.querySelector('#app')?.removeChild(webGLRenderer.domElement)
            document.querySelector('#app')?.removeChild(css3DRenderer.domElement)
            window.removeEventListener('resize', handleResize, true)
            // window.localStorage.setItem('smoothies', JSON.stringify(smoothiesList.value))
            listDestroy(scene)
        })

        return {
            smoothiesList,
            smoothiePoints,
            onAddSmoothie,
            onDeleteSmoothie,
            selectedSmoothie,
            selectedSmoothiePoint,
            card,
            addForm,
            addMode
        }
    }
})
</script> 