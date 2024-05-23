import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '87sa1ng7',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-12-12', // use current date (YYYY-MM-DD) to target the latest API version
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

// Reusable Fields
const imageFields = 'crop, asset->{_id, metadata}, alt'
const projectCardFields = `"tags": tags[]->{name, slug}, mainImage{${imageFields}}, thumbnail{${imageFields}}`

const sectionBlocks = (`
  ...,
  _type == "sectionHero" => { ..., image{${imageFields}} },
  _type == "sectionClients" => {..., clients[]->{..., logo{${imageFields}}, image{${imageFields}}} },
  _type == "sectionAbout" => {..., image{${imageFields}}, "videoURL": video.asset -> url},
  _type == "sectionPartners" => {..., logos[]{..., partnerLogo{${imageFields}} } },
  _type == "sectionAgencies" => {..., agencies[]{..., logo{${imageFields}}} },


  _type == "sectionServices" => {...},
  _type == "sectionContact" => {...},
  _type == "sectionWork" => {..., projects[]->{..., ${projectCardFields} }},
  _type == "sectionTextHero" => {...},
  _type == "sectionMediaFullbleed" => {..., image{${imageFields}} },
  _type == "sectionMediaGrid" => {...},
  _type == "sectionServiceDetail" => {..., image{${imageFields}}, service->{ ...}},
  _type == "sectionTextColumns" => {...},
  _type == "sectionMediaGallery" => {..., media[]{..., "videoURL": video.asset->url, image{${imageFields}} } },
  _type == "sectionContentBlocks" => {...,  blocks[]{..., "videoURL": video.asset->url, image{${imageFields}} }  },
  _type == "sectionTextImage" => {..., image{${imageFields}} },
  _type == "sectionSpeakers" => {..., speakers[]{..., image{${imageFields}}, companyLogo{${imageFields}} } },
`)



// Validated


export async function getSEOSettings() {
  const content = await client.fetch(`*[_type == "seoSettings"]`)
  return content
}

export async function getHeaderContent() {
  const content = await client.fetch(`*[_type == "sectionHeader"]`)
  return content
}

export async function getFooterContent() {
  const content = await client.fetch(`*[_type == "sectionFooter"]`)
  return content[0]
}

// Home

export async function getHomePageContent() {
  const content = await client.fetch(`*[_type == "pageHome"]{..., content[]{${sectionBlocks}} }`)
  return content[0]
}

// Services

export async function getServicesPageContent() {
  const pageContent = await client.fetch(`*[_type == "pageServices"]{ ..., content[]{${sectionBlocks}}}`);
  return pageContent[0];
}

export async function getServices() {
  const services = await client.fetch(`*[_type == "categoryService"]{...} | order(orderRank)`)
  return services
}

export async function getServiceGroups(service) {
  const serviceGroups = await client.fetch(`*[_type == "categoryServiceGroup" && service._ref == "${service}" ]{ ... } | order(orderRank)`);
  return serviceGroups;
}

export async function getServiceGroupDeliverables(group) {
  // console.log(group)
  const deliverables = await client.fetch(`*[_type == "contentDeliverable" && category._ref == "${group}"]{...} | order(orderRank)`);
  return deliverables;
}

// Blog

export async function getBlogPageContent() {
  const pageContent = await client.fetch(`
    *[_type == "pageBlog"]{ ..., "featuredPost": featuredPost->{title, slug, excerpt, mainImage{${imageFields}}, "category": category->{name, slug}} }
  `)
  return pageContent[0]
}

export async function getBlogCategories() {
  const categories = await client.fetch(`*[_type == "categoryBlog"]`)
  return categories
}

const blogPostQuery = `..., mainImage{${imageFields}}, authors[]->{..., image{${imageFields}}}, category->{...}, categories[]->{...}`

export async function getBlogPosts() {
  const postContent = await client.fetch(`
    *[_type == 'contentBlog']{${blogPostQuery}} | order(publishedAt desc)
  `)
  return postContent
}

export async function getRelatedBlogPosts(project) {
  const relatedPosts = await client.fetch(`
    *[_type == 'contentBlog' && _id != '${project._id}' && category._ref == '${project.category._id}' ]{${blogPostQuery}}
  `)
  return relatedPosts
}

// Projects

const projectFields = `..., "tags": tags[]->{name, slug}, mainImage{${imageFields}}, thumbnail{${imageFields}}, content[]{${sectionBlocks}}`

export async function getWorkPageContent() {
  const content = await client.fetch(`*[_type == "pageWork"]{...}`)
  return content[0]
}

export async function getProjects() {
  const projects = await client.fetch(`*[_type == "contentProject" && !hideProject ]{${projectFields}} | order(launchDate desc)`)
  return projects
}

export async function getRelatedProjects(project) {
  const relatedProjects = await client.fetch(`*[_type == "contentProject" && category._ref == '${project.category._ref}' && slug.current != '${project.slug.current}' && !hideProject ]{..., thumbnail{${imageFields}} } | order(launchDate desc)`)
  return relatedProjects
}

export async function getProjectCategories() {
  const categories = await client.fetch(`*[_type == "categoryProject"]{...}`)
  return categories
}

export async function getProjectsByCategory(category) {
  const projects = await client.fetch(`*[_type == "contentProject" && category._ref == '${category._id}' && !hideProject ]{${projectFields}} | order(launchDate desc)`)
  return projects
}

export async function getProjectTags() {
  const tags = await client.fetch(`*[_type == "tagProject"]{...}`)
  return tags
}

export async function getProjectsByTag(tag) {
  const projects = await client.fetch(`*[_type == "contentProject" && '${tag._id}' in tags[]->_id ]{${projectFields}} | order(launchDate desc)`)
  return projects
}




// Unvalidated


export async function getPages() {
  const content = await client.fetch(`*[_type == "pageGeneral"]{..., content[]{${sectionBlocks}},}`)
  return content
}

// Events

export async function getEvents() {
  const content = await client.fetch(`*[_type == "contentEvent"]{
    ...,
    content[]{
      ${sectionBlocks}
    },
  }`)
  return content
}

export async function getEventContent(slug) {
  const content = await client.fetch(`*[_type == "contentEvent" && slug.current == '${slug}']{
    title,
    slug,
    location,
    content[]{
      ${sectionBlocks}
    },
    metaTitle,
    metaDescription,
    metaImage, 
  }`)
  return content
}

export async function getDeliverables() {
  const deliverables = await client.fetch(`*[_type == "contentDeliverable" ]{ ..., category->{..., service->{...}} } | order(orderRank)`);
  return deliverables;
}

export async function getServiceDeliverables(service) {
  const deliverables = await client.fetch(`*[_type == "contentDeliverable" && category->service._ref == "${service}" ]{ ..., "category": category->name, "service": category->service->{name, slug}} | order(orderRank)`);
  return deliverables;
}

export async function getServiceCategoryGroup() {
  const serviceGroup = await client.fetch(`*[_type == "categoryServiceGroup" ]{ ..., service->{...}} | order(orderRank)`);
  return serviceGroup;
}






