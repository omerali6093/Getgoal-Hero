import gsap from "gsap";

export function playCharacterClickAnimation(world) {

  const character = world.character;
  const experience = world.experience;

  const hero = experience.hero;

  const mainContent =
    hero.querySelector(".cth-content");

  const clickContent =
    hero.querySelector(".cth-click-content");

  const interaction =
    hero.querySelector(".cth-interaction");


  const timeline = gsap.timeline();


  timeline.to(
    mainContent,
    {
      opacity: 0,
      x: -50,
      duration: 0.6
    },
    0
  );


  timeline.to(
    interaction,
    {
      opacity: 0,
      y: 20,
      duration: 0.4
    },
    0
  );


  timeline.to(
    experience.camera.instance.position,
    {
      z: 5,
      duration: 1.4,
      ease: "power3.inOut"
    },
    0
  );


  timeline.to(
    character.rotation,
    {
      y: -0.15,
      duration: 1,
      ease: "power2.out"
    },
    0.2
  );


  timeline.to(
    clickContent,
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    },
    0.8
  );
}