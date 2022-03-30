import { Ref } from 'vue'
import { Scene, Vector3, Intersection, InstancedMesh } from 'three'
// import Smoothie from '../models/Smoothie'

export default function useIntersectHandler(event: MouseEvent, raycasterRef: Ref, webGLScene: Scene, smoothies: any, selectedSmoothies: Ref<any>, selectedSmoothiePoints: Ref<Vector3>, clearSmoothieSelection: VoidFunction) {
  event.preventDefault()
  // Find intersections.
  let intersects = raycasterRef.value.intersectObjects(webGLScene.children, true) as Intersection[]
  if (intersects.length > 0) {
    // Console logging the array of intersections.
    for (const intersect of intersects) {
      if (intersect.object instanceof InstancedMesh) {
        if (selectedSmoothies.value.length) {
          clearSmoothieSelection()
        }
        //@ts-ignore
        selectedSmoothies.value?.push(smoothies[Smoothie.instanceId])
        selectedSmoothiePoints.value = intersect.point
        break
      }
    intersects = []
    }
  }

}