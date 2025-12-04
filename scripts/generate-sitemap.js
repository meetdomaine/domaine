import { createClient } from "@sanity/client";
import { writeFileSync } from "fs";
import { join, dirname } from "path";

const sanityClient = createClient({
  projectId: 'cxeknc6v',
  dataset: 'production',
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: '2025-06-25',
})

async function generateSitemapFile() {

  const BASE_URL = 'https://meetdomaine.com';
  const LAST_MODIFIED = new Date().toISOString();

  const projects = await sanityClient.fetch(`*[_type == "type_project"]{
    slug{current}
  }`);

  let sitemapMarkup = '';

  const addSitemapUrl = (url, priority = 0.5) => {
    sitemapMarkup += `<url>
      <loc>${BASE_URL}/${url ? url : ''}</loc>
      <lastmod>${LAST_MODIFIED}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${priority}</priority>
    </url>`
  }

  addSitemapUrl('', 0.8);
  

  console.log(sitemapMarkup)

  const test = projects.map(project => {
    return `<url>
      <loc>${BASE_URL}/work/${project.slug.current}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.5</priority>
    </url>`
  })

  const partners = []
  const pages = []
  const services = []
  const blogPosts = []
  const resources = []
  const events = []


  // console.log('projects', projects)


  // const data = await sanityClient.fetch(query);
  // if (!data?.redirects) return
  
  // <url>
  //   <loc>https://meetdomaine.com/studio/work/features/custom-discounts/</loc>
  //   <lastmod>2025-10-09</lastmod>
  //   <changefreq>daily</changefreq>
  //   <priority>0.5</priority>
  // </url>
}

generateSitemapFile().catch(console.error);