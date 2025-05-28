
  import Lenis from '@studio-freight/lenis'
  export let lenis;

  export const initLenis = () => {
    lenis = new Lenis({ 
      lerp: 0.2,
      easing: (t) => {
        1 - Math.pow(1 - t, 5);
      }
    })

    // lenis.lerp = 0.9

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    } 

    const links = Array.from(document.getElementsByTagName('a'))
    links.forEach((link) => {
      const jumplinkValue = link.dataset.jumplink
      if (jumplinkValue === "false") return
      link.addEventListener("click", () => {
        lenis.scrollTo(jumplinkValue, {
          easing: (t) => {
            1 - Math.pow(1 - t, 5);
          },
          offset: -200,
        })
      })
    })

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

