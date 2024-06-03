import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel/serverless";
// import vercelStatic from '@astrojs/vercel/static';
import sitemap from '@astrojs/sitemap';
import icon from "astro-icon";

import sanity from "@sanity/astro";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    sitemap(), 
    icon(), 
    sanity({
      projectId: 'cxeknc6v',
      dataset: 'production',
      useCdn: false,
      studioBasePath: '/admin',
    }), 
    react()
  ],
  prefetch: true,
  output: 'hybrid',
  adapter: vercel({
    edgeMiddleware: true
  }),
  // adapter: vercel(),
  site: 'https://meetdomaine.com/'
});