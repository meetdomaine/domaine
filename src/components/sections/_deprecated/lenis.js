import Lenis from '@studio-freight/lenis'
export let lenis;
const htmlElement = document.querySelector("html");

document.addEventListener("astro:page-load", () => {

  lenis = new Lenis()

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
    
  requestAnimationFrame(raf)

  // htmlElement.dataset.loading = "false";
})

document.addEventListener("astro:before-preparation", () => {
  lenis.stop();
  // htmlElement.dataset.loading = "true";
})

document.addEventListener("astro:after-swap", () => {
  lenis.start();
  // htmlElement.dataset.loading = "false";
})
