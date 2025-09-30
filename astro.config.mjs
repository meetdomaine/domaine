import { defineConfig } from 'astro/config';
import solid from "@astrojs/solid-js";
import sitemap from '@astrojs/sitemap';
import icon from "astro-icon";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import { Locales } from './src/enums/locales';
import { loadEnv } from "vite";
import vercel from '@astrojs/vercel';

// Load environment variables
const env = loadEnv(process.env.NODE_ENV, process.cwd(), "");
// const { env } = Astro.locals.runtime;

export default defineConfig({
  integrations: [
    sitemap(), 
    icon(), 
    sanity({
      projectId: 'cxeknc6v',
      // dataset: env.ENVIRONMENT === 'PRODUCTION' ? 'production' : 'staging',
      dataset: 'production',
      useCdn: true,
      // useCdn: env.PUBLIC_SANITY_API_READ_TOKEN ? true : false,
      token: env.PUBLIC_SANITY_API_READ_TOKEN,
      studioBasePath: '/admin',
      stega: {
        studioUrl: '/admin',
      },
      perspective: 'published',
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400', 
        'CDN-Cache-Control': 'public, s-maxage=3600',
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
  prefetch: {
    prefetchAll: true
  },
  experimental: {
    clientPrerender: true
  },
  output: 'server',
  // output: 'static',
  adapter: cloudflare({
    imageService: 'cloudflare',
  }),
  site: 'https://www.meetdomaine.com/',
  vite: {
    define: {
      "import.meta.env.env.PUBLIC_SANITY_API_READ_TOKEN": JSON.stringify(env.PUBLIC_SANITY_API_READ_TOKEN),
      "import.meta.env.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED": JSON.stringify(env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED),
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
      minify: true,
    },
    ssr: {
      noExternal: ['detect-libc'],
      external: ['node:buffer'],
      target: 'node',
      format: 'esm'
    }
  },
});