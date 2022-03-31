import { Ref } from 'vue'
import { Scene, Vector3, Intersection, Mesh, InstancedMesh } from 'three'
import Smoothie from '../models/Smoothie'
import { CSS3DSprite } from 'three/examples/jsm/renderers/CSS3DRenderer'

export default function useIntersectHandler(event: MouseEvent, raycasterRef: Ref, webGLScene: Scene, smoothies: Ref<Smoothie[]>, selectedSmoothie: Ref<Smoothie>, clearSmoothieSelection: VoidFunction) {  
  event.preventDefault()
  // Find intersections.
  let intersects = raycasterRef.value.intersectObjects(webGLScene.children, true) as Intersection[]
  if (intersects.length > 0) {
    for (const intersect of intersects) {
      if (intersect.object instanceof InstancedMesh) {
        console.log('this the one! ', intersect)
        if (selectedSmoothie.value) {
          clearSmoothieSelection()
        }
        //@ts-ignore
        selectedSmoothie.value = smoothies.value[intersect.instanceId as number]
        console.log('SELECTENING: ', selectedSmoothie.value)
        break
      } 
    intersects = []
    }
  }

}