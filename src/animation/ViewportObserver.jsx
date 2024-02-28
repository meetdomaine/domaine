import { children, mergeProps } from "solid-js";

export default function ViewportObserver(props) {

  const childElements = children(() => props.children.children[0])

  const defaultSettings = {
    bidirectional: true,
    rootMargin: "20% 0% 20% 0%",
    threshold: 0.7,
    delay: 0
  } 

  const mergedProps = mergeProps(defaultSettings, props);

  const options = {
    bidirectional: mergedProps.bidirectional,
    rootMargin: mergedProps.rootMargin,
    threshold: mergedProps.threshold,
    delay: mergedProps.delay,
  };

  const event = new Event("inView");

  const callback = (entries, observer) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.dispatchEvent(event);
          return entry.target.dataset.animate = false
        }, mergedProps.delay)
      } 

      if (mergedProps.bidirectional) {
        return entry.target.dataset.animate = true
      }

    });
  };

  
  const setupObserver = () => {

    let viewportAnimationObserver = new IntersectionObserver(callback, options);

    if (childElements().length > 1) {
      for (let i = 0; i < childElements().length; i++) {
        childElements()[i].dataset.animate = true
        viewportAnimationObserver.observe(childElements()[i])
      }
    } else {
      childElements().dataset.animate = true
      viewportAnimationObserver.observe(childElements())
    }
  }

  document.addEventListener('astro:page-load', () => {
    // console.log('load')
    setupObserver();
  })

  return <>{childElements()}</>

}