import Lenis from '@studio-freight/lenis'

export let lenis;

const htmlElement = document.querySelector("html");


	


console.log('lenis setup')


document.addEventListener("astro:before-preparation", () => {

  // lenis.stop();
  lenis.destroy();
  htmlElement.dataset.loading = "true";
})

document.addEventListener("astro:page-load", () => {

  lenis = new Lenis()

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
    
  requestAnimationFrame(raf)

  // console.log("Load")
  // lenis.start();
  htmlElement.dataset.loading = "false";
})

