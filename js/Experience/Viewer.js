import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

// candy_bumper
// hammer
// bumper
// fan
// door
// hoolahoop
// bumper2
// victory_gate
// crown
import modelSrc from '../../assets/models/crown.fbx'

class _Viewer {
  async setModel() {
    try {
      const activeModel = await this.loader.loadAsync(modelSrc)
      activeModel.traverse((child) => {
        if (child.isMesh) {
          // child.receiveShadow = true
          child.castShadow = true

          console.log({ material: child.material })
          const cartoonMaterial = new THREE.MeshToonMaterial()
          cartoonMaterial.map = child.material.map
          child.material = cartoonMaterial

          // child.material.blending = THREE.AdditiveBlending

          // child.material.map = child.material
          // child.material.flatShading = true
          // child.material.specular = new THREE.Color(0xffc1cc)
          // child.material.shininess = 0
        }
      })
      activeModel.scale.x = 2
      activeModel.scale.y = 2
      activeModel.scale.z = 2

      // this.dLight.target = activeModel
      // this.dLight.target.updateMatrixWorld()

      console.log({ activeModel })
      this.scene.add(activeModel)
      this.activeModel = activeModel

      console.log('✅', 'loading:success', { activeModel })
    } catch (error) {
      console.log('❌', 'loading:error', { error })
    }
  }

  ///////////////////////////////////////////////////////////////////////////

  setFloor() {
    // THREE.ColorManagement.legacyMode = false

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
    const floor1Material = new THREE.MeshStandardMaterial({
      color: '#fc74cc',
    })

    this.floor = new THREE.Mesh(boxGeometry, floor1Material)
    this.floor.position.set(0, -0.1, 0)
    this.floor.scale.set(4, 0.2, 4)
    this.floor.receiveShadow = true
    this.scene.add(this.floor)
  }

  setFloor2() {
    // THREE.ColorManagement.legacyMode = false

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: '#3f7b9d',
    })

    this.floor = new THREE.Mesh(boxGeometry, floorMaterial)
    this.floor.position.set(-4, -0.1, 0)
    this.floor.scale.set(4, 0.2, 4)
    this.floor.receiveShadow = true
    this.scene.add(this.floor)
  }

  setFloor3() {
    // THREE.ColorManagement.legacyMode = false

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 'limegreen',
    })

    this.floor = new THREE.Mesh(boxGeometry, floorMaterial)
    this.floor.position.set(4, -0.1, 0)
    this.floor.scale.set(4, 0.2, 4)
    this.floor.receiveShadow = true
    this.scene.add(this.floor)
  }

  setFloor4() {
    // THREE.ColorManagement.legacyMode = false

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: '#ccc434',
    })

    this.floor = new THREE.Mesh(boxGeometry, floorMaterial)
    this.floor.position.set(0, -0.1, 4)
    this.floor.scale.set(4, 0.2, 4)
    this.floor.receiveShadow = true
    this.scene.add(this.floor)
  }

  setFloor5() {
    // THREE.ColorManagement.legacyMode = false

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: '#DE8286',
    })

    this.floor = new THREE.Mesh(boxGeometry, floorMaterial)
    this.floor.position.set(0, -0.1, -4)
    this.floor.scale.set(4, 0.2, 4)
    this.floor.receiveShadow = true
    this.scene.add(this.floor)
  }

  setAxes() {
    const { size } = this.settings
    const axesHelper = new THREE.AxesHelper(size / 2)
    this.scene.add(axesHelper)
  }

  setGrid() {
    const { size, divisions } = this.settings
    const gridHelper = new THREE.GridHelper(size, divisions, 'white', 'white')
    gridHelper.position.y -= 0.01
    this.scene.add(gridHelper)
  }

  setBox() {
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: 'hotpink' })
    )
    // box.scale.set(0.2, 0.8, 1.25)
    // box.receiveShadow = true
    box.castShadow = true
    box.position.y = 0.8
    this.scene.add(box)
  }

  ///////////////////////////////////////////////////////////////////////////

  init({ scene, dLight, size = 40, divisions = 40 }) {
    this.scene = scene
    this.settings = {
      size,
      divisions,
    }
    this.loader = new FBXLoader()

    this.dLight = dLight

    this.setAxes()
    this.setGrid()

    this.setFloor()
    this.setFloor2()
    this.setFloor3()
    this.setFloor4()
    this.setFloor5()

    this.setModel()
    // this.setBox()
  }

  ///////////////////////////////////////////////////////////////////////////

  updateActiveModel(t) {
    if (this.activeModel) {
      // this.activeModel.position.z = Math.sin(t / 1000)
      // this.activeModel.position.x = Math.sin(t / 1000)
      // this.activeModel.position.y = Math.sin(t / 1000) + 1

      // hoolahoop
      if (
        this.activeModel.children[1] &&
        this.activeModel.children[1].name === 'HoolaHoop_Fan_lp'
      ) {
        this.activeModel.position.y = Math.sin(t / 1000) + 1
        this.activeModel.children[1].rotation.z += 0.05
      }

      if (
        this.activeModel.children[0] &&
        this.activeModel.children[0].name.includes('HammerBody')
      ) {
        this.activeModel.rotation.y -= 0.025
      }

      if (
        this.activeModel.children[0] &&
        this.activeModel.children[0].name.includes('Fan')
      ) {
        this.activeModel.rotation.y -= 0.05
      }

      if (
        this.activeModel.children[0] &&
        this.activeModel.children[0].name.includes('Door_Block_lp')
      ) {
        this.activeModel.position.x = Math.sin(t / 1000)
      }

      if (
        this.activeModel.children[0] &&
        this.activeModel.children[0].name.includes('BigBumper')
      ) {
        this.activeModel.position.y = Math.sin(t / 1000) + 1
      }

      if (
        this.activeModel.children[0] &&
        this.activeModel.children[0].name.includes('Candy')
      ) {
        this.activeModel.rotation.y -= 0.05
        this.activeModel.position.x = Math.sin(t / 1000)
      }

      if (
        this.activeModel.children[0] &&
        this.activeModel.children[0].name.includes('Crown')
      ) {
        this.activeModel.rotation.y += 0.01
      }

      if (
        this.activeModel.children[0] &&
        this.activeModel.children[0].name.includes('BumperRotatingModule')
      ) {
        this.activeModel.position.y = Math.sin(t / 1000) + 1
      }
    }
  }

  update(t) {
    this.updateActiveModel(t)
  }
}

const Viewer = new _Viewer()
export default Viewer
