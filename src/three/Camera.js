import * as THREE from "three";

export default class Camera {
  constructor(experience) {
    this.experience = experience;

    this.instance = new THREE.PerspectiveCamera(
      35,
      experience.sizes.width / experience.sizes.height,
      0.1,
      100
    );

    this.instance.position.set(0, 0, 7);

    experience.scene.add(this.instance);
  }

  resize() {
    this.instance.aspect =
      this.experience.sizes.width /
      this.experience.sizes.height;

    this.instance.updateProjectionMatrix();
  }
}