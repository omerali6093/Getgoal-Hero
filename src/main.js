import "./styles/style.css";

import Experience from "./three/Experience.js";

const hero = document.querySelector("#custom-three-hero");

if (hero) {
  new Experience(hero);
}

// import "./styles/style.css";

// console.log("CUSTOM THREE HERO JS IS RUNNING");

// document.addEventListener("DOMContentLoaded", () => {
//   const hero = document.querySelector("#custom-three-hero");

//   console.log("Hero found:", hero);

//   if (!hero) return;

//   hero.style.border = "5px solid red";
// });