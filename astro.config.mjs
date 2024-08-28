import { defineConfig } from 'astro/config';
import solid from "@astrojs/solid-js";
import vercel from "@astrojs/vercel/serverless";
// import vercelStatic from '@astrojs/vercel/static';
import sitemap from '@astrojs/sitemap';
import icon from "astro-icon";
import sanity from "@sanity/astro";
import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

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
    solid({
      devtools: true,
      include: 'src/**/*'
    }), 
    react({
      include: 'domaine-cms/**/*'
    })
  ],
  prefetch: true,
  experimental: {
    clientPrerender: true
  },
  output: 'hybrid',
  adapter: cloudflare(),
  site: 'https://meetdomaine.com/'
});