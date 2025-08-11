import { loadQuery } from "./sanity-load-query"
import { sanityClient } from "sanity:client"
import { Brands } from "../enums/brands"
import { Locales } from "../enums/locales"
import { imageBaseFields, imageFields, videoFields, globalSectionsFields, richContentFields, serviceQuery } from "./cms-queries"

let _serviceTypes = {}
let _serviceGroups = {}
let _services = {}

let _blogCategories = {}
let _blogPosts = {}
let _blogPageSettings = {}

let _projects = {}
let _projectFeatures = {}
let _projectIndustries = {}
let _projectPageSettings = {}

let _pages = {}

let _partners = {}
let _brandSettings = {}
let _footerSettings = {}

let _events
let _careers


// Services
export const getServiceTypes = async (brand) => {
  if (_serviceTypes[brand]) return _serviceTypes[brand]
  
  const data = await sanityClient.fetch(`*[_type == "type_serviceType" && '${brand}' in agencyBrands[]->name ]{
    ...,
    agencyBrands[]->{ ..., name },
    pageSectionsDomaine[]{${globalSectionsFields}},
    pageSectionsStudio[]{${globalSectionsFields}},
    "serviceGroups": *[_type == "type_serviceGroup" && references(^._id) ]{
        ...,
        serviceType->{slug},
        "services": *[_type == "type_service" && references(^._id)] {
            ...
        } | order(orderRank)
    } | order(orderRank),
    isHidden,
    excerpt,
    images[]{${imageFields}},
    metafields{ title, description, image{${imageBaseFields}} },
  } | order(orderRank)`)

  _serviceTypes[brand] = data
  return data
}

export const getServiceGroups = async (brand) => {
  if (_serviceGroups[brand]) return _serviceGroups[brand]
  
  const data = await sanityClient.fetch(`*[_type == "type_serviceGroup" && '${brand}' in agencyBrands[]->name ]{
    ...,
    isHidden,
    excerpt,
    description,
    images[]{${imageFields}},
    agencyBrands[]->{..., slug },
    serviceType->{..., formHeading, formText, hubspotFormId },
    "services": *[_type == "type_service" && references(^._id)]{..., ${serviceQuery} } | order(orderRank),
    metafields{ title, description, image{${imageBaseFields}} },
    pageSectionsDomaine[]{${globalSectionsFields}},
    pageSectionsStudio[]{${globalSectionsFields}},
    "hasContent": {
      "${brand}": defined(*[_type == "type_project" && isHidden != true && agencyBrand->name == '${brand}' && ^._id in services[]->serviceGroup._ref ][0]),
    },
  } | order(orderRank)`)
  _serviceGroups[brand] = data
  return data
}

export const getServices = async (brand) => {
  if (_services[brand]) return _services[brand]
  
  const data = await sanityClient.fetch(`*[_type == "type_service" && '${brand}' in agencyBrands[]->name ]{
    ...,
    isHidden,
    excerpt,
    description,
    agencyBrands[]->{..., slug, name},
    serviceGroup->{
        ..., 
        serviceType->{...},
        _id
    },
    pageSectionsDomaine[]{${globalSectionsFields}},
    pageSectionsStudio[]{${globalSectionsFields}},
    metafields{ title, description, image{${imageBaseFields}} },
  } | order(postDate desc)`)

  _services[brand] = data
  return data
}

// Blog
export const getBlogPosts = async (brand) => {
  if (_blogPosts[brand]) return _blogPosts[brand]
  const data = await sanityClient.fetch(`*[_type == "type_blog" && agencyBrand->name == '${brand}' && isHidden != true ]{
    ..., 
    _id,
    slug,
    authors[]->{name, role, bio, image{${imageFields}}, department->{title} },
    postDate,
    thumbnailImage{${imageFields}},
    category->{..., slug{...} }, 
    body{
      ..., 
      richContent[]{${richContentFields}},
      translations{ 
          ${Object.keys(Locales).filter(locale => Locales[locale] !== "en").map((locale) => (
            `"${Locales[locale]}": ${Locales[locale]}[]{ ..., children[]{${richContentFields}} }`
          )
        ).join()}
      },
    },
    services[]->{...},
    agencyBrand->{slug, name },
    globalSections{ sections[]{${globalSectionsFields}} },
    metafields{ title, description, image{${imageBaseFields}} },
  } | order(postDate desc)`)

  // _blogPosts[brand] = await data
  return data
}

export const getBlogCategories = async (brand) => {
  if (_blogCategories[brand]) return _blogCategories[brand]
  
  const data = await sanityClient.fetch(`*[_type == "type_blogCategory" && defined(*[_type == "type_blog" && isHidden != true && agencyBrand->name == '${brand}' && references(^._id)][0])]{
    ...,
    "hasContent": {
      "${brand}": defined(*[_type == "type_blog" && isHidden != true && agencyBrand->name == '${brand}' && references(^._id)][0]),
    },
    metafields{ title, description, image{${imageBaseFields}} }
  } | order(title.text asc)`)

  _blogCategories[brand] = data
  return data
}

export const getBlogPageSettings = async (brand) => {
  if (_blogPageSettings[brand]) return _blogPageSettings[brand]
  const blogIndexId = brand === Brands.STUDIO ? 'page_blog-index-studio' : 'page_blog-index-domaine'
  const data = await sanityClient.fetch(`*[_type == "page_blog-index" && _id == ${blogIndexId}][0]`)
  _blogPageSettings[brand] = data
  return data
}

// Projects
export const getProjects = async (brand) => {
  if (_projects[brand]) return _projects[brand]
  
  const data = await sanityClient.fetch(`*[_type == "type_project" && isHidden != true && agencyBrand->name == '${brand}' ]{
    title,
    isHidden,
    description,
    excerpt,
    industry->{...},
    url,
    client->{..., logoDark{${imageBaseFields}}, logoLight{${imageBaseFields}}, isEnterprise, "logo": logo.asset->url },
    foregroundColor,
    backgroundColor,
    accentColor,
    services[]->{..., serviceGroup->{slug, title, serviceType->{slug} } },
    features[]->{...},
    partners[]->{..., title, excerpt, slug, icon{${imageFields}}, tier->{..., createLandingPages}, websiteUrl },
    metrics[]{...},
    awards[]{...},
    agencyBrand->{slug, name},
    thumbnailMedia{${videoFields}, ${imageFields}},
    thumbnailImageSecondary{${imageFields}},
    slug{...},
    heroMedia{..., ${videoFields}, ${imageFields}},
    sections[]{${globalSectionsFields}},
    metafields{ title, description, image{${imageBaseFields}} },
    orderRank,
  } | order( orderRank asc)`)

  _projects[brand] = data
  return data
}

export const getProjectFeatures = async (brand) => {
  if (_projectFeatures[brand]) return _projectFeatures[brand]
  
  const data = await sanityClient.fetch(`*[_type == "type_projectFeature" && defined(*[_type == "type_project" && agencyBrand->name == '${brand}' && references(^._id)][0]) ]{
    _id,
    title,
    excerpt,
    slug, 
    "hasContent": {
      "${brand}": defined(*[_type == "type_project" && isHidden != true && agencyBrand->name == '${brand}' && references(^._id)][0]),
    },
    orderRank,
    metafields{ title, description, image{${imageBaseFields}} },
  } | order(orderRank)`)

  _projectFeatures[brand] = data
  return data
}

export const getProjectIndustries = async (brand) => {
  if (_projectIndustries[brand]) return _projectIndustries[brand]
  
  const data = await sanityClient.fetch(`*[_type == "type_industry" && defined(*[_type == "type_project" && agencyBrand->name == '${brand}' && references(^._id)][0]) ]{ 
    ...,
    "hasContent": {
      "${brand}": defined(*[_type == "type_project" && isHidden != true && agencyBrand->name == '${brand}' && references(^._id)][0]),
    },
    excerpt,
    metafields{ title, description, image{${imageBaseFields}} },
  } | order(title)`)

  _projectIndustries[brand] = data
  return data
}

export const getProjectPageSettings = async (brand) => {
  if (_projectPageSettings[brand]) return _projectPageSettings[brand]
  const projectsIndexId = brand === Brands.STUDIO ? 'page_projects-index-studio' : 'page_projects-index-domaine'
  const data = await sanityClient.fetch(`*[_type == "page_projects-index" && _id == '${projectsIndexId}'][0]`)
  _projectPageSettings[brand] = data
  return data
}

// Pages
export const getPages = async (brand) => {
  if (_pages[brand]) return _pages[brand]
  
  const pageType = brand === Brands.STUDIO ? 'page_studio-general' : 'page_general'
  const data = await sanityClient.fetch(`*[_type == $pageType ]{
    ..., 
    media{${imageFields}, ${videoFields}},
    globalSections{ sections[]{${globalSectionsFields}} },
    metafields{ title, description, image{${imageBaseFields}} },
  } | order(_createdAt desc)`, { pageType })

  _pages[brand] = data
  return data
}

// Partners
export const getPartners = async (brand) => {
  if (_partners[brand]) return _partners[brand]
  
  const data = await sanityClient.fetch(`*[_type == "type_partner" && defined(*[_type == "type_project" && agencyBrand->name == '${brand}' && references(^._id)][0])]{
    _id,
    title, 
    slug, 
    excerpt,
    description,
    richContent{ translations{ ...}, richContent[]{${richContentFields}} },
    globalSections{ sections[]{${globalSectionsFields}} },
    icon{${imageFields}}, 
    tier->{slug, title, createLandingPages}, 
    websiteUrl, 
    websiteText,
    instagramUrl,
    twitterUrl,
    linkedInUrl,
    youTubeUrl,
    tikTokUrl,
    "hasContent": {
      "${brand}": defined(*[_type == "type_project" && isHidden != true && agencyBrand->name == '${brand}' && references(^._id)][0]),
    },
    metafields{ title, description, image{${imageBaseFields}} },
    orderRank,
  } | order(orderRank)`)

  _partners[brand] = data
  return data
}

// Events
export const getEvents = async () => {
  if (_events) return _events
  const { data: events } = await loadQuery({ 
    query: `*[_type == "type_event"]{
      ...,
      dateTime,
      partnerLogos[]{${imageFields}},
      speakers[]{..., speakerImage{${imageFields}}, speakerLogo{${imageFields}} },
      thumbnailImage{${imageFields}},
      globalSections{ sections[]{${globalSectionsFields}}},
    } | order(dateTime)`
  })
  _events = events
  return events
}

// Careers
export const getCareers = async () => {
  if (_careers) return _careers
  const response = await fetch('https://api.rippling.com/platform/api/ats/v1/board/domaine-careers/jobs');
  const careers = await response.json();
  _careers = careers
  return careers
}

// Brand Settings
export const getBrandSettings = async (brand) => {
  if (_brandSettings[brand]) return _brandSettings[brand]
  const { data } = await loadQuery({ 
    query: `*[_type == "type_agencyBrand" && name == '${Brands.DOMAINE}' ][0]{
      ..., 
      cookieNoticeText{ 
        translations{ 
          ${Object.keys(Locales).filter(locale => Locales[locale] !== "en").map((locale) => (
            `"${Locales[locale]}": ${Locales[locale]}[]{ ..., children[]{${richContentFields}} }`
          )
        ).join()}
        },
        "richContent": richContent[]{ ..., children[]{${richContentFields}}}
      },
      metafields{ title, description, image{${imageBaseFields}} },
    }`
  })
  _brandSettings[brand] = data
  return data
}
