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
import modelSrc from '../../assets/models/hammer.fbx'
import playerSrc from '../../assets/models/player_idle3.fbx'

class _Viewer {
  async setPlayer() {
    try {
      const player = await this.loader.loadAsync(playerSrc)

      player.traverse((child) => {
        if (child.isMesh) {
          // child.receiveShadow = true
          child.castShadow = true
          if (child.name === 'Beta_Surface') {
            const cartoonMaterial = new THREE.MeshToonMaterial({
              color: 'darkslateblue',
            })
            child.material = cartoonMaterial
          }
        }

        if (child.name === 'Beta_Joints') {
          const cartoonMaterial2 = new THREE.MeshToonMaterial({
            color: 'aqua',
          })
          child.material = cartoonMaterial2
        }
      })
      player.scale.x = 0.012
      player.scale.y = 0.012
      player.scale.z = 0.012

      // this.dLight.target = activeModel
      // this.dLight.target.updateMatrixWorld()

      console.log({ player })
      // Animation
      this.animations = player.animations
      this.mixer = new THREE.AnimationMixer(player)
      const idle = player.animations[2]
      idle.name = 'idle'

      const running = player.animations[0]
      running.name = 'running'

      const jumping = player.animations[4]
      jumping.name = 'jumping'

      this.actions = {
        idle: this.mixer.clipAction(idle),
        running: this.mixer.clipAction(running),
        jumping: this.mixer.clipAction(jumping),
      }

      this.scene.add(player)
      this.player = player

      this.modelReady = true
      this.activeAction = this.actions.idle
      this.activeAction.play()

      console.log('✅', 'loading:success', { player })
    } catch (error) {
      console.log('❌', 'loading:error', { error })
    }
  }
  async setObstacle() {
    try {
      const activeModel = await this.loader.loadAsync(modelSrc)
      activeModel.traverse((child) => {
        if (child.isMesh) {
          // child.receiveShadow = true
          child.castShadow = true
          if (child.name === 'Fan_Body_lp') {
            child.scale.set(0.015, 0.015, 0.015)
          }

          console.log({ child })
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

  setRaceFloors() {
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1, 40, 40)
    const floor1Material = new THREE.MeshStandardMaterial({
      color: '#fc74cc',
      wireframe: true,
    })

    this.floor = new THREE.Mesh(boxGeometry, floor1Material)
    this.floor.name = '0'
    this.floor.scale.set(4, 0.2, 4)
    this.floor.receiveShadow = true

    const c1 = this.floor.clone()
    c1.name = 'c1'
    const c2 = this.floor.clone()
    c2.name = 'c2'
    const c3 = this.floor.clone()
    c3.name = 'c3'
    const c4 = this.floor.clone()
    c4.name = 'c4'
    const c5 = this.floor.clone()
    c5.name = 'c5'
    const c6 = this.floor.clone()
    c6.name = 'c6'

    const p = new THREE.Vector3(0, -0.1, 0)

    const platforms = [this.floor, c1, c2, c3, c4, c5, c6]
    // const positions = [
    //   new THREE.Vector3(0, -0.1, 0),
    //   new THREE.Vector3(-4, -0.1, 0),
    //   new THREE.Vector3(-8, -0.1, 0),
    //   new THREE.Vector3(-8, -0.1, -4),
    //   new THREE.Vector3(-8, -0.1, -8),
    //   new THREE.Vector3(-4, -0.1, -8),
    //   new THREE.Vector3(-0, -0.1, -8),
    // ]

    console.log({ length: platforms.length })

    platforms.forEach((platform, i) => {
      console.log({ name: platform.name })

      // switch (true) {
      //   case i < 3:
      //     p.x -= 4
      //     break
      //   case i > 2 && i <= 4:
      //     p.z -= 4
      //     break
      //   case i > 4:
      //     p.x += 4
      //     break
      // }

      // if (i == 0) {
      //   p.x -= 4
      //   platform.position.copy(p)
      // }

      if (i < 2) {
        p.x -= 4
        platform.position.copy(p)
      }

      if (i > 2 && i <= 4) {
        p.z -= 4
        platform.position.copy(p)
      }

      if (i > 4) {
        p.x += 4
        platform.position.copy(p)
      }
    })

    // this.floor.position.set(0, -0.1, 0)
    // c1.position.set(-4, -0.1, 0)
    // c2.position.set(-8, -0.1, 0)

    // c3.position.set(-8, -0.1, -4)

    // c4.position.set(-8, -0.1, -8)
    // c5.position.set(-4, -0.1, -8)
    // c6.position.set(-0, -0.1, -8)

    this.scene.add(this.floor, c1, c2, c3, c4, c5, c6)
  }

  ///////////////////////////////////////////////////////////////////////////

  playAnimation(name) {
    const toAction = this.actions[name]
    let activeAction = this.activeAction

    if (toAction) {
      if (toAction != activeAction) {
        const lastAction = activeAction
        activeAction = toAction
        //lastAction.stop()
        lastAction.fadeOut(1)
        activeAction.reset()
        activeAction.fadeIn(1)
        activeAction.play()

        this.activeAction = activeAction
      }
    }
  }

  init({ scene, dLight, size = 40, divisions = 40 }) {
    this.scene = scene
    this.modelReady = false
    this.settings = {
      size,
      divisions,
    }
    this.loader = new FBXLoader()

    this.playAnimation = this.playAnimation.bind(this)

    this.dLight = dLight

    this.setAxes()
    this.setGrid()

    this.setFloor()
    this.setFloor2()
    this.setFloor3()
    this.setFloor4()
    this.setFloor5()

    // this.setRaceFloors()

    // this.setObstacle()
    this.setPlayer()
    // this.setBox()

    this.idleBtn = document.getElementById('idle')
    this.idleBtn.addEventListener('click', () => this.playAnimation('idle'))

    this.jumpingBtn = document.getElementById('jumping')
    this.jumpingBtn.addEventListener('click', () =>
      this.playAnimation('jumping')
    )

    this.runningBtn = document.getElementById('running')
    this.runningBtn.addEventListener('click', () =>
      this.playAnimation('running')
    )
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

      // hammer
      if (
        this.activeModel.children[0] &&
        this.activeModel.children[0].name.includes('HammerBody')
      ) {
        this.activeModel.rotation.y -= 0.025
      }

      // fan
      if (
        this.activeModel.children[0] &&
        this.activeModel.children[0].name.includes('Fan')
      ) {
        this.activeModel.rotation.y -= 0.08
      }

      // door
      if (
        this.activeModel.children[0] &&
        this.activeModel.children[0].name.includes('Door_Block_lp')
      ) {
        this.activeModel.position.x = Math.sin(t / 1000)
      }

      // big bumper
      if (
        this.activeModel.children[0] &&
        this.activeModel.children[0].name.includes('BigBumper')
      ) {
        this.activeModel.position.y = Math.sin(t / 1000) + 1
      }

      // cany bumper
      if (
        this.activeModel.children[0] &&
        this.activeModel.children[0].name.includes('Candy')
      ) {
        this.activeModel.rotation.y -= 0.05
        this.activeModel.position.x = Math.sin(t / 1000)
      }

      // crown
      if (
        this.activeModel.children[0] &&
        this.activeModel.children[0].name.includes('Crown')
      ) {
        this.activeModel.rotation.y += 0.01
      }

      // bumper 2
      if (
        this.activeModel.children[0] &&
        this.activeModel.children[0].name.includes('BumperRotatingModule')
      ) {
        this.activeModel.position.y = Math.sin(t / 1000) + 1
      }
    }
  }

  update(t, d) {
    this.updateActiveModel(t)

    if (this.modelReady) this.mixer.update(d)
  }
}

const Viewer = new _Viewer()
export default Viewer
