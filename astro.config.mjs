import { defineConfig } from 'astro/config';
import solid from "@astrojs/solid-js";
import sitemap from '@astrojs/sitemap';
import icon from "astro-icon";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";
import { Locales } from './src/components/global/utils/locales';
const isProd = import.meta.env.PROD;
const isDev = import.meta.env.DEV;
const renderMode = import.meta.env.RENDER_MODE;

export default defineConfig({
  integrations: [
    sitemap(), 
    icon(), 
    sanity({
      projectId: 'cxeknc6v',
      dataset: 'production',
      useCdn: true,
      studioBasePath: '/admin'
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
  output: 'static',
  adapter: cloudflare(),
  site: 'https://meetdomaine.com/',
  vite: {
    define: {
      "import.meta.env.HUBSPOT_PORTAL_ID": JSON.stringify(process.env.HUBSPOT_PORTAL_ID),
      "import.meta.env.HUBSPOT_ACCESS_TOKEN": JSON.stringify(process.env.HUBSPOT_ACCESS_TOKEN),
      "import.meta.env.GREENSOCK_AUTH_TOKEN": JSON.stringify(process.env.GREENSOCK_AUTH_TOKEN),
    },
  },
});