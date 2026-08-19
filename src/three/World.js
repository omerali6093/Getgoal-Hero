import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default class World {
  constructor(experience) {
    this.experience = experience;
    this.scene = experience.scene;

    this.character = null;
    this.modelGroup = new THREE.Group();

    this.addLights();
    this.loadCharacter();
  }

  addLights() {
    const ambientLight = new THREE.AmbientLight(
      0xffffff,
      2
    );

    this.scene.add(ambientLight);

    const frontLight = new THREE.DirectionalLight(
      0xffffff,
      3
    );

    frontLight.position.set(5, 5, 10);

    this.scene.add(frontLight);

    const sideLight = new THREE.DirectionalLight(
      0xffffff,
      2
    );

    sideLight.position.set(-5, 2, 5);

    this.scene.add(sideLight);
  }

  loadCharacter() {
    const loader = new GLTFLoader();

    const modelUrl =
      `${window.CTH_DATA.pluginUrl}dist/models/character.glb`;

    console.log("Loading model from:", modelUrl);

    loader.load(
      modelUrl,

      (gltf) => {
        console.log("MODEL LOADED SUCCESSFULLY:", gltf);

        this.character = gltf.scene;

        /*
        ==============================
        GET ORIGINAL MODEL SIZE
        ==============================
        */

        const box = new THREE.Box3().setFromObject(
          this.character
        );

        const size = new THREE.Vector3();
        box.getSize(size);

        const center = new THREE.Vector3();
        box.getCenter(center);

        console.log("ORIGINAL MODEL SIZE:", size);
        console.log("ORIGINAL MODEL CENTER:", center);

        /*
        ==============================
        NORMALIZE MODEL SIZE
        ==============================
        */

        const maxDimension = Math.max(
          size.x,
          size.y,
          size.z
        );

        const desiredSize = 4;

        const scale = desiredSize / maxDimension;

        this.character.scale.setScalar(scale);

        /*
        ==============================
        RECALCULATE AFTER SCALING
        ==============================
        */

        const scaledBox = new THREE.Box3()
          .setFromObject(this.character);

        const scaledCenter = new THREE.Vector3();

        scaledBox.getCenter(scaledCenter);

        /*
        Move model so its center
        is at the origin
        */

        this.character.position.sub(scaledCenter);

        /*
        ==============================
        ADD TO GROUP
        ==============================
        */

        this.modelGroup.add(this.character);

        this.modelGroup.position.set(
          0,
          0,
          0
        );

        this.scene.add(this.modelGroup);

        console.log(
          "FINAL MODEL SIZE:",
          new THREE.Box3()
            .setFromObject(this.modelGroup)
            .getSize(new THREE.Vector3())
        );

        /*
        TEMPORARY HELPER
        */

        const axesHelper = new THREE.AxesHelper(3);

        this.scene.add(axesHelper);
      },

      undefined,

      (error) => {
        console.error(
          "GLB LOADING ERROR:",
          error
        );
      }
    );
  }

  handleClick() {}

  update() {}
}