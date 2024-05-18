import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel/serverless";
// import vercelStatic from '@astrojs/vercel/static';
import sitemap from '@astrojs/sitemap';

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [ sitemap(), icon()],
  prefetch: true,
  output: 'hybrid',
  adapter: vercel({
    edgeMiddleware: true
  }),
  // adapter: vercel(),
  site: 'https://meetdomaine.com/'
});