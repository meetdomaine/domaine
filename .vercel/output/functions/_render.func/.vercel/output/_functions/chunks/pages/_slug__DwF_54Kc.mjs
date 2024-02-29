import { c as createAstro, d as createComponent, r as renderTemplate } from '../astro_DEkkr4aR.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import 'cssesc';

const $$Astro = createAstro("https://domaine-2-0.vercel.app/");
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  return renderTemplate``;
}, "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/work/[slug].astro", void 0);

const $$file = "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/work/[slug].astro";
const $$url = "/work/[slug]";

export { $$slug as default, $$file as file, $$url as url };
