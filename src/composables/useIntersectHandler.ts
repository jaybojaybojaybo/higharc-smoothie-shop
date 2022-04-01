import { Ref } from 'vue'
import { Scene, Vector3, Intersection, Mesh, InstancedMesh, Group } from 'three'
import Smoothie from '../models/Smoothie'
import { CSS3DSprite } from 'three/examples/jsm/renderers/CSS3DRenderer'

export default function useIntersectHandler(event: MouseEvent, raycasterRef: Ref, webGLScene: Scene, smoothies: Ref<Smoothie[]>, selectedSmoothies: Ref<Smoothie[]>, clearSmoothieSelection: Function) {  
  event.preventDefault()
  // Find intersections.
  let intersects = raycasterRef.value.intersectObjects(webGLScene.children, true) as Intersection[]
  let addMode = true
  if (intersects.length > 0) {
    for (const intersect of intersects) {
      let targetParent = intersect.object.parent?.parent?.parent?.parent?.parent
      if (targetParent && targetParent instanceof Group) {
        if (selectedSmoothies.value.length) {
          clearSmoothieSelection(!addMode)
        }
        selectedSmoothies.value?.push(smoothies.value[parseInt(targetParent.name)])
        break
      } else {
        clearSmoothieSelection(addMode)
      }
      intersects = []
    }
  } else {
    clearSmoothieSelection(addMode)
  }

}