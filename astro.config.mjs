import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";
import sitemap from '@astrojs/sitemap';
import icon from "astro-icon";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
// const isProd = import.meta.env.PROD;
// const isDev = import.meta.env.DEV;
// const renderMode = import.meta.env.RENDER_MODE;
// const environment = import.meta.env.MODE

import { loadEnv } from "vite";
// Not sure how to use this yet, but looks useful!
const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  "",
);

export default defineConfig({
  integrations: [sitemap(), icon(), sanity({
    projectId: 'cxeknc6v',
    dataset: 'production',
    useCdn: false,
    studioBasePath: '/admin',
    stega: {
      studioUrl: "http://localhost:4321/admin",
    },
  }), 
  // solidJs({
  //   devtools: true,
  //   include: 'src/**/*'
  // }), 
  react({
    include: 'domaine-cms/**/*'
  }),
],
  prefetch: true,
  experimental: {
    clientPrerender: true
  },
  // output: 'static',
  output: 'server',
  // output: environment === 'development' ? 'server' : 'static',
  adapter: cloudflare(),
  site: 'https://meetdomaine.com/',
  vite: {
    define: {
      // "import.meta.env.HUBSPOT_PORTAL_ID": JSON.stringify(process.env.HUBSPOT_PORTAL_ID),
      // "import.meta.env.HUBSPOT_ACCESS_TOKEN": JSON.stringify(process.env.HUBSPOT_ACCESS_TOKEN),
      // "import.meta.env.GREENSOCK_AUTH_TOKEN": JSON.stringify(process.env.GREENSOCK_AUTH_TOKEN),
      'process.env': {},
    },
  },
});