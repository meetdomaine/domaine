import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(TextPlugin, SplitText);

export { gsap, TextPlugin, SplitText }

export const fadeUp = (element, timeline, delay, stagger) => {
    timeline.from(element, {
        opacity: 0,
        y: 30,
        autoAlpha: 0,
        stagger: stagger
    }, delay)
}