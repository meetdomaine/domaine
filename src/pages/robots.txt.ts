import type { APIRoute } from 'astro';

const robotsTxt = `
User-agent: *

Disallow: /admin/*
Disallow: /404
Disallow: /_astro/*
Disallow: /cdn/*
Disallow: /services/undefined/*

User-agent: Bingbot
Disallow: /llms.txt

User-agent: Googlebot
Disallow: /llms.txt

Sitemap: https://meetdomaine.com/sitemap.xml
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};