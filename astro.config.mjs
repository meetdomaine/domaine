import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel/serverless";
// import vercelStatic from '@astrojs/vercel/static';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs(), sitemap()],
  output: 'hybrid',
  adapter: vercel({
    edgeMiddleware: true,
  }),
  // adapter: vercel(),
  site: 'https://meetdomaine.com/',
});