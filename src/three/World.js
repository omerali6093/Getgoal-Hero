// import * as THREE from "three";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// export default class World {
//   constructor(experience) {
//   this.experience = experience;
//   this.scene = experience.scene;

//   this.character = null;
//   this.modelGroup = new THREE.Group();

//   this.mouse = {
//     x: 0,
//     y: 0,
//     targetX: 0,
//     targetY: 0,
//   };

//   // Initial character position
//   this.characterTargetX = 0;
//   this.characterBaseY = -0.65;

//   // Track click state
//   this.isCharacterClicked = false;

//   this.setupMouse();
//   this.loadCharacter();
// }

//   setupMouse() {
//     const hero = document.querySelector("#custom-three-hero");

//     if (!hero) return;

//     hero.addEventListener("mousemove", (event) => {
//       const rect = hero.getBoundingClientRect();

//       this.mouse.targetX =
//         ((event.clientX - rect.left) / rect.width) * 2 - 1;

//       this.mouse.targetY =
//         -((event.clientY - rect.top) / rect.height) * 2 + 1;
//     });

//     hero.addEventListener("mouseleave", () => {
//       this.mouse.targetX = 0;
//       this.mouse.targetY = 0;
//     });
//   }

//   loadCharacter() {
//     const loader = new GLTFLoader();

//     const modelUrl =
//       `${window.CTH_DATA.pluginUrl}dist/models/character.glb`;

//     console.log("Loading character:", modelUrl);

//     loader.load(
//       modelUrl,

//       (gltf) => {
//         console.log("MODEL LOADED SUCCESSFULLY", gltf);

//         this.character = gltf.scene;

//         /*
//         --------------------------------
//         DON'T FORCE ROTATION YET
//         --------------------------------
//         */

//         this.character.rotation.set(0, 0, 0);

//         /*
//         --------------------------------
//         CALCULATE ORIGINAL MODEL SIZE
//         --------------------------------
//         */

//         const box = new THREE.Box3().setFromObject(
//           this.character
//         );

//         const size = new THREE.Vector3();

//         box.getSize(size);

//         const center = new THREE.Vector3();

//         box.getCenter(center);

//         console.log("MODEL SIZE:", size);
//         console.log("MODEL CENTER:", center);

//         /*
//         --------------------------------
//         CENTER THE MODEL
//         --------------------------------
//         */

//         this.character.position.x = -center.x;
//         this.character.position.y = -center.y;
//         this.character.position.z = -center.z;

//         /*
//         --------------------------------
//         AUTOMATIC SCALE
//         --------------------------------
//         */

//         const maxDimension = Math.max(
//           size.x,
//           size.y,
//           size.z
//         );

//         const desiredSize = 7;

//         const scale = desiredSize / maxDimension;

//         this.character.scale.setScalar(scale);

//         /*
//         --------------------------------
//         PRESERVE MATERIALS AND COLORS
//         --------------------------------
//         */

//         this.character.traverse((child) => {
//           if (!child.isMesh) return;

//           const oldMaterial = child.material;

//           // Handle single or multiple materials
//           const materials = Array.isArray(oldMaterial)
//             ? oldMaterial
//             : [oldMaterial];

//           const newMaterials = materials.map((material) => {

//             // Get the original texture from GLB
//             const texture = material.map || null;

//             if (texture) {
//               texture.colorSpace = THREE.SRGBColorSpace;
//               texture.needsUpdate = true;
//             }

//             // Use unlit material so original colors stay visible
//             return new THREE.MeshBasicMaterial({
//               map: texture,
//               color: 0xffffff,
//               transparent: true,
//               side: THREE.DoubleSide,
//               alphaTest: 0.01
//             });
//           });

//           // Apply material
//           child.material = Array.isArray(oldMaterial)
//             ? newMaterials
//             : newMaterials[0];
//         });

//         /*
//         --------------------------------
//         ADD CHARACTER
//         --------------------------------
//         */

//         this.modelGroup.add(this.character);

//         this.modelGroup.position.set(0, 0, 0);

//         this.scene.add(this.modelGroup);

//         console.log("CHARACTER ADDED TO SCENE");
//       },

//       undefined,

//       (error) => {
//         console.error("GLB LOADING ERROR:", error);
//       }
//     );
//   }

// //   handleClick() {
// //   // 
// //   const hero = document.querySelector("#custom-three-hero");

// //   if (!hero) {
// //     console.error("Custom Three Hero section not found");
// //     return;
// //   }

// //   const textContent = hero.querySelector(".cth-click-content");

// //   console.log("CLICK CONTENT:", textContent);

// //   if (!textContent) {
// //     console.error("CLICK CONTENT NOT FOUND");
// //     return;
// //   }

// //   textContent.classList.add("active");

// //   this.characterTargetX = 2.4;

// //   console.log("Character clicked successfully!");
// //   //   "cth-click-content"
// //   // );

// //   // if (!textContent) {
// //   //   console.error("Text content not found");
// //   //   return;
// //   // }

// //   // // Prevent repeating the animation unnecessarily
// //   // if (this.isCharacterClicked) return;

// //   // this.isCharacterClicked = true;

// //   // // Show text
// //   // textContent.classList.add("active");

// //   // // Smoothly move character to the right
// //   // this.characterTargetX = 0.8;

// //   // console.log("Character clicked - text shown");
// // }

// // update() {
// //     if (!this.modelGroup) return;

// //     // Smooth mouse movement
// //     const mouseSpeed = 0.35;

// //     this.mouse.x +=
// //         (this.mouse.targetX - this.mouse.x) * mouseSpeed;

// //     this.mouse.y +=
// //         (this.mouse.targetY - this.mouse.y) * mouseSpeed;


// //     // =========================
// //     // CHARACTER ROTATION
// //     // =========================

// //     // Strong left/right rotation
// //     const targetRotationY =
// //         this.mouse.x * 0.5;

// //     // Limited up/down rotation
// //     const targetRotationX =
// //         -this.mouse.y * 0.06;


// //     this.modelGroup.rotation.y +=
// //         (targetRotationY - this.modelGroup.rotation.y) * 0.18;

// //     this.modelGroup.rotation.x +=
// //         (targetRotationX - this.modelGroup.rotation.x) * 0.18;


// //     // =========================
// //     // CHARACTER POSITION
// //     // =========================

// //     // Character moves slightly left/right
// //     const targetX =
// //         this.characterTargetX +
// //         this.mouse.x * 0.08;

// //     // Very limited vertical movement
// //     const targetY =
// //         this.mouse.y * 0.025;


// //     this.modelGroup.position.x +=
// //         (targetX - this.modelGroup.position.x) * 0.12;

// //     this.modelGroup.position.y +=
// //         (targetY - this.modelGroup.position.y) * 0.15;
// // }


// // update() {
// //     if (!this.modelGroup) return;

// //     // =========================
// //     // SMOOTH MOUSE MOVEMENT
// //     // =========================

// //     const mouseSpeed = 0.35;

// //     this.mouse.x +=
// //         (this.mouse.targetX - this.mouse.x) * mouseSpeed;

// //     this.mouse.y +=
// //         (this.mouse.targetY - this.mouse.y) * mouseSpeed;


// //     // =========================
// //     // CHARACTER ROTATION
// //     // =========================

// //     // Left / Right rotation
// //     const targetRotationY =
// //         this.mouse.x * 0.5;

// //     // Limited Up / Down rotation
// //     const targetRotationX =
// //         -this.mouse.y * 0.06;


// //     // Smooth rotation
// //     this.modelGroup.rotation.y +=
// //         (targetRotationY - this.modelGroup.rotation.y) * 0.18;

// //     this.modelGroup.rotation.x +=
// //         (targetRotationX - this.modelGroup.rotation.x) * 0.18;


// //     // =========================
// //     // CHARACTER POSITION
// //     // =========================

// //     // Left / Right movement
// //     const targetX =
// //         this.characterTargetX +
// //         this.mouse.x * 0.08;


// //     // Keep the larger character lower
// //     // so the head does not get cut
// //     const targetY =
// //         -0.35 +
// //         this.mouse.y * 0.025;


// //     // Smooth horizontal movement
// //     this.modelGroup.position.x +=
// //         (targetX - this.modelGroup.position.x) * 0.12;


// //     // Smooth vertical movement
// //     this.modelGroup.position.y +=
// //         (targetY - this.modelGroup.position.y) * 0.15;
// // }


// // handleClick() {
// //     const hero = document.querySelector("#custom-three-hero");

// //     if (!hero) {
// //         console.error("Custom Three Hero section not found");
// //         return;
// //     }

// //     const textContent = hero.querySelector(".cth-click-content");

// //     if (!textContent) {
// //         console.error("CLICK CONTENT NOT FOUND");
// //         return;
// //     }

// //     // Prevent repeated clicks
// //     if (this.isCharacterClicked) return;

// //     // Mark character as clicked
// //     this.isCharacterClicked = true;

// //     // Show text
// //     textContent.classList.add("active");

// //     // Move character to the right
// //     this.characterTargetX = 0.8;

// //     console.log("Character clicked - mouse movement disabled");
// // }


// handleClick() {
//     const hero = document.querySelector("#custom-three-hero");

//     if (!hero) return;

//     const textContent = hero.querySelector(".cth-click-content");

//     if (!textContent) {
//         console.error("CLICK CONTENT NOT FOUND");
//         return;
//     }

//     // Prevent repeated clicks
//     if (this.isCharacterClicked) return;

//     // Disable mouse interaction
//     this.isCharacterClicked = true;

//     // Show text
//     textContent.classList.add("active");

//     // Move character to the RIGHT
//     this.characterTargetX = 2.2;

//     console.log("Character clicked");
// }


// update() {
//     if (!this.modelGroup) return;


//     // =========================
//     // BEFORE CLICK
//     // MOUSE INTERACTION
//     // =========================

//     if (!this.isCharacterClicked) {

//         const mouseSpeed = 0.35;

//         this.mouse.x +=
//             (this.mouse.targetX - this.mouse.x) * mouseSpeed;

//         this.mouse.y +=
//             (this.mouse.targetY - this.mouse.y) * mouseSpeed;


//         // Character rotation
//         const targetRotationY =
//             this.mouse.x * 0.45;

//         const targetRotationX =
//             -this.mouse.y * 0.035;


//         this.modelGroup.rotation.y +=
//             (targetRotationY - this.modelGroup.rotation.y) * 0.18;

//         this.modelGroup.rotation.x +=
//             (targetRotationX - this.modelGroup.rotation.x) * 0.18;
//     }


//     // =========================
//     // AFTER CLICK
//     // STOP MOUSE + STRAIGHTEN
//     // =========================

//     if (this.isCharacterClicked) {

//         // Reset mouse values
//         this.mouse.x = 0;
//         this.mouse.y = 0;

//         // Return character smoothly to straight position
//         this.modelGroup.rotation.y +=
//             (0 - this.modelGroup.rotation.y) * 0.08;

//         this.modelGroup.rotation.x +=
//             (0 - this.modelGroup.rotation.x) * 0.08;
//     }


//     // =========================
//     // CHARACTER POSITION
//     // =========================

//     let targetX;
//     let targetY;


//     if (!this.isCharacterClicked) {

//         // Before click:
//         // small mouse movement

//         targetX =
//             this.characterTargetX +
//             this.mouse.x * 0.06;

//         targetY =
//             this.characterBaseY +
//             this.mouse.y * 0.015;

//     } else {

//         // After click:
//         // move ONLY to the right

//         targetX = this.characterTargetX;

//         targetY = this.characterBaseY;
//     }


//     // =========================
//     // SMOOTH POSITION MOVEMENT
//     // =========================

//     this.modelGroup.position.x +=
//         (targetX - this.modelGroup.position.x) * 0.08;

//     this.modelGroup.position.y +=
//         (targetY - this.modelGroup.position.y) * 0.12;
// }

// }



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
    this.characterBaseY = -0.65;

    // Track click state
    this.isCharacterClicked = false;


    // =====================================
    // NEW: HEAD TEXT
    // =====================================

    this.headText = document.querySelector(
      ".cth-head-text"
    );

    this.headPosition = new THREE.Vector3();


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

    // const modelUrl =
    //   `${window.CTH_DATA.pluginUrl}dist/models/character.glb`;


    const modelUrl = window.CTH_DATA.pluginUrl +
    "dist/models/character.glb";

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

        const desiredSize = 7;

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


        // =====================================
        // NEW: CALCULATE CHARACTER HEAD POSITION
        // =====================================

        // const scaledBox = new THREE.Box3()
        //   .setFromObject(this.modelGroup);

        // const scaledSize = new THREE.Vector3();

        // scaledBox.getSize(scaledSize);

        // this.headOffset = new THREE.Vector3(
        //   0,
        //   scaledSize.y * 0.32,
        //   0
        // );

      },

      undefined,

      (error) => {
        console.error("GLB LOADING ERROR:", error);
      }
    );
  }


 handleClick() {

    const hero = document.querySelector(
        "#custom-three-hero"
    );

    if (!hero) return;

    if (this.isCharacterClicked) return;


    const textContent =
        hero.querySelector(".cth-click-content");


    if (!textContent) {
        console.error("CLICK CONTENT NOT FOUND");
        return;
    }


    // =====================================
    // CHANGE CLICK STATE
    // =====================================

    this.isCharacterClicked = true;


    // =====================================
    // HIDE CLICK ME
    // =====================================

    if (this.headText) {

        this.headText.style.opacity = "0";

        this.headText.style.visibility =
            "hidden";

        this.headText.style.pointerEvents =
            "none";
    }


    // =====================================
    // SHOW LEFT TEXT
    // =====================================

    textContent.classList.add("active");


    // =====================================
    // MOVE CHARACTER RIGHT
    // =====================================

    this.characterTargetX = 2.2;


    console.log("Character clicked successfully");
}

  // =====================================
  // NEW: UPDATE HEAD TEXT POSITION
  // =====================================

  updateHeadText() {

  if (
    !this.headText ||
    !this.character ||
    !this.experience.camera
  ) {
    return;
  }

  this.scene.updateMatrixWorld(true);


  // =====================================
  // CREATE FIXED HEAD ANCHOR ONCE
  // =====================================

  if (!this.headAnchor) {

    const box = new THREE.Box3()
      .setFromObject(this.character);

    const size = new THREE.Vector3();
    box.getSize(size);

    const center = new THREE.Vector3();
    box.getCenter(center);


    /*
    Fixed LOCAL position on the head.

    This is created once and stays
    attached to the character.
    */

    const worldHeadPosition = new THREE.Vector3(
      center.x,
      box.max.y - size.y * 0.26,
      box.max.z + 0.05
    );


    /*
    Convert WORLD position to the
    character's LOCAL coordinate system.
    */

    this.headAnchor =
      this.character.worldToLocal(
        worldHeadPosition.clone()
      );
  }


  // =====================================
  // CONVERT FIXED LOCAL POINT
  // TO WORLD POSITION
  // =====================================

  const headPosition =
    this.headAnchor.clone();

  this.character.localToWorld(
    headPosition
  );


  // =====================================
  // PROJECT 3D POSITION TO SCREEN
  // =====================================

  headPosition.project(
    this.experience.camera.instance
  );


  const hero = this.experience.hero;


  const x =
    (headPosition.x * 0.5 + 0.5) *
    hero.clientWidth;

  const y =
    (-headPosition.y * 0.5 + 0.5) *
    hero.clientHeight;


  // =====================================
  // UPDATE TEXT POSITION
  // =====================================

  this.headText.style.left =
    `${x}px`;

  this.headText.style.top =
    `${y}px`;
}


  update() {

    if (!this.modelGroup) return;


    // =====================================
    // SMOOTH MOUSE MOVEMENT
    // THIS WORKS BEFORE AND AFTER CLICK
    // =====================================

    const mouseSpeed = 0.35;

    this.mouse.x +=
        (this.mouse.targetX - this.mouse.x) *
        mouseSpeed;

    this.mouse.y +=
        (this.mouse.targetY - this.mouse.y) *
        mouseSpeed;


    // =====================================
    // CHARACTER ROTATION WITH MOUSE
    // THIS ALSO WORKS AFTER CLICK
    // =====================================

    const targetRotationY =
        this.mouse.x * 0.45;

    const targetRotationX =
        -this.mouse.y * 0.035;


    this.modelGroup.rotation.y +=
        (
            targetRotationY -
            this.modelGroup.rotation.y
        ) * 0.18;


    this.modelGroup.rotation.x +=
        (
            targetRotationX -
            this.modelGroup.rotation.x
        ) * 0.18;


    // =====================================
    // CHARACTER POSITION
    // =====================================

    let targetX;
    let targetY;


    if (!this.isCharacterClicked) {

        // BEFORE CLICK
        // Character stays in original position
        // with small mouse movement

        targetX =
            this.characterTargetX +
            this.mouse.x * 0.06;

        targetY =
            this.characterBaseY +
            this.mouse.y * 0.015;

    } else {

        // AFTER CLICK
        // Character moves right
        // but still has small mouse movement

        targetX =
            this.characterTargetX +
            this.mouse.x * 0.06;

        targetY =
            this.characterBaseY +
            this.mouse.y * 0.015;
    }


    // =====================================
    // SMOOTH CHARACTER MOVEMENT
    // =====================================

    this.modelGroup.position.x +=
        (
            targetX -
            this.modelGroup.position.x
        ) * 0.08;


    this.modelGroup.position.y +=
        (
            targetY -
            this.modelGroup.position.y
        ) * 0.12;


    // =====================================
    // UPDATE CLICK ME TEXT
    // ONLY BEFORE CLICK
    // =====================================

    if (!this.isCharacterClicked) {
        this.updateHeadText();
    }
}
}