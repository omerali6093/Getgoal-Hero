import * as THREE from "three";

import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World.js";

export default class Experience {
  constructor(hero) {
    this.hero = hero;

    this.canvas = hero.querySelector(".cth-canvas");

    // Three.js scene
    this.scene = new THREE.Scene();

    // Hero size
    this.sizes = {
      width: hero.clientWidth,
      height: hero.clientHeight
    };

    // Mouse position
    this.mouse = {
      x: 0,
      y: 0
    };

    // Clock
    this.clock = new THREE.Clock();

    // Three.js components
    this.camera = new Camera(this);
    this.renderer = new Renderer(this);
    this.world = new World(this);

    // Load browser speech voices
    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices();

      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }

    // Events
    this.setupEvents();

    // Start animation loop
    this.tick();
  }

  setupEvents() {
    // Mouse movement
    this.hero.addEventListener("mousemove", (event) => {
      const rect = this.hero.getBoundingClientRect();

      this.mouse.x =
        ((event.clientX - rect.left) / rect.width) * 2 - 1;

      this.mouse.y =
        -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    });

    // Click event
    this.hero.addEventListener("click", (event) => {
      this.world.handleClick(event);
    });

    // Touch tap detection for Mobile & Tablet
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    this.hero.addEventListener(
      "touchstart",
      (event) => {
        if (event.touches.length === 1) {
          touchStartX = event.touches[0].clientX;
          touchStartY = event.touches[0].clientY;
          touchStartTime = Date.now();
        }
      },
      { passive: true }
    );

    this.hero.addEventListener(
      "touchend",
      (event) => {
        // Do not trigger character click if touching the sound toggle button
        const target = event.target;
        if (target && target.closest && target.closest(".cth-sound-toggle")) {
          return;
        }

        if (event.changedTouches.length === 1) {
          const deltaX = Math.abs(
            event.changedTouches[0].clientX - touchStartX
          );
          const deltaY = Math.abs(
            event.changedTouches[0].clientY - touchStartY
          );
          const duration = Date.now() - touchStartTime;

          // Quick tap with minimal displacement (< 15px, < 350ms)
          if (deltaX < 15 && deltaY < 15 && duration < 350) {
            this.world.handleClick(event);
          }
        }
      },
      { passive: true }
    );

    // Resize
    window.addEventListener("resize", () => {
      this.resize();
    });
  }

  resize() {
    this.sizes.width = this.hero.clientWidth;
    this.sizes.height = this.hero.clientHeight;

    this.camera.resize();
    this.renderer.resize();
  }

  // tick() {
  //   // const elapsedTime = this.clock.getElapsedTime();

  //   this.world.update(elapsedTime);

  //   this.renderer.render();

  //   window.requestAnimationFrame(() => {
  //     this.tick();
  //   });
  // }

  tick() {
    this.world.update();

    this.renderer.instance.render(
      this.scene,
      this.camera.instance
    );

    requestAnimationFrame(() => {
      this.tick();
    });
  }

}