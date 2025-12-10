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

  const BASE_URL = 'https://domaineworldwide.com';
  const LAST_MODIFIED = new Date().toISOString();

  let sitemapMarkup = "";

  const addSitemapUrl = (url, priority = 0.5) => {
    sitemapMarkup += `<url>\n\t<loc>${BASE_URL}/${url ? url : ''}</loc>\n\t<lastmod>${LAST_MODIFIED}</lastmod>\n\t<changefreq>daily</changefreq>\n\t<priority>${priority}</priority>\n</url>\n`
  }

  // Static pages
  addSitemapUrl('', 1.0);
  addSitemapUrl('studio/', 1.0);
  addSitemapUrl('services/', 0.8);
  addSitemapUrl('studio/services/', 0.8);
  addSitemapUrl('work/', 0.8);
  addSitemapUrl('studio/work/', 0.8);
  addSitemapUrl('partners/', 0.8);
  addSitemapUrl('insights/', 0.6);
  addSitemapUrl('studio/insights/', 0.6);
  addSitemapUrl('resources/', 0.6);
  addSitemapUrl('careers/', 0.6);

  // Fetch dynamic content
  const [ 
    services, 
    serviceGroups, 
    serviceTypes, 
    projects, 
    projectFeatures, 
    projectIndustries, 
    projectPartners, 
    projectServiceGroups, 
    projectServices,
    events,
    partners,
    blogPosts,
    blogCategories,
    resourcesIndexes,
    resourcesPages,
    pages,
    pagesStudio
  ] = await Promise.all([
    sanityClient.fetch(`*[_type == "type_service"]{
      slug{current},
      serviceGroup->{
        slug{current},
        serviceType->{
          slug{current}
        }
      },
      agencyBrands[]->{slug{current}}
    }`),
    sanityClient.fetch(`*[_type == "type_serviceGroup"]{
      slug{current},
      serviceType->{
        slug{current}
      },
      agencyBrands[]->{slug{current}}
    }`),
    sanityClient.fetch(`*[_type == "type_serviceType"]{
      slug{current},
      agencyBrands[]->{slug{current}}
    }`),
    sanityClient.fetch(`*[_type == "type_project"]{
      isHidden,
      slug{current},
      agencyBrand->{slug{current}}
    }`),
    sanityClient.fetch(`*[_type == "type_projectFeature"]{
      slug{current},
      "projectBrands": array::unique(*[_type == "type_project" && references(^._id) && isHidden != true].agencyBrand->slug.current)
    }`),
    sanityClient.fetch(`*[_type == "type_industry"]{
      slug{current},
      "projectBrands": array::unique(*[_type == "type_project" && references(^._id) && isHidden != true].agencyBrand->slug.current)
    }`),
    sanityClient.fetch(`*[_type == "type_partner"]{
      slug{current},
      "projectBrands": array::unique(*[_type == "type_project" && references(^._id) && isHidden != true].agencyBrand->slug.current)
    }`),
    await sanityClient.fetch(`*[_type == "type_serviceGroup"]{
      slug{current},
      "projectBrands": array::unique(*[_type == "type_project" && ^._id in services[]->serviceGroup._ref && isHidden != true].agencyBrand->slug.current)
    }`),
    await sanityClient.fetch(`*[_type == "type_service"]{
      slug{current},
      "projectBrands": array::unique(*[_type == "type_project" && references(^._id) && isHidden != true].agencyBrand->slug.current)
    }`),
    await sanityClient.fetch(`*[_type == "type_event" && !isPrivate]{
      slug{current}
    }`),
    await sanityClient.fetch(`*[_type == "type_partner" && tier->createLandingPages]{
      slug{current}
    }`),
    await sanityClient.fetch(`*[_type == "type_blog" && isHidden != true]{
      slug{current},
      agencyBrand->{slug{current}},
      category->{slug{current}}
    }`),
    await sanityClient.fetch(`*[_type == "type_blogCategory"]{
      slug{current},
      "blogPostBrands": array::unique(*[_type == "type_blog" && references(^._id) && isHidden != true].agencyBrand->slug.current)
    }`),
    await sanityClient.fetch(`*[_type == "type_resources-index"]{
      slug{current}
    }`),
    await sanityClient.fetch(`*[_type == "type_resource"]{
      slug{current},
      resourcesIndex->{slug{current}}
    }`),
    await sanityClient.fetch(`*[_type == "page_general" && !isMarketingPage]{
      slug{current},
    }`),
    await sanityClient.fetch(`*[_type == "page_studio-general" && !isMarketingPage]{
      slug{current},
    }`),
  ]);

  // Add dynamic content to sitemap

  services.forEach(service => {
    service.agencyBrands.forEach(brand => {
      addSitemapUrl(`${brand.slug.current === "/studio" ? "studio/" : ""}services/${service.serviceGroup.serviceType.slug.current}/${service.serviceGroup.slug.current}/${service.slug.current}/`, 0.9);
    });
  });

  serviceGroups.forEach(serviceGroup => {
    serviceGroup.agencyBrands.forEach(brand => {
      addSitemapUrl(`${brand.slug.current === "/studio" ? "studio/" : ""}services/${serviceGroup.serviceType.slug.current}/${serviceGroup.slug.current}/`, 0.7);
    });
  });

  serviceTypes.forEach(serviceType => {
    serviceType.agencyBrands.forEach(brand => {
      addSitemapUrl(`${brand.slug.current === "/studio" ? "studio/" : ""}services/${serviceType.slug.current}/`, 0.8);
    });
  });

  projects.forEach(project => {
    addSitemapUrl(`${project.agencyBrand.slug.current === "/studio" ? "studio/" : ""}work/${project.slug.current}/`, 0.8);
  });

  projectFeatures.forEach(projectFeature => {
    projectFeature.projectBrands.forEach(brand => {
      addSitemapUrl(`${brand === "/studio" ? "studio/" : ""}work/features/${projectFeature.slug.current}/`, 0.6);
    });
  });

  projectIndustries.forEach(projectIndustry => {
    projectIndustry.projectBrands.forEach(brand => {
      addSitemapUrl(`${brand === "/studio" ? "studio/" : ""}work/industries/${projectIndustry.slug.current}/`, 0.6);
    });
  });

  projectPartners.forEach(projectPartner => {
    projectPartner.projectBrands.forEach(brand => {
      addSitemapUrl(`${brand === "/studio" ? "studio/" : ""}work/partners/${projectPartner.slug.current}/`, 0.6);
    });
  });

  projectServiceGroups.forEach(projectServiceGroup => {
    projectServiceGroup.projectBrands.forEach(brand => {
      addSitemapUrl(`${brand === "/studio" ? "studio/" : ""}work/service-groups/${projectServiceGroup.slug.current}/`, 0.6);
    });
  });

  projectServices.forEach(projectService => {
    projectService.projectBrands.forEach(brand => {
      addSitemapUrl(`${brand === "/studio" ? "studio/" : ""}work/services/${projectService.slug.current}/`, 0.6);
    });
  });

  events.forEach(event => {
    addSitemapUrl(`events/${event.slug.current}/`, 0.7);
  });

  partners.forEach(partner => {
    addSitemapUrl(`partners/${partner.slug.current}/`, 0.8);
  });

  blogPosts.forEach(blogPost => {
    addSitemapUrl(`${blogPost.agencyBrand.slug.current === "/studio" ? "studio/" : ""}insights/${blogPost.category.slug.current}/${blogPost.slug.current}/`, 0.6);
  });

  blogCategories.forEach(blogCategory => {
    blogCategory.blogPostBrands.forEach(brand => {
      addSitemapUrl(`${brand === "/studio" ? "studio/" : ""}insights/${blogCategory.slug.current}/`, 0.6);
    });
  });

  resourcesIndexes.forEach(resourcesIndex => {
    addSitemapUrl(`resources/${resourcesIndex.slug.current}/`, 0.6);
  });

  resourcesPages.forEach(resourcesPage => {
    addSitemapUrl(`resources/${resourcesPage.resourcesIndex.slug.current}/${resourcesPage.slug.current}/`, 0.6);
  });

  pages.forEach(page => {
    addSitemapUrl(`${page.slug.current}/`, 0.4);
  });

  pagesStudio.forEach(pageStudio => {
    addSitemapUrl(`studio/${pageStudio.slug.current}/`, 0.4);
  });

  // console.log(pagesStudio)

  const outputPath = join(process.cwd(), 'public', 'sitemap.xml');
  writeFileSync(outputPath, `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapMarkup}</urlset>`, 'utf-8');
  console.log(`📍 Sitemap generated successfully at ${outputPath}`);
}

generateSitemapFile().catch(console.error);