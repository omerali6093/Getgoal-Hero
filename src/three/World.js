import * as THREE from "three";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import gsap from "gsap";

import {
  playCharacterClickAnimation
} from "../animations/hero.js";


export default class World {
  constructor(experience) {
    this.experience = experience;

    this.scene = experience.scene;

    this.character = null;

    this.isClicked = false;

    this.raycaster = new THREE.Raycaster();

    this.pointer = new THREE.Vector2();

    this.loadCharacter();
  }


  loadCharacter() {
    const loader = new GLTFLoader();

    const modelUrl =
      `${CTH_DATA.pluginUrl}dist/models/character.glb`;


    loader.load(

      modelUrl,

      // SUCCESS
      (gltf) => {

        this.character = gltf.scene;

        this.scene.add(this.character);


        // Get model center
        const box = new THREE.Box3()
          .setFromObject(this.character);

        const center = new THREE.Vector3();

        box.getCenter(center);


        // Center the model
        this.character.position.sub(center);


        // Responsive scale
        if (window.innerWidth < 768) {

          this.targetScale = 1.6;

          this.character.position.x = 0.3;

        } else {

          this.targetScale = 2.2;

          this.character.position.x = 1.5;

        }


        // Start tiny for intro animation
        this.character.scale.set(
          0.01,
          0.01,
          0.01
        );


        // Animate character in
        gsap.to(
          this.character.scale,
          {
            x: this.targetScale,
            y: this.targetScale,
            z: this.targetScale,

            duration: 1.5,

            ease: "power3.out"
          }
        );


        // Show hero content
        const content =
          this.experience.hero.querySelector(
            ".cth-content"
          );

        gsap.to(
          content,
          {
            opacity: 1,
            y: 0,

            duration: 1,

            delay: 0.3,

            ease: "power3.out"
          }
        );


        console.log(
          "Character loaded successfully!"
        );
      },


      // PROGRESS
      (xhr) => {

        if (xhr.total) {

          const progress =
            (xhr.loaded / xhr.total) * 100;

          console.log(
            `Loading: ${progress.toFixed(0)}%`
          );
        }
      },


      // ERROR
      (error) => {

        console.error(
          "Character loading error:",
          error
        );
      }

    );
  }


  handleClick(event) {

    if (
      !this.character ||
      this.isClicked
    ) {
      return;
    }


    const rect =
      this.experience.canvas
        .getBoundingClientRect();


    this.pointer.x =
      (
        (event.clientX - rect.left) /
        rect.width
      ) * 2 - 1;


    this.pointer.y =
      -(
        (event.clientY - rect.top) /
        rect.height
      ) * 2 - 1;


    this.raycaster.setFromCamera(
      this.pointer,
      this.experience.camera.instance
    );


    const intersects =
      this.raycaster.intersectObject(
        this.character,
        true
      );


    if (intersects.length > 0) {

      this.isClicked = true;

      playCharacterClickAnimation(this);
    }
  }


  update(elapsedTime) {

    if (!this.character) {
      return;
    }


    if (!this.isClicked) {

      // Floating effect
      this.character.position.y =
        Math.sin(elapsedTime * 1.2) * 0.08;


      // Smooth mouse movement
      this.character.rotation.y +=
        (
          this.experience.mouse.x * 0.2 -
          this.character.rotation.y
        ) * 0.04;


      this.character.rotation.x +=
        (
          this.experience.mouse.y * 0.08 -
          this.character.rotation.x
        ) * 0.04;
    }
  }
}