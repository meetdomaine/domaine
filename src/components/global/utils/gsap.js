import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase, ScrollToPlugin } from "gsap/all";

gsap.registerPlugin(TextPlugin, SplitText, ScrollTrigger, ScrollToPlugin, CustomEase);

export { gsap, TextPlugin, SplitText, ScrollTrigger }

export const addParallax = (element, distance = "30%") => {
    gsap.to(element, {scale: 1.1, duration: 0})
    gsap.to(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top middle',
            end: 'bottom top',
            scrub: true,
        },
        y: distance,
    });
}

export const fadeUp = (element, timeline, delay, stagger) => {
    timeline.from(element, {
        opacity: 0,
        y: 30,
        autoAlpha: 0,
        stagger: stagger
    }, delay)
}

export const zoomIn = (element, timeline, delay, stagger) => {
    timeline.from(element, {
        scrollTrigger: element,
        opacity: 0,
        scale: 1.2,
        // autoAlpha: 0,
        // stagger: stagger
    }, delay)
}

CustomEase.create( "cubic", "M0,0 C0.22,1 0.36,1 1,1 ")    
CustomEase.create("expo", "M0,0 C0.16,1 0.3,1 1,1 ");