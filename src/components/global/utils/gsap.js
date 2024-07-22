import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(TextPlugin, SplitText, ScrollTrigger);

export { gsap, TextPlugin, SplitText, ScrollTrigger }

export const addParallax = (element, distance = "15%") => {
    gsap.to(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top top',
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