import * as THREE from "three";

export default class Renderer {
  constructor(experience) {
    this.experience = experience;

    this.instance = new THREE.WebGLRenderer({
      canvas: experience.canvas,
      alpha: true,
      antialias: true
    });

    this.instance.setSize(
      experience.sizes.width,
      experience.sizes.height
    );

    this.instance.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    this.instance.outputColorSpace =
      THREE.SRGBColorSpace;
  }

  resize() {
    this.instance.setSize(
      this.experience.sizes.width,
      this.experience.sizes.height
    );

    this.instance.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );
  }

  render() {
    this.instance.render(
      this.experience.scene,
      this.experience.camera.instance
    );
  }
}