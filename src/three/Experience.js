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

  tick() {
    const elapsedTime = this.clock.getElapsedTime();

    this.world.update(elapsedTime);

    this.renderer.render();

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}