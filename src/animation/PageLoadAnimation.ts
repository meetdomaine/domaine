export const animatePageLoad = ( element: HTMLElement ) => {

  const removePendingAttribute = () => {
    console.log('fire')
    element.dataset.animate = "false";
  }

  document.addEventListener("astro:page-load", () => {
    removePendingAttribute()
  })

  document.addEventListener("astro:after-swap", () => {
    removePendingAttribute()
  })

  // setTimeout(() => {
  //   removePendingAttribute()
  // }, 2000);

}