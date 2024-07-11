import { defineConfig } from 'astro/config';
import solid from "@astrojs/solid-js";
import vercel from "@astrojs/vercel/serverless";
// import vercelStatic from '@astrojs/vercel/static';
import sitemap from '@astrojs/sitemap';
import icon from "astro-icon";


// https://astro.build/config
export default defineConfig({
  integrations: [
    sitemap(), 
    icon(),
    solid({ 
      devtools: true ,
      include: 'src/**/*'
    }),
  ],
  // prefetch: true,
  output: 'hybrid',
  adapter: vercel({
    edgeMiddleware: false
  }),
  // adapter: vercel(),
  site: 'https://meetdomaine.com/'
});