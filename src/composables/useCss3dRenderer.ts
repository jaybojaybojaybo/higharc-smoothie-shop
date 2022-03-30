import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'

export default function useCss3dRenderer(width: number, height: number, headerHeight: number) {
  // * RENDERER w/ default CANVAS * //
  const renderer = new CSS3DRenderer()
  renderer.setSize(width, height)
  renderer.domElement.style.position = 'absolute'
  renderer.domElement.style.top = headerHeight + 'px'
  return renderer
}