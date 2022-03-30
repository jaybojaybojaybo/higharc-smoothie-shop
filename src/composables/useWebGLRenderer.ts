import { WebGLRenderer, sRGBEncoding, ReinhardToneMapping } from 'three'

export default function useWebGLRenderer(width: number, height: number) {
  // * RENDERER w/ default CANVAS * //
  const renderer = new WebGLRenderer({
    antialias: true
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.physicallyCorrectLights = true
  renderer.outputEncoding = sRGBEncoding
  renderer.toneMapping = ReinhardToneMapping
  renderer.toneMappingExposure = 12

  return renderer
}