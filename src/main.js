import "./styles/style.css";

import Experience from "./three/Experience.js";

const hero = document.querySelector("#custom-three-hero");

if (hero) {
  new Experience(hero);
}