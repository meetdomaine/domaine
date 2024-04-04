import Lenis from '@studio-freight/lenis'
	
export const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

const htmlElement = document.querySelector("html");

document.addEventListener("astro:before-preparation", () => {
  lenis.stop();
  htmlElement.dataset.loading = "true";
})

document.addEventListener("astro:page-load", () => {
  // console.log("Load")
  lenis.start();
  htmlElement.dataset.loading = "false";
})

