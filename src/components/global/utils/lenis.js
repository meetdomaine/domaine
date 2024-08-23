
  import Lenis from '@studio-freight/lenis'
  export let lenis;

  export const initLenis = () => {
    lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    } 
    requestAnimationFrame(raf)
  }

  export const scrollTo = (target) => {
    if (lenis) lenis.scrollTo(target)
  }

  document.addEventListener("DOMContentLoaded", () => {
    initLenis()
  })

  // document.addEventListener("astro:page-load", () => {
  //   initLenis()
  // })

  // document.addEventListener("astro:before-preparation", () => {
  //   lenis.stop();
  // })

  // document.addEventListener("astro:after-swap", () => {
  //   lenis.start();
  // })

