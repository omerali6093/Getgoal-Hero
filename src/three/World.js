import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default class World {
  constructor(experience) {
  this.experience = experience;
  this.scene = experience.scene;

  this.character = null;
  this.modelGroup = new THREE.Group();

  this.mouse = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  };

  // Initial character position
  this.characterTargetX = 0;

  // Track click state
  this.isCharacterClicked = false;

  this.setupMouse();
  this.loadCharacter();
}

  setupMouse() {
    const hero = document.querySelector("#custom-three-hero");

    if (!hero) return;

    hero.addEventListener("mousemove", (event) => {
      const rect = hero.getBoundingClientRect();

      this.mouse.targetX =
        ((event.clientX - rect.left) / rect.width) * 2 - 1;

      this.mouse.targetY =
        -((event.clientY - rect.top) / rect.height) * 2 + 1;
    });

    hero.addEventListener("mouseleave", () => {
      this.mouse.targetX = 0;
      this.mouse.targetY = 0;
    });
  }

  loadCharacter() {
    const loader = new GLTFLoader();

    const modelUrl =
      `${window.CTH_DATA.pluginUrl}dist/models/character.glb`;

    console.log("Loading character:", modelUrl);

    loader.load(
      modelUrl,

      (gltf) => {
        console.log("MODEL LOADED SUCCESSFULLY", gltf);

        this.character = gltf.scene;

        /*
        --------------------------------
        DON'T FORCE ROTATION YET
        --------------------------------
        */

        this.character.rotation.set(0, 0, 0);

        /*
        --------------------------------
        CALCULATE ORIGINAL MODEL SIZE
        --------------------------------
        */

        const box = new THREE.Box3().setFromObject(
          this.character
        );

        const size = new THREE.Vector3();

        box.getSize(size);

        const center = new THREE.Vector3();

        box.getCenter(center);

        console.log("MODEL SIZE:", size);
        console.log("MODEL CENTER:", center);

        /*
        --------------------------------
        CENTER THE MODEL
        --------------------------------
        */

        this.character.position.x = -center.x;
        this.character.position.y = -center.y;
        this.character.position.z = -center.z;

        /*
        --------------------------------
        AUTOMATIC SCALE
        --------------------------------
        */

        const maxDimension = Math.max(
          size.x,
          size.y,
          size.z
        );

        const desiredSize = 6;

        const scale = desiredSize / maxDimension;

        this.character.scale.setScalar(scale);

        /*
        --------------------------------
        PRESERVE MATERIALS AND COLORS
        --------------------------------
        */

        this.character.traverse((child) => {
          if (!child.isMesh) return;

          const oldMaterial = child.material;

          // Handle single or multiple materials
          const materials = Array.isArray(oldMaterial)
            ? oldMaterial
            : [oldMaterial];

          const newMaterials = materials.map((material) => {

            // Get the original texture from GLB
            const texture = material.map || null;

            if (texture) {
              texture.colorSpace = THREE.SRGBColorSpace;
              texture.needsUpdate = true;
            }

            // Use unlit material so original colors stay visible
            return new THREE.MeshBasicMaterial({
              map: texture,
              color: 0xffffff,
              transparent: true,
              side: THREE.DoubleSide,
              alphaTest: 0.01
            });
          });

          // Apply material
          child.material = Array.isArray(oldMaterial)
            ? newMaterials
            : newMaterials[0];
        });

        /*
        --------------------------------
        ADD CHARACTER
        --------------------------------
        */

        this.modelGroup.add(this.character);

        this.modelGroup.position.set(0, 0, 0);

        this.scene.add(this.modelGroup);

        console.log("CHARACTER ADDED TO SCENE");
      },

      undefined,

      (error) => {
        console.error("GLB LOADING ERROR:", error);
      }
    );
  }

  handleClick() {
  // 
  const hero = document.querySelector("#custom-three-hero");

  if (!hero) {
    console.error("Custom Three Hero section not found");
    return;
  }

  const textContent = hero.querySelector(".cth-click-content");

  console.log("CLICK CONTENT:", textContent);

  if (!textContent) {
    console.error("CLICK CONTENT NOT FOUND");
    return;
  }

  textContent.classList.add("active");

  this.characterTargetX = 2.4;

  console.log("Character clicked successfully!");
  //   "cth-click-content"
  // );

  // if (!textContent) {
  //   console.error("Text content not found");
  //   return;
  // }

  // // Prevent repeating the animation unnecessarily
  // if (this.isCharacterClicked) return;

  // this.isCharacterClicked = true;

  // // Show text
  // textContent.classList.add("active");

  // // Smoothly move character to the right
  // this.characterTargetX = 0.8;

  // console.log("Character clicked - text shown");
}

update() {
    if (!this.modelGroup) return;

    // Smooth mouse movement
    const mouseSpeed = 0.35;

    this.mouse.x +=
        (this.mouse.targetX - this.mouse.x) * mouseSpeed;

    this.mouse.y +=
        (this.mouse.targetY - this.mouse.y) * mouseSpeed;


    // =========================
    // CHARACTER ROTATION
    // =========================

    // Strong left/right rotation
    const targetRotationY =
        this.mouse.x * 0.5;

    // Limited up/down rotation
    const targetRotationX =
        -this.mouse.y * 0.06;


    this.modelGroup.rotation.y +=
        (targetRotationY - this.modelGroup.rotation.y) * 0.18;

    this.modelGroup.rotation.x +=
        (targetRotationX - this.modelGroup.rotation.x) * 0.18;


    // =========================
    // CHARACTER POSITION
    // =========================

    // Character moves slightly left/right
    const targetX =
        this.characterTargetX +
        this.mouse.x * 0.08;

    // Very limited vertical movement
    const targetY =
        this.mouse.y * 0.025;


    this.modelGroup.position.x +=
        (targetX - this.modelGroup.position.x) * 0.12;

    this.modelGroup.position.y +=
        (targetY - this.modelGroup.position.y) * 0.15;
}


}