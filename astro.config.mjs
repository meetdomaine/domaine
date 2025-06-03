import { defineConfig } from 'astro/config';
import solid from "@astrojs/solid-js";
import sitemap from '@astrojs/sitemap';
import icon from "astro-icon";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import { Locales } from './src/enums/locales';
import { loadEnv } from "vite";

// Load environment variables
const env = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// Try to get the variable from Cloudflare first, then fall back to local env
const SERVER_RENDERING_ENABLED = process.env.SERVER_RENDERING_ENABLED || env.SERVER_RENDERING_ENABLED;
const renderMode = SERVER_RENDERING_ENABLED === "true" ? 'server' : 'static';
console.log(`RENDER MODE: ${renderMode}`);

const PROD = process.env.PROD || env.PROD;
console.log(PROD)

// Get SANITY token from environment
const PUBLIC_SANITY_API_READ_TOKEN = process.env.PUBLIC_SANITY_API_READ_TOKEN || env.PUBLIC_SANITY_API_READ_TOKEN;
const PUBLIC_SANITY_VISUAL_EDITING_ENABLED = process.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED || env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED;
// console.log(SANITY_API_READ_TOKEN)

// Debug environment variables
console.log('SANITY_API_READ_TOKEN available:', !!PUBLIC_SANITY_API_READ_TOKEN)

export default defineConfig({
  integrations: [
    sitemap(), 
    icon(), 
    sanity({
      projectId: 'cxeknc6v',
      dataset: 'production',
      useCdn: false,
      studioBasePath: '/admin',
      stega: {
        studioUrl: '/admin',
      },
    }), 
    solid({
      devtools: true,
      include: 'src/**/*'
    }),
    react({
      include: 'domaine-cms/**/*'
    })
  ],
  i18n: {
    locales: ["en", Locales.DE, Locales.NL],
    defaultLocale: "en",
    fallback: {
      de: "en",
      nl: "en"
    },
    // TODO: Figure out why rewrite messes up HP routing
    // routing: {
    //   fallbackType: "rewrite"
    // }
  },
  prefetch: true,
  experimental: {
    clientPrerender: true
  },
  // output: 'server',
  output: renderMode,
  // output: 'static',
  adapter: cloudflare(),
  site: 'https://meetdomaine.com/',
  vite: {
    define: {
      "import.meta.env.PUBLIC_SANITY_API_READ_TOKEN": JSON.stringify(PUBLIC_SANITY_API_READ_TOKEN),
      "import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED": JSON.stringify(PUBLIC_SANITY_VISUAL_EDITING_ENABLED),
      "import.meta.env.SERVER_RENDERING_ENABLED": JSON.stringify(SERVER_RENDERING_ENABLED),
    },
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      // TODO: Find the right way to import env
      alias: (import.meta.env.PROD ) && {
        "react-dom/server": "react-dom/server.edge", // Hacky fix for Astro bug
      },
    },
    optimizeDeps: {
      exclude: ['detect-libc']
    },
    build: {
      minify: false,
    },
    ssr: {
      noExternal: ['detect-libc'],
      external: ['node:buffer'],
      target: 'node',
      format: 'esm'
    }
  },
});