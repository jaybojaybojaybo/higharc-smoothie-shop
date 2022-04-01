<template>
    <SmoothieCard   v-for="smoothie of smoothieList"
                    :key="smoothie.index"
                    :smoothie="smoothie"
                    :index="smoothie.index"
                    :coord="smoothiePoints[smoothieList.indexOf(smoothie)]"
                    ref="card">
    </SmoothieCard>
    <AddSmoothieForm    v-if="addMode" 
                        @addSmoothie="onAddSmoothie" 
                        ref="addForm">
    </AddSmoothieForm>
    <SmoothieDetails    v-for="(smoothie, index) of selectedSmoothies" 
                        :key="smoothie.name"
                        :smoothie="smoothie"
                        @closeSelectedSmoothie="onClearSelectedSmoothie"
                        @deleteSmoothie="onDeleteSmoothie"
                        ref="details">
    </SmoothieDetails>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, reactive, provide, Ref, watch } from "vue"

import { Scene, Color, DirectionalLight, HemisphereLight, Vector3, PlaneGeometry, MeshBasicMaterial, DoubleSide, Mesh, Group } from 'three'
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
        const _debug = true
        const smoothieList = ref<Smoothie[]>([])
        const smoothiePoints = ref<Vector3[]>([])
        const gridSize = ref(0) // in meters
        const selectedSmoothies = ref([]) as Ref<Smoothie[]>
        const card = ref<InstanceType<typeof SmoothieCard>>()
        const addForm = ref<InstanceType<typeof AddSmoothieForm>>()
        const details = ref<InstanceType<typeof SmoothieDetails>>()
        const addMode = ref<Boolean>(true)

        const onAddSmoothie = (newSmoothie: Smoothie) => {
            smoothieList.value.push(newSmoothie)
            addMode.value = false
            if (_debug) { console.log('adding smoothie!', smoothieList.value) }
            listInit();
            // Re-initialize form
        }
        function onClearSelectedSmoothie(isAddMode: Boolean) {
            addMode.value = isAddMode
            selectedSmoothies.value.length = 0
        }
        const onDeleteSmoothie = (deletedSmoothie: Smoothie) => {
            addMode.value = true
            if (_debug) {console.log('LIST: deleted Smoothie: ', deletedSmoothie)}
            let deletedIndex = smoothieList.value.indexOf(deletedSmoothie)
            if (_debug) {console.log('LIST: smoothieList after delete: ', smoothieList.value)}
            // CLEAR MODELS AND RE-INITIALIZE
            listDestroy()
            smoothieList.value.splice(deletedIndex,1)
            listInit();
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
        // Smoothie Click
        function handleIntersects(event: MouseEvent) { 
            addMode.value = false
            useIntersectHandler(
                event, 
                raycasterRef, 
                scene, 
                smoothieList as Ref<Smoothie[]>, 
                selectedSmoothies, 
                onClearSelectedSmoothie
            )            
        }
        css3DRenderer.domElement.addEventListener('click', handleIntersects, true)

        // * List 3D OBJECT METHODS * //
        function listDestroy(): void {
            for (let i = scene.children.length - 1; i >= 0; i--) {
                if (scene.children[i].type === 'Group') {
                    scene.remove(scene.children[i])
                } else if (scene.children[i].name.includes("shopWall")) {
                    scene.remove(scene.children[i])
                }
            }
            for (let i = css3dScene.children.length - 1; i >= 0; i--) {
                if (css3dScene.children[i].name.includes('smoothie')) {
                    css3dScene.remove(css3dScene.children[i])
                }
            }
        }
        function listInit(): void {
            for (let smoothie of smoothieList.value) {
                smoothie.index = smoothieList.value.indexOf(smoothie)
            }
            gridSize.value = Math.round(Math.sqrt((smoothieList.value as Smoothie[]).length))
            // SET BACKGROUND WALL SIZE
            let shopGeo = new PlaneGeometry(gridSize.value * 2, gridSize.value * 2)
            let shopMat = new MeshBasicMaterial({color: 0xb09c61, side: DoubleSide})
            let shopWall = new Mesh(shopGeo, shopMat)
            shopWall.name = 'shopWall'
            shopWall.position.z = -5
            scene.add(shopWall)
            // SET GRID
            smoothiePoints.value.length = 0
            smoothiePoints.value = smoothieList.value.map((ssl) => {
                let x, y, z
                x = y = z = 0
                const index = smoothieList.value.indexOf(ssl)
                if (_debug) {console.log('gridsize: ', gridSize.value)}
                if (gridSize.value > 1) {
                    x = index%gridSize.value - Math.ceil(gridSize.value/2)/2
                    y = Math.floor(index/gridSize.value) - gridSize.value/2
                } else if (gridSize.value === 1) {
                    x = (index + 1)/gridSize.value - (gridSize.value * 1.5)
                } 
                return new Vector3(x, y, z)
            })
            if (_debug) {console.log('listInit points: ', smoothiePoints.value)}            
        }

        watch(
            () => gridSize.value, 
            (newValue: number) => {
                listDestroy()
                listInit()
            }
        )

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
            smoothieList.value = window.localStorage.getItem('smoothies') && typeof window.localStorage.getItem('smoothies') === 'string'            
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
            listInit()
            animate()
        })

        onUnmounted(() => {
            document.querySelector('#app')?.removeChild(webGLRenderer.domElement)
            document.querySelector('#app')?.removeChild(css3DRenderer.domElement)
            window.removeEventListener('resize', handleResize, true)
            window.localStorage.setItem('smoothies', JSON.stringify(smoothieList.value))
            listDestroy()
        })

        return {
            smoothieList,
            smoothiePoints,
            onAddSmoothie,
            onClearSelectedSmoothie,
            onDeleteSmoothie,
            selectedSmoothies,
            card,
            addForm,
            details,
            addMode,
            scene,
            css3dScene
        }
    }
})
</script> 