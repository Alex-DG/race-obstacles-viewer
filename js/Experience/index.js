import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module'

import Viewer from './Viewer'

class Experience {
  constructor(options) {
    this.scene = new THREE.Scene()
    this.container = options.domElement
    this.init()
  }

  /**
   * Experience setup
   */
  init() {
    this.bind()
    this.setLights()
    this.setSizes()
    this.setRenderer()
    this.setCamera()
    this.setResize()
    this.setFPS()
    this.update()

    Viewer.init({ scene: this.scene, dLight: this.light2 })

    console.log('🤖', 'Experience initialized')
  }

  bind() {
    this.resize = this.resize.bind(this)
    this.update = this.update.bind(this)
  }

  resize() {
    // Update sizes
    this.sizes.width = window.innerWidth
    this.sizes.height = window.innerHeight

    // Update camera
    this.camera.aspect = this.sizes.width / this.sizes.height
    this.camera.updateProjectionMatrix()

    // Update renderer
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  //////////////////////////////////////////////////////////////////////////////

  setLights() {
    const light1 = new THREE.AmbientLight('#ffffff', 0.5)
    this.scene.add(light1)

    this.light2 = new THREE.DirectionalLight('#ffffff', 1.5)
    this.light2.position.set(4, 4, 1)
    this.light2.castShadow = true
    this.light2.shadow.mapSize.width = 1024
    this.light2.shadow.mapSize.height = 1024
    this.light2.shadow.camera.near = 1
    this.light2.shadow.camera.far = 10
    this.light2.shadow.camera.top = 10
    this.light2.shadow.camera.right = 10
    this.light2.shadow.camera.bottom = -10
    this.light2.shadow.camera.left = -10

    const helper2 = new THREE.DirectionalLightHelper(this.light2, 5)

    this.scene.add(helper2)
    this.scene.add(this.light2)
  }

  setSizes() {
    this.sizes = {
      width: this.container.offsetWidth,
      height: this.container.offsetHeight || window.innerHeight,
    }
  }

  setCamera() {
    // Base camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.sizes.width / this.sizes.height,
      0.1,
      200
    )
    this.camera.position.set(8, 8, 8)

    this.scene.add(this.camera)

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    this.renderer.shadowMap.enabled = true
    // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.container.appendChild(this.renderer.domElement)
  }

  setResize() {
    window.addEventListener('resize', this.resize)
  }

  setFPS() {
    this.stats = Stats()
    document.body.appendChild(this.stats.dom)
  }

  //////////////////////////////////////////////////////////////////////////////

  update(t) {
    // Update controls
    this.controls.update()

    // if (this.light2) {
    //   // this.light2.position.z = this.camera.position.z + 1 - 4
    //   // this.light2.target.position.z = this.camera.position.z - 4
    //   // this.light2.target.updateMatrixWorld()
    // }

    Viewer?.update(t)

    // Render
    this.renderer.render(this.scene, this.camera)

    this.stats.update()

    // Call update again on the next frame
    window.requestAnimationFrame(this.update)
  }
}

export default Experience
