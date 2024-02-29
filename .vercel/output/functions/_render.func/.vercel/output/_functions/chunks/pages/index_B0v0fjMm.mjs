import 'html-escaper';
import 'cssesc';
import { c as createAstro, d as createComponent, r as renderTemplate, h as addAttribute, m as maybeRenderHead, i as renderComponent, j as renderSlot, k as renderHead } from '../astro_DEkkr4aR.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                          */
/* empty css                          */
/* empty css                          */
/* empty css                          */
/* empty css                           */
import { ssr, ssrHydrationKey, escape, createComponent as createComponent$1, For, Show, Match, ssrAttribute } from 'solid-js/web';
import { createSignal, onMount, Switch } from 'solid-js';
/* empty css                           */
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
/* empty css                           */

const $$Astro$l = createAstro("https://domaine-2-0.vercel.app/");
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/node_modules/astro/components/ViewTransitions.astro", void 0);

const client = createClient({
  projectId: '87sa1ng7',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-12-12', // use current date (YYYY-MM-DD) to target the latest API version
});

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source)
}

async function getSEOSettings() {
  const content = await client.fetch(`*[_type == "seoSettings"]`);
  return content
}

async function getHeaderContent() {
  const content = await client.fetch(`*[_type == "sectionHeader"]`);
  return content
}

const sectionBlocks = (`
  _type == "sectionHero" => {
    _type, eyebrow, heading, subheading, textAlignment, image, imageAlt, "videoURL": video.asset -> url, "imageURL": image.asset -> url, badgeText, buttonText, buttonURL, jumplink
  },
  _type == "sectionClients" => {
    _type, clients[]->{name, slug, image, logo, url}
  },
  _type == "sectionAbout" => {
    _type, heading, subheading, stats, "videoURL": video.asset -> url, image
  },
  _type == "sectionServices" => {
    _type, heading, subheading, services[]
  },
  _type == "sectionContact" => {
    _type, heading, subheading, forms[]
  },
  _type == "sectionWork" => {
    _type, heading, subheading, categories[]->{name, slug}, projects[]->{title, slug, "clientName": client->name, "categories": categories[]->slug.current, thumbnailImage, showThumbnailVideo, "videoURL": thumbnailVideo.asset->url }
  },
  _type == "sectionPartners" => {
    _type, heading, subheading, inlineLogo, logos[]
  },
  _type == "sectionAgencies" => {
    _type, heading, agencies[]
  }
`);

async function getFooterContent() {
  const content = await client.fetch(`*[_type == "sectionFooter"]`);
  return content
}

async function getHomePageContent() {
  const content = await client.fetch(`*[_type == "pageHome"]{ 
    content[]{
      ${sectionBlocks}
    } 
  }`);
  return content
}

async function getPages() {
  const content = await client.fetch(`*[_type == "pageGeneral"]{
    title,
    slug,
    content[]{
      ${sectionBlocks}
    },
    metaTitle,
    metaDescription,
    metaImage, 
  }`);
  return content
}

async function getBlogPageContent() {
  const pageContent = await client.fetch(`*[_type == "pageBlog"]{ heading, subheading, "featuredPost": featuredPost->{title, slug, excerpt, mainImage, "category": category->{name, slug}} }`);
  const posts = await client.fetch(`*[_type == "contentBlog"]{
    title, slug, excerpt, mainImage, "category": category->{ name, slug }, publishedAt
  }|order(publishedAt desc)`);
  const categories = await client.fetch(`*[_type == "categoryBlog"]`);
  return { 
    content: pageContent[0],
    posts,
    categories
  }
}

async function getBlogPosts() {
  const postContent = await client.fetch(`
    *[_type == 'contentBlog']{
      title, slug, excerpt, mainImage, "authors": authors[]->{ name, title, image }, "category": category->{ name, slug }, "categories": categories[]->{ name, slug }, publishedAt, content[]
    } | order(publishedAt desc)
  `);
  return postContent
}


// export async function getEvents() {
//   const events = await client.fetch('*[_type == "contentEvent"]');
//   return events
// }

async function getEvents() {
  const content = await client.fetch(`*[_type == "contentEvent"]{
    title,
    slug,
    location,
    content[]{
      ${sectionBlocks}
    },
    metaTitle,
    metaDescription,
    metaImage, 
  }`);
  return content
}

const $$Astro$k = createAstro("https://domaine-2-0.vercel.app/");
const $$Icon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$Icon;
  const { glyph, size = "auto" } = Astro2.props;
  return renderTemplate`${glyph === "logo" ? renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 108 21"${addAttribute(`icon-${size}`, "class")} data-astro-cid-ptcw2qjg><path fill="currentColor" d="M107.651 13.858H96.423c.224 2.8 2.184 4.172 4.088 4.172 1.764 0 3.108-.672 3.696-2.1h3.276c-.672 2.408-2.968 4.872-6.832 4.872-4.844 0-7.616-3.668-7.616-8.008 0-4.536 3.108-7.756 7.392-7.756 4.62 0 7.532 3.78 7.224 8.82Zm-7.224-6.216c-1.568 0-3.696.952-4.004 3.78h7.84c-.084-2.352-1.876-3.78-3.836-3.78Zm-18.14-2.268v2.1c.868-1.568 2.436-2.436 4.564-2.436 3.64 0 5.124 2.352 5.124 5.936v9.464h-3.332v-8.652c0-2.044-.28-4.032-2.856-4.032-2.576 0-3.5 1.96-3.5 4.676v8.008h-3.332V5.374h3.332ZM73.273.138h3.332v3.36h-3.332V.138Zm0 5.236h3.332v15.064h-3.332V5.374Zm-5.217 9.128v-1.148c-4.76.448-6.692 1.148-6.692 2.856 0 1.316 1.092 2.1 2.772 2.1 2.464 0 3.92-1.232 3.92-3.808Zm-4.648 6.3c-3.276 0-5.572-1.764-5.572-4.508 0-3.78 4.648-4.676 10.136-5.264v-.28c0-2.576-1.456-3.36-3.136-3.36-1.68 0-2.94.896-3.024 2.716h-3.276c.224-3.052 2.772-5.18 6.412-5.18 3.612 0 6.44 1.652 6.356 6.468 0 .728-.056 2.52-.056 3.892 0 1.904.14 3.892.448 5.152h-3.052c-.112-.644-.196-1.008-.28-2.044-.98 1.652-2.716 2.408-4.956 2.408ZM38.062 12.43v8.008H34.73V5.374h3.332v2.1c.867-1.568 2.352-2.436 4.367-2.436 2.352 0 3.697.98 4.396 2.66 1.316-1.904 3.024-2.66 4.9-2.66 3.584 0 4.928 2.352 4.928 5.936v9.464h-3.331v-8.652c0-2.044-.197-4.032-2.66-4.032-2.465 0-3.304 1.96-3.304 4.676v8.008h-3.332v-8.652c0-2.044-.197-4.032-2.66-4.032-2.465 0-3.304 1.96-3.304 4.676Zm-16.067.504c0 3.472 1.848 5.152 3.976 5.152s3.976-1.68 3.976-5.152c0-3.472-1.848-5.18-3.976-5.18s-3.976 1.708-3.976 5.18Zm3.976-7.896c3.668 0 7.42 2.464 7.42 7.896 0 5.46-3.752 7.868-7.42 7.868s-7.42-2.408-7.42-7.868c0-5.432 3.752-7.896 7.42-7.896Zm-12.055 5.236c0-6.412-3.92-7.28-7.811-7.28h-1.82v14.588h1.82c3.892 0 7.811-.896 7.811-7.308ZM.73.138h5.544c6.412 0 11.34 2.212 11.34 10.136 0 7.924-4.928 10.164-11.34 10.164H.729V.138Z" data-astro-cid-ptcw2qjg></path></svg>` : null}${glyph === "arrow" ? renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 16"${addAttribute(`icon-${size}`, "class")} data-astro-cid-ptcw2qjg><path stroke="currentColor" d="m10.444 12.889 4.889-4.89m0 0-4.889-4.888M15.333 8H.666" data-astro-cid-ptcw2qjg></path></svg>` : null}${glyph === "arrow-back" ? renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 16"${addAttribute(`icon-${size}`, "class")} data-astro-cid-ptcw2qjg><path stroke="currentColor" d="m6.556 3.111-4.889 4.89m0 0 4.889 4.888M1.667 8h14.667" data-astro-cid-ptcw2qjg></path></svg>` : null}${glyph === "star" ? renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25"${addAttribute(`icon-${size}`, "class")} data-astro-cid-ptcw2qjg><path stroke="currentColor" stroke-width="2" d="M12.24.233v24m12-12h-24m20.485-8.485L3.754 20.718m16.97 0L3.755 3.749" data-astro-cid-ptcw2qjg></path></svg>` : null}`;
}, "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/components/atoms/Icon.astro", void 0);

const $$Astro$j = createAstro("https://domaine-2-0.vercel.app/");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$Header;
  const data = await getHeaderContent();
  return renderTemplate`${maybeRenderHead()}<header class="header" data-animate="true" data-astro-cid-rxbhrqfy> <span class="navigation" data-astro-cid-rxbhrqfy> <a class="logo" href="/" aria-label="Domaine homepage" data-astro-cid-rxbhrqfy> ${renderComponent($$result, "Icon", $$Icon, { "glyph": "logo", "data-astro-cid-rxbhrqfy": true })} </a> <nav class="navigation-links" data-astro-cid-rxbhrqfy> ${data[0].links.map((link, i) => {
    return renderTemplate`<a class="navigation-link"${addAttribute(link.linkURL, "href")} data-astro-cid-rxbhrqfy>${link.linkText}</a>`;
  })} </nav> </span> <a class="button contact-button"${addAttribute(data[0].buttonURL, "href")} data-astro-cid-rxbhrqfy> ${data[0].buttonText} ${renderComponent($$result, "Icon", $$Icon, { "glyph": "arrow", "size": "large", "data-astro-cid-rxbhrqfy": true })} </a> </header>  `;
}, "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/components/sections/header/Header.astro", void 0);

const $$Astro$i = createAstro("https://domaine-2-0.vercel.app/");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$Footer;
  const data = await getFooterContent();
  return renderTemplate`${maybeRenderHead()}<footer class="footer" data-astro-cid-2z4xgre2> <div class="footer-inner" data-astro-cid-2z4xgre2> <p class="copyright caption" data-astro-cid-2z4xgre2>${data[0].copyright}</p> <div class="footer-links" data-astro-cid-2z4xgre2> ${data[0].links.map((link, i) => {
    return renderTemplate`<a class="footer-link caption"${addAttribute(link.linkURL, "href")} target="_blank" data-astro-cid-2z4xgre2>${link.linkText}</a>`;
  })} </div> </div> </footer> `;
}, "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/components/sections/footer/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$h = createAstro("https://domaine-2-0.vercel.app/");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$Layout;
  const data = await getSEOSettings();
  const { title, description, image, theme } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"', '> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><!-- <link rel="sitemap" href="/sitemap-index.xml" /> --><meta name="generator"', `><!-- Google tag (gtag.js) --><script async src="https://www.googletagmanager.com/gtag/js?id=G-8YW8NFYNGR"><\/script><!-- Google Analytics --><script>
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
		
			gtag('config', 'G-8YW8NFYNGR');
		<\/script><!-- Google Tag Manager --><script>
			(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
			new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
			j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
			'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
			})(window,document,'script','dataLayer','GTM-T5Q9G6VH');
		<\/script><!-- HTML Meta Tags --><!-- <title>Domaine</title> --><meta name="description"`, '><!-- Facebook Meta Tags --><meta property="og:url" content="https://meetdomaine.com/"><meta property="og:type" content="website"><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><!-- Twitter Meta Tags --><meta name="twitter:card" content="summary_large_image"><meta property="twitter:domain" content="meetdomaine.com"><meta property="twitter:url" content="https://meetdomaine.com/"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', "><title>", " | ", "</title>", "", '</head> <body> <!-- Google Tag Manager (noscript) --> <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T5Q9G6VH" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> <!-- End Google Tag Manager (noscript) --> ', " ", " ", "   </body></html>"])), addAttribute(theme, "data-theme"), addAttribute(Astro2.generator, "content"), addAttribute(description ? description : data[0].siteDescription, "content"), addAttribute(`${title} | ${data[0].siteTitle}`, "content"), addAttribute(description ? description : data[0].siteDescription, "content"), addAttribute(image ? image : urlFor(data[0].siteImage).url(), "content"), addAttribute(`${title} | ${data[0].siteTitle}`, "content"), addAttribute(description ? description : data[0].siteDescription, "content"), addAttribute(image ? image : urlFor(data[0].siteImage).url(), "content"), title, data[0].siteTitle, renderComponent($$result, "ViewTransitions", $$ViewTransitions, {}), renderHead(), renderComponent($$result, "Header", $$Header, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}));
}, "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/layouts/Layout.astro", void 0);

const $$Astro$g = createAstro("https://domaine-2-0.vercel.app/");
const $$CategoryTag = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$CategoryTag;
  const { category } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a class="category-tag button caption"${addAttribute(`${category.slug.current}`, "href")} data-astro-cid-prtur4gd>${category.name}</a> `;
}, "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/components/atoms/CategoryTag.astro", void 0);

const $$Astro$f = createAstro("https://domaine-2-0.vercel.app/");
const $$BlogIndexHero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$BlogIndexHero;
  const content = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="blog-index-hero" data-astro-cid-kkuqwvpk> <div class="media" data-astro-cid-kkuqwvpk> <img class="post-image" sizes="(max-width: 768px) 100vw, 50vw"${addAttribute(`
        ${urlFor(content.post.mainImage).width(1200).height(1200).url()} 1200w,
        ${urlFor(content.post.mainImage).width(2304).height(2304).url()} 2304w,
        ${urlFor(content.post.mainImage).width(4320).height(4320).url()} 4320w,
      `, "srcset")}${addAttribute(urlFor(content.post.mainImage).url(), "src")} data-astro-cid-kkuqwvpk> </div> <div class="text" data-astro-cid-kkuqwvpk> <div class="section-title" data-astro-cid-kkuqwvpk> <h1 class="h5 heading" data-astro-cid-kkuqwvpk>${content.heading}</h1> <h2 class="caption subheading" data-astro-cid-kkuqwvpk>${content.subheading}</h2> </div> <div class="post-content" data-astro-cid-kkuqwvpk> <div class="post-title" data-astro-cid-kkuqwvpk> <a${addAttribute(`/insights/${content.post.category.slug.current}/${content.post.slug.current}`, "href")} data-astro-cid-kkuqwvpk> <h3 class="h1" data-astro-cid-kkuqwvpk>${content.post.title}</h3> </a> ${renderComponent($$result, "CategoryTag", $$CategoryTag, { "category": content.post.category, "data-astro-cid-kkuqwvpk": true })} </div> <div class="post-details" data-astro-cid-kkuqwvpk> <h4 class="h6" data-astro-cid-kkuqwvpk>${content.post.excerpt}</h4> <a class="button"${addAttribute(`/insights/${content.post.category.slug.current}/${content.post.slug.current}`, "href")} data-astro-cid-kkuqwvpk>Read More</a> </div> </div> </div> </section> `;
}, "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/components/sections/blog/blogIndex/BlogIndexHero.astro", void 0);

const $$Astro$e = createAstro("https://domaine-2-0.vercel.app/");
const $$BlogPostCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$BlogPostCard;
  const { content } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="blog-post-card" data-astro-cid-6aov3gpb> <a class="media"${addAttribute(`/insights/${content.category.slug.current}/${content.slug.current}`, "href")} data-astro-cid-6aov3gpb> <img class="image" sizes="(max-width: 768px) 50vw, (max-width: 960px) 35vw, 25vw"${addAttribute(`
        ${urlFor(content.mainImage).width(600).height(600).auto("format").url()} 600w,
        ${urlFor(content.mainImage).width(1150).height(1150).auto("format").url()} 1150w,
        ${urlFor(content.mainImage).width(1440).height(1440).auto("format").url()} 1440w,
      `, "srcset")}${addAttribute(urlFor(content.mainImage).width(600).height(600).auto("format").url(), "src")} data-astro-cid-6aov3gpb> </a> <div class="content" data-astro-cid-6aov3gpb> <a${addAttribute(`/insights/${content.category.slug.current}/${content.slug.current}`, "href")} data-astro-cid-6aov3gpb> <h5 class="h6" data-astro-cid-6aov3gpb>${content.title}</h5> </a> ${renderComponent($$result, "CategoryTag", $$CategoryTag, { "category": content.category, "data-astro-cid-6aov3gpb": true })} </div> </article> `;
}, "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/components/atoms/BlogPostCard.astro", void 0);

const $$Astro$d = createAstro("https://domaine-2-0.vercel.app/");
const $$BlogIndexFeed = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$BlogIndexFeed;
  const { content } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="blog-index-feed" data-astro-cid-j4aff6b4> ${content.map((post, i) => {
    return renderTemplate`${renderComponent($$result, "BlogPostCard", $$BlogPostCard, { "content": post, "data-astro-cid-j4aff6b4": true })}`;
  })} </section> `;
}, "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/components/sections/blog/blogIndex/BlogIndexFeed.astro", void 0);

const $$Astro$c = createAstro("https://domaine-2-0.vercel.app/");
const $$BlogIndexSidebar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$BlogIndexSidebar;
  const { content, activeCategory } = Astro2.props;
  console.log(activeCategory);
  return renderTemplate`${maybeRenderHead()}<aside class="blog-index-sidebar" data-astro-cid-e4saslip> ${content.map((category, i) => {
    return renderTemplate`<a class="sidebar-link"${addAttribute(category.slug.current == activeCategory ? "true" : "false", "data-active")}${addAttribute(`/insights/${category.slug.current}`, "href")} data-astro-cid-e4saslip>${category.name}</a>`;
  })} </aside> `;
}, "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/components/sections/blog/blogIndex/BlogIndexSidebar.astro", void 0);

const $$Astro$b = createAstro("https://domaine-2-0.vercel.app/");
const $$Index$4 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Index$4;
  const data = await getBlogPageContent();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Insights", "theme": "light", "data-astro-cid-er3pmupq": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "BlogIndexHero", $$BlogIndexHero, { "heading": data.content.heading, "subheading": data.content.subheading, "post": data.content.featuredPost, "data-astro-cid-er3pmupq": true })} ${maybeRenderHead()}<div class="blog-index-main" data-astro-cid-er3pmupq> ${renderComponent($$result2, "BlogIndexSidebar", $$BlogIndexSidebar, { "content": data.categories, "data-astro-cid-er3pmupq": true })} ${renderComponent($$result2, "BlogIndexFeed", $$BlogIndexFeed, { "content": data.posts, "data-astro-cid-er3pmupq": true })} </div> ` })}  `;
}, "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/insights/index.astro", void 0);

const $$file$4 = "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/insights/index.astro";
const $$url$4 = "/insights";

const index$4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index$4,
	file: $$file$4,
	url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$a = createAstro("https://domaine-2-0.vercel.app/");
const $$Index$3 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Index$3;
  const data = await getBlogPageContent();
  const { category } = Astro2.params;
  const filteredPosts = data.posts.filter((post) => post.category.slug.current == category);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Insights", "theme": "light", "data-astro-cid-krl3ls3a": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "BlogIndexHero", $$BlogIndexHero, { "heading": data.content.heading, "subheading": data.content.subheading, "post": data.content.featuredPost, "data-astro-cid-krl3ls3a": true })} ${maybeRenderHead()}<div class="blog-index-main" data-astro-cid-krl3ls3a> ${renderComponent($$result2, "BlogIndexSidebar", $$BlogIndexSidebar, { "content": data.categories, "activeCategory": category, "data-astro-cid-krl3ls3a": true })} ${renderComponent($$result2, "BlogIndexFeed", $$BlogIndexFeed, { "content": filteredPosts, "data-astro-cid-krl3ls3a": true })} </div> ` })} `;
}, "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/insights/[category]/index.astro", void 0);

const $$file$3 = "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/insights/[category]/index.astro";
const $$url$3 = "/insights/[category]";

const index$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index$3,
	file: $$file$3,
	url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$9 = createAstro("https://domaine-2-0.vercel.app/");
const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Hero;
  const { content } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="hero" data-animate="true" data-astro-cid-fov22z6j> <div class="hero-content" data-astro-cid-fov22z6j> <div class="hero-text" data-astro-cid-fov22z6j> ${content.eyebrow && renderTemplate`<h2 class="h5" data-astro-cid-fov22z6j>${content.eyebrow}</h2>`} <h1 class="heading" data-astro-cid-fov22z6j> ${content.heading.map((block) => {
    if (block.children[0].marks.includes("em"))
      return renderTemplate`<em data-astro-cid-fov22z6j>${block.children[0].text.trim()}</em>`;
    return renderTemplate`<p data-astro-cid-fov22z6j>${block.children[0].text.trim()}</p>`;
  })} ${content.badgeText && renderTemplate`<span class="badge caption" data-astro-cid-fov22z6j>${renderComponent($$result, "Icon", $$Icon, { "glyph": "star", "size": "medium", "data-astro-cid-fov22z6j": true })}<p data-astro-cid-fov22z6j>${content.badgeText}</p></span>`} </h1> ${content.subheading && renderTemplate`<h3 class="h6" data-astro-cid-fov22z6j>${content.subheading}</h3>`} </div> ${content.buttonText && content.buttonURL && renderTemplate`<a class="button"${addAttribute(content.buttonURL, "href")} data-astro-cid-fov22z6j>${content.buttonText}</a>`} </div> <!-- Optimized for viewports of: 430px, 1024px, 1800px - @3x --> ${content.image && renderTemplate`<img class="image"${addAttribute(`
        ${urlFor(content.image).width(1290).height(1290).auto("format").url()} 1290w,
        ${urlFor(content.image).width(3072).height(1536).auto("format").url()} 3072w,
        ${urlFor(content.image).width(5400).height(2700).auto("format").url()} 5400w,
      `, "srcset")}${addAttribute(urlFor(content.image).width(1290).height(1290).auto("format").url(), "src")} width="1440" height="720"${addAttribute(content.imageAlt, "alt")} decoding="async" loading="eager" data-astro-cid-fov22z6j>`} </section>  `;
}, "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/components/sections/hero/Hero.astro", void 0);

const $$Astro$8 = createAstro("https://domaine-2-0.vercel.app/");
const $$Clients = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Clients;
  const { content } = Astro2.props;
  let clientRows = [];
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < content.clients.length; i++) {
      if (!clientRows[i % 3]) {
        clientRows.push([]);
      }
      clientRows[i % 3].push(content.clients[i]);
    }
  }
  return renderTemplate`${maybeRenderHead()}<section data-astro-cid-z7dxnbry> <div class="clients" data-animate="true" data-astro-cid-z7dxnbry> ${clientRows.map((row) => {
    return renderTemplate`<div class="client-row" data-astro-cid-z7dxnbry> ${row.map((client) => {
      return renderTemplate`<span class="client-card" data-astro-cid-z7dxnbry> ${client.logo && renderTemplate`<img class="logo" sizes="10vw"${addAttribute(`
                    ${urlFor(client.logo).width(306).height(306).auto("format").url()} 306w,
                    ${urlFor(client.logo).width(564).height(564).auto("format").url()} 564w,
                  `, "srcset")}${addAttribute(urlFor(client.logo).width(306).height(306).auto("format").url(), "src")} width="564" height="564"${addAttribute(`${client.name} brand logo`, "alt")} decoding="auto" loading="eager" data-astro-cid-z7dxnbry>`} ${client.image && renderTemplate`<img class="image" sizes="20vw"${addAttribute(`
                    ${urlFor(client.image).width(612).height(368).auto("format").url()} 612w,
                    ${urlFor(client.image).width(1128).height(678).auto("format").url()} 1128w,
                  `, "srcset")}${addAttribute(urlFor(client.image).width(612).height(368).auto("format").url(), "src")} width="1080" height="1080"${addAttribute(`${client.name} brand image`, "alt")} decoding="auto" loading="eager" data-astro-cid-z7dxnbry>`} </span>`;
    })} </div>`;
  })} </div> </section>  `;
}, "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/components/sections/clients/Clients.astro", void 0);

const $$Astro$7 = createAstro("https://domaine-2-0.vercel.app/");
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$About;
  const { content } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "ViewportObserver", null, { "client:only": "solid-js", "client:component-hydration": "only", "data-astro-cid-lgaudbhc": true, "client:component-path": "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/animation/ViewportObserver", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="about" data-astro-cid-lgaudbhc> <div class="text" data-astro-cid-lgaudbhc> <div class="section-title" data-astro-cid-lgaudbhc> ${content.heading && renderTemplate`<h2 class="h2" data-astro-cid-lgaudbhc>${content.heading}</h2>`} ${content.subheading && renderTemplate`<h3 class="h6" data-astro-cid-lgaudbhc>${content.subheading}</h3>`} </div> <ul class="callouts" data-astro-cid-lgaudbhc> ${content.stats && content.stats.map((stat) => {
    return renderTemplate`<li class="callout" data-astro-cid-lgaudbhc> ${stat.content[0].children.map((node) => {
      if (node.marks.includes("em"))
        return renderTemplate`<em class="h5" data-astro-cid-lgaudbhc>${node.text.trim()}</em>`;
      return renderTemplate`<p class="h5" data-astro-cid-lgaudbhc>${node.text.trim()}</p>`;
    })} </li>`;
  })} </ul> </div> <div class="media" data-astro-cid-lgaudbhc> ${content.videoURL ? renderTemplate`<video class="video" width="50vw" height="100vh" autoplay loop muted data-astro-cid-lgaudbhc> <source${addAttribute(content.videoURL, "src")} type="video/mp4" data-astro-cid-lgaudbhc> </video>` : renderTemplate`<img width="50vw" height="100vh" sizes="
            (max-width: 960px) 100%,
            50%
          "${addAttribute(`
            ${urlFor(content.image).width(800).height(1600).auto("format").url()} 800w,
            ${urlFor(content.image).width(1290).height(2580).auto("format").url()} 1290w,
            ${urlFor(content.image).width(1536).height(3072).auto("format").url()} 1536w,
            ${urlFor(content.image).width(2700).height(5400).auto("format").url()} 2700w,
          `, "srcset")}${addAttribute(urlFor(content.image).width(800).height(1600).auto("format").url(), "src")} class="image" data-astro-cid-lgaudbhc>`} </div> </section> ` })} `;
}, "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/components/sections/about/About.astro", void 0);

const $$Astro$6 = createAstro("https://domaine-2-0.vercel.app/");
const $$Services = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Services;
  const { content } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="services" data-astro-cid-y4wgi45u> <div class="section-main" data-astro-cid-y4wgi45u> <div class="section-title" data-astro-cid-y4wgi45u> ${content.heading && renderTemplate`<h2 class="h2 heading" data-astro-cid-y4wgi45u>${content.heading}</h2>`} ${content.subheading && renderTemplate`<h3 class="h5 subheading" data-astro-cid-y4wgi45u>${content.subheading}</h3>`} </div> <div class="media" data-astro-cid-y4wgi45u> ${content.services.map((service, i) => {
    return renderTemplate`<img class="service-image" sizes="50vw"${addAttribute(`
              ${urlFor(service.image).width(800).auto("format").url()} 800w,
              ${urlFor(service.image).width(1290).auto("format").url()} 1290w,
              ${urlFor(service.image).width(1536).auto("format").url()} 1536w,
              ${urlFor(service.image).width(2700).auto("format").url()} 2700w,
            `, "srcset")}${addAttribute(urlFor(service.image).width(800).height(1600).auto("format").url(), "src")}${addAttribute(`Visualization of Domaine's ${service.title} service.`, "alt")} width="50vw" height="50vh"${addAttribute(i, "data-index")} data-animate="true" data-astro-cid-y4wgi45u>`;
  })} </div> </div> <div class="section-details" data-astro-cid-y4wgi45u> ${content.services.map((service, i) => {
    return renderTemplate`${renderComponent($$result, "ViewportObserver", null, { "client:only": "solid-js", "client:component-hydration": "only", "data-astro-cid-y4wgi45u": true, "client:component-path": "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/animation/ViewportObserver", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate` <div class="detail-block"${addAttribute(i, "data-index")} data-astro-cid-y4wgi45u> <img class="service-image-mobile" sizes="100vw"${addAttribute(`
                ${urlFor(service.image).width(800).auto("format").url()} 800w,
                ${urlFor(service.image).width(1290).auto("format").url()} 1290w,
                ${urlFor(service.image).width(1536).auto("format").url()} 1536w,
              `, "srcset")}${addAttribute(urlFor(service.image).width(800).height(1600).auto("format").url(), "src")} width="100vw" height="100vw" data-astro-cid-y4wgi45u> ${service.title && renderTemplate`<h4 data-astro-cid-y4wgi45u>${service.title}</h4>`} ${service.description && renderTemplate`<h5 class="h6" data-astro-cid-y4wgi45u>${service.description}</h5>`} <ul class="deliverables" data-astro-cid-y4wgi45u> ${service.deliverables && service.deliverables.map((deliverable) => {
      return renderTemplate`<li class="deliverable h6" data-astro-cid-y4wgi45u>${deliverable}</li>`;
    })} </ul> </div> ` })}`;
  })} </div> </section>  `;
}, "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/components/sections/services/Services.astro", void 0);

const $$Astro$5 = createAstro("https://domaine-2-0.vercel.app/");
const $$Agencies = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Agencies;
  const { content } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="agencies" data-astro-cid-sybqfdbv> <div class="section-title" data-astro-cid-sybqfdbv> <h2 class="heading" data-astro-cid-sybqfdbv>${content.heading}</h2> </div> <div class="text-blocks" data-astro-cid-sybqfdbv> ${content.agencies.map((agency, i) => {
    return renderTemplate`${renderComponent($$result, "ViewportObserver", null, { "client:only": "solid-js", "delay": i * 200, "client:component-hydration": "only", "data-astro-cid-sybqfdbv": true, "client:component-path": "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/animation/ViewportObserver", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate` <div class="text-block" data-astro-cid-sybqfdbv> <a${addAttribute(agency.linkURL, "href")} target="_blank" data-astro-cid-sybqfdbv> <img class="block-image" width="400" height="80"${addAttribute(urlFor(agency.logo).auto("format").width(600).url(), "src")}${addAttribute(`Agency logo for ${agency.name}`, "alt")} data-astro-cid-sybqfdbv> </a> <p data-astro-cid-sybqfdbv>${agency.description}</p> <a class="block-link"${addAttribute(agency.linkURL, "href")} target="_blank" data-astro-cid-sybqfdbv>${agency.linkText}</a> </div> ` })}`;
  })} </div> </section> `;
}, "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/components/sections/agencies/Agencies.astro", void 0);

const $$Astro$4 = createAstro("https://domaine-2-0.vercel.app/");
const $$Partners = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Partners;
  const { content } = Astro2.props;
  let inlineLogoURL;
  if (content.inlineLogo)
    inlineLogoURL = urlFor(content.inlineLogo).auto("format").width(800).url();
  return renderTemplate`${maybeRenderHead()}<section class="partners" data-astro-cid-qtl4bf2l> <div class="section-header" data-astro-cid-qtl4bf2l> <div class="section-title" data-astro-cid-qtl4bf2l> <h2 class="h2 heading" id="heading"${addAttribute(inlineLogoURL, "data-inline-logo")} data-astro-cid-qtl4bf2l>${content.heading}</h2> <h3 class="h5 subheading" data-astro-cid-qtl4bf2l>${content.subheading}</h3> </div> <div class="featured-logos" data-astro-cid-qtl4bf2l> ${content.logos.map((logo, i) => {
    if (logo.featured) {
      return renderTemplate`<img class="featured-logo"${addAttribute(urlFor(logo.partnerLogo).format("webp").width(600).url(), "src")}${addAttribute(`Partner logo for ${logo.name}`, "alt")} loading="lazy" data-astro-cid-qtl4bf2l>`;
    }
  })} </div> </div> <div class="logo-grid" data-astro-cid-qtl4bf2l> ${content.logos.map((logo, i) => {
    if (!logo.featured) {
      return renderTemplate`${renderComponent($$result, "ViewportObserver", null, { "client:only": "solid-js", "delay": i * 10, "client:component-hydration": "only", "data-astro-cid-qtl4bf2l": true, "client:component-path": "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/animation/ViewportObserver", "client:component-export": "default" }, { "default": ($$result2) => renderTemplate` <img class="logo"${addAttribute(urlFor(logo.partnerLogo).format("webp").width(600).url(), "src")}${addAttribute(`Partner logo for ${logo.name}`, "alt")} loading="lazy" data-astro-cid-qtl4bf2l> ` })}`;
    }
  })} </div> </section>  `;
}, "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/components/sections/partners/Partners.astro", void 0);

var _tmpl$ = ["<section", ' class="work"><div class="section-title"><h2 class="heading">', '</h2><h3 class="subheading h5">', '</h3></div><div class="filter-tags">', '</div><div class="project-grid">', "</div></section>"], _tmpl$2 = ["<button", ' class="', '">', "</button>"], _tmpl$3 = ["<video", ' class="card-video"', ' autoplay loop muted playsinline preload="none" onloadedmetadata="this.muted = true"></video>'], _tmpl$4 = ["<img", ' srcset="', '" sizes="(max-width: 960px) 50vw, 25vw"', ' class="card-image" width="30vw" height="20vh" loading="lazy" alt="', '">'], _tmpl$5 = ["<div", ' class="project-card"><div class="card-media">', '</div><h4 class="h6">', "</h4></div>"];
function Work(props) {
  const [activeFilter, setActiveFilter] = createSignal(null);
  onMount(() => {
    if (props.content.categories) {
      setActiveFilter(props.content.categories[0].slug.current);
    }
  });
  return ssr(_tmpl$, ssrHydrationKey(), escape(props.content.heading), escape(props.content.subheading), escape(createComponent$1(For, {
    get each() {
      return props.content.categories;
    },
    children: (category, i) => ssr(_tmpl$2, ssrHydrationKey(), `button-secondary filter-tag ${category.slug.current == activeFilter() ? "active" : "inactive"}`, escape(category.name))
  })), escape(createComponent$1(For, {
    get each() {
      return props.content.projects;
    },
    children: (project, i) => createComponent$1(Show, {
      get when() {
        return project.categories.includes(activeFilter());
      },
      get children() {
        return ssr(_tmpl$5, ssrHydrationKey(), escape(createComponent$1(Switch, {
          get children() {
            return [createComponent$1(Match, {
              get when() {
                return project.showThumbnailVideo && project.videoURL;
              },
              get children() {
                return ssr(_tmpl$3, ssrHydrationKey() + ssrAttribute("src", escape(project.videoURL, true), false), ssrAttribute("poster", project.image ? escape(urlFor(project.image).format("webp").width(600).height(360).auto("format").url(), true) : "", false));
              }
            }), createComponent$1(Match, {
              get when() {
                return (!project.videoURL || !project.showThumbnailVideo) && project.thumbnailImage;
              },
              get children() {
                return ssr(_tmpl$4, ssrHydrationKey(), `
                          ${escape(urlFor(project.thumbnailImage).format("webp").width(600).height(360).auto("format").url(), true)} 600w, 
                          ${escape(urlFor(project.thumbnailImage).format("webp").width(1080).height(648).auto("format").url(), true)} 1080w, 
                          ${escape(urlFor(project.thumbnailImage).format("webp").width(2160).height(1296).auto("format").url(), true)} 2160w
                        `, ssrAttribute("src", escape(urlFor(project.thumbnailImage).format("webp").width(600).height(360).auto("format").url(), true), false), `Case study image for our work with ${escape(project.title, true)}`);
              }
            })];
          }
        })), escape(project.title));
      }
    })
  })));
}

const $$Astro$3 = createAstro("https://domaine-2-0.vercel.app/");
const $$SectionBlock = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$SectionBlock;
  const { block } = Astro2.props;
  return renderTemplate`${block._type == "sectionHero" ? renderTemplate`${renderComponent($$result, "Hero", $$Hero, { "content": block })}` : null}${block._type == "sectionClients" ? renderTemplate`${renderComponent($$result, "Clients", $$Clients, { "content": block })}` : null}${block._type == "sectionAbout" ? renderTemplate`${renderComponent($$result, "About", $$About, { "content": block })}` : null}${block._type == "sectionServices" ? renderTemplate`${renderComponent($$result, "Services", $$Services, { "content": block })}` : null}${block._type == "sectionContact" ? renderTemplate`${renderComponent($$result, "Contact", null, { "client:only": "solid-js", "content": block, "client:component-hydration": "only", "client:component-path": "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/components/sections/contact/Contact", "client:component-export": "default" })}` : null}${block._type == "sectionWork" ? renderTemplate`${renderComponent($$result, "Work", Work, { "client:idle": true, "content": block, "client:component-hydration": "idle", "client:component-path": "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/components/sections/work/Work", "client:component-export": "default" })}` : null}${block._type == "sectionPartners" ? renderTemplate`${renderComponent($$result, "Partners", $$Partners, { "content": block })}` : null}${block._type == "sectionAgencies" ? renderTemplate`${renderComponent($$result, "Agencies", $$Agencies, { "content": block })}` : null}`;
}, "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/components/sections/SectionBlock.astro", void 0);

const $$Astro$2 = createAstro("https://domaine-2-0.vercel.app/");
const $$Index$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index$2;
  const data = await getHomePageContent();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "E-commerce Design & Development Partner" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${data[0].content.map((contentBlock) => renderTemplate`${renderComponent($$result2, "SectionBlock", $$SectionBlock, { "block": contentBlock })}`)} </main> ` })} `;
}, "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/index.astro", void 0);

const $$file$2 = "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/index.astro";
const $$url$2 = "";

const index$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index$2,
	file: $$file$2,
	url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro("https://domaine-2-0.vercel.app/");
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index$1;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Events" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>Events</p> ` })}`;
}, "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/events/index.astro", void 0);

const $$file$1 = "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/events/index.astro";
const $$url$1 = "/events";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index$1,
	file: $$file$1,
	url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro("https://domaine-2-0.vercel.app/");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const data = await getBlogPosts();
  console.log(data[0]);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Welcome to Astro." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <h1>Work</h1> </main> ` })}`;
}, "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/work/index.astro", void 0);

const $$file = "/Users/treyhardin/Documents/Working Files/Domaine/domaine-client/src/pages/work/index.astro";
const $$url = "/work";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Header as $, $$Icon as a, $$Layout as b, $$CategoryTag as c, getEvents as d, $$SectionBlock as e, getPages as f, getBlogPosts as g, index$3 as h, index$4 as i, index$2 as j, index$1 as k, index as l, urlFor as u };
