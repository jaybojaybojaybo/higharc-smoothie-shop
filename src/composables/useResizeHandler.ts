import { Ref } from 'vue'
import { PerspectiveCamera, WebGLRenderer } from 'three'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'

export default function useResizeListener(canvasWidthRef: Ref<number>, canvasHeightRef: Ref<number>, headerHeightRef: Ref<number>, perspCamera: PerspectiveCamera, webGLRenderer: WebGLRenderer, css3DRenderer: CSS3DRenderer) {
  // * ORTHOGRAPHIC CAMERA UPDATE * //  
  // if height is changed, adjust zoom
  // find difference percentage of currentHeight to previous Height and apply percentage to zoom
  const newCanvasHeight = document.documentElement.clientHeight - headerHeightRef.value
  
  // * NEW ASPECT RATIO * //
  // Update canvasWidth and canvasHeight to new values
  canvasWidthRef.value = document.documentElement.clientWidth
  canvasHeightRef.value = newCanvasHeight
  // Update aspect ratio
  const newAspectRatio = canvasWidthRef.value / canvasHeightRef.value
  
  // * PERSPECTIVE CAMERA UPDATE * //
  perspCamera.aspect = newAspectRatio
  perspCamera.updateProjectionMatrix()
  
  // * RENDERERS UPDATE * //
  webGLRenderer.setSize(canvasWidthRef.value, canvasHeightRef.value)
  css3DRenderer.setSize(canvasWidthRef.value, canvasHeightRef.value)
  // Update pixel ratio of webGLRenderer and limited it to 2. May lower it to 1 (better for the GPU) or if device needs it.
  webGLRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}