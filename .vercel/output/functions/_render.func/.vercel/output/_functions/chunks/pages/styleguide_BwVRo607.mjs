import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from '../astro_DqcxPQpM.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import 'cssesc';
import { $ as $$Header, a as $$Icon, b as $$Layout } from './index_Cp5NfYYj.mjs';
/* empty css                               */

const $$Astro = createAstro("https://domaine-2-0.vercel.app/");
const $$Styleguide = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Styleguide;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Styleguide", "data-astro-cid-3xbz2sym": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "data-astro-cid-3xbz2sym": true })} ${maybeRenderHead()}<section class="section-typography" data-astro-cid-3xbz2sym> <h1 data-astro-cid-3xbz2sym>Heading 1</h1> <h2 data-astro-cid-3xbz2sym>Heading 2</h2> <h3 data-astro-cid-3xbz2sym>Heading 3</h3> <h4 data-astro-cid-3xbz2sym>Heading 4</h4> <h5 data-astro-cid-3xbz2sym>Heading 5</h5> <h6 data-astro-cid-3xbz2sym>Heading 6</h6> <p data-astro-cid-3xbz2sym>Lorem ipsum dolor sit amet.</p> <p class="caption" data-astro-cid-3xbz2sym>Caption</p> </section> <section class="section-spacers" data-astro-cid-3xbz2sym> <span class="spacer spacer-4xl" data-astro-cid-3xbz2sym></span> <span class="spacer spacer-3xl" data-astro-cid-3xbz2sym></span> <span class="spacer spacer-2xl" data-astro-cid-3xbz2sym></span> <span class="spacer spacer-xl" data-astro-cid-3xbz2sym></span> <span class="spacer spacer-lg" data-astro-cid-3xbz2sym></span> <span class="spacer spacer-md" data-astro-cid-3xbz2sym></span> <span class="spacer spacer-sm" data-astro-cid-3xbz2sym></span> <span class="spacer spacer-xs" data-astro-cid-3xbz2sym></span> <span class="spacer spacer-2xs" data-astro-cid-3xbz2sym></span> </section> <section class="section-buttons" data-astro-cid-3xbz2sym> <a class="button" data-astro-cid-3xbz2sym>Button Primary${renderComponent($$result2, "Icon", $$Icon, { "glyph": "arrow", "size": "medium", "data-astro-cid-3xbz2sym": true })}</a> <a class="button button-secondary" data-astro-cid-3xbz2sym>Button Secondary${renderComponent($$result2, "Icon", $$Icon, { "glyph": "arrow", "size": "medium", "data-astro-cid-3xbz2sym": true })}</a> <a class="button button-tertiary" data-astro-cid-3xbz2sym>Button Tertiary${renderComponent($$result2, "Icon", $$Icon, { "glyph": "arrow", "size": "medium", "data-astro-cid-3xbz2sym": true })}</a> </section> ` })} `;
}, "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/styleguide.astro", void 0);

const $$file = "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/styleguide.astro";
const $$url = "/styleguide";

export { $$Styleguide as default, $$file as file, $$url as url };
