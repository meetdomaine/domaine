import { defineCollection } from 'astro:content';
import { blogCardFields, eventQuery, globalSectionsFields, imageBaseFields, imageFields, locationsQuery, partnerTileFields, projectGridFields, projectPageFields, richContentFields, serviceGroupQuery, serviceQuery, serviceTypePageQuery, videoFields } from './lib/cms-queries';
import {sanityClient} from "sanity:client"
import { loadQuery } from './lib/sanity-load-query';


// Services

const services_Domaine = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_service" && "Domaine" in agencyBrands[]->name ]{
      ${serviceQuery}
      "relatedProjects": *[_type == "type_project" && agencyBrand->name == "Domaine" && references(^._id) && isHidden != true ]{ _id, slug, orderRank } | order(orderRank asc),
      "relatedPosts": *[ _type == "type_blog" && agencyBrand->name == "Domaine" && references(^._id) ]{ _id, slug, postDate } | order(postDate desc)
    } | order(postDate desc)`})
    return data.map((entry) => ({
        id: entry.slug.current,
        ...entry
    }))
  }
});

const services_Studio = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_service" && "Studio" in agencyBrands[]->name ]{
      ${serviceQuery}
      "relatedProjects": *[_type == "type_project" && agencyBrand->name == "Studio" && references(^._id) && isHidden != true ]{ _id, slug, orderRank } | order(orderRank asc),
      "relatedPosts": *[ _type == "type_blog" && agencyBrand->name == "Studio" && references(^._id) ]{ _id, slug, postDate } | order(postDate desc)
    } | order(postDate desc)`})
    return data.map((entry) => ({
        id: entry.slug.current,
        ...entry
    }))
  }
});

// Service Groups

const serviceGroups_Domaine = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_serviceGroup" && "/" in agencyBrands[]->slug.current]{
      ${serviceGroupQuery}
      "relatedProjects": *[_type == "type_project" && agencyBrand->name == "Domaine" && references(*[_type == "type_service" && serviceGroup._ref == ^.^._id ]._id) && isHidden != true ]{ _id, slug, orderRank } | order( orderRank asc),
      "relatedPosts": *[ _type == "type_blog" && agencyBrand->name == "Domaine" && ^._id in services[]->serviceGroup._ref ]{ _id, slug, postDate } | order(postDate desc),
      pageSectionsDomaine{ sections[]{${globalSectionsFields}}}
  }`})
    return data.map((entry) => ({
      // id: entry._id,
      id: entry.slug.current,
      ...entry
  }))
  }
})

const serviceGroups_Studio = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_serviceGroup" && "/studio" in agencyBrands[]->slug.current ]{
      ${serviceGroupQuery}
      "relatedProjects": *[_type == "type_project" && agencyBrand->name == "Studio" && references(*[_type == "type_service" && serviceGroup._ref == ^.^._id ]._id) && isHidden != true ]{ _id, slug, orderRank } | order( orderRank asc),
      "relatedPosts": *[ _type == "type_blog" && agencyBrand->name == "Studio" && ^._id in services[]->serviceGroup._ref ]{ _id, slug, postDate } | order(postDate desc),
      pageSectionsStudio[]{ sections[]{${globalSectionsFields}}},
    }`})
    return data.map((entry) => ({
      id: entry.slug.current,
      ...entry
    }))
  }
})

// Service Types

const serviceTypes_Domaine = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_serviceType" && 'Domaine' in agencyBrands[]->name ]{
      "relatedProjects": *[_type == "type_project" && agencyBrand->name == "Domaine" && references(*[_type == "type_service" && serviceGroup->serviceType._ref == ^.^._id ]._id) && isHidden != true ]{ _id, slug, orderRank } | order( orderRank asc),
      "relatedPosts": *[ _type == "type_blog" && agencyBrand->name == "Domaine" && ^._id in services[]->serviceGroup->serviceType._ref ]{ _id, slug, postDate } | order(postDate desc),
      ..., 
      ${serviceTypePageQuery}
    } | order(orderRank)`})
    return data.map((entry) => ({
      // id: entry._id,
      id: entry.slug.current,
      ...entry
  }))
  }
})

const serviceTypes_Studio = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_serviceType" && '/studio' in agencyBrands[]->slug.current ]{
      "relatedProjects": *[_type == "type_project" && agencyBrand->name == "Studio" && references(*[_type == "type_service" && serviceGroup->serviceType._ref == ^.^._id ]._id) && isHidden != true ]{ _id, slug, orderRank } | order( orderRank asc),
      "relatedPosts": *[ _type == "type_blog" && agencyBrand->name == "Studio" && ^._id in services[]->serviceGroup->serviceType._ref ]{ _id, slug, postDate } | order(postDate desc),
      ${serviceTypePageQuery}
    } | order(orderRank)`})
    return data.map((entry) => ({
      // id: entry._id,
      id: entry.slug.current,
      ...entry
  }))
  }
})

// Blog Posts

const query_BlogPost = `
  ..., 
  _id,
  slug,
  authors[]->{name, role, bio, image{${imageFields}}, department->{title} },
  postDate,
  thumbnailImage{${imageFields}},
  category->{..., slug{...} }, 
  body{..., richContent[]{${richContentFields}} },
  services[]->{...},
  agencyBrand->{slug},
  globalSections{ sections[]{${globalSectionsFields}} },
  metafields{ title, description, image{${imageBaseFields}} },
  "relatedPosts": *[_type == "type_blog" && agencyBrand->name == ^.agencyBrand->name && category._ref == ^.category->._id && isHidden != true && _id != ^._id ]{ _id, slug, postDate } | order(postDate desc)
`

const blogPosts_Domaine = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_blog" && agencyBrand->name == "Domaine" ]{${query_BlogPost}} | order(postDate desc)`})
    return data.map((entry) => ({
        id: entry.slug.current,
        ...entry
    }))
  }
});

const blogPosts_Studio = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_blog" && agencyBrand->name == "Studio" ]{${query_BlogPost}} | order(postDate desc)`})
    return data.map((entry) => ({
        id: entry.slug.current,
        ...entry
    }))
  }
});

// Blog Categories

const blogCategories_Domaine = defineCollection({
  // loader: sanityLoader({ query: `*[_type == 'type_service']{...}` })
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_blogCategory" && count( *[_type == "type_blog" && isHidden != true && agencyBrand->name == "Domaine" && references(^._id)] ) > 0]{
        ...,
        "posts": *[_type == "type_blog" && agencyBrand->name == "Domaine" && references(^._id)]{ _id, slug, postDate } | order(postDate desc),
        metafields{ title, description, image{${imageBaseFields}} }
    } | order(title.text asc)`})
    return data.map((entry) => ({
        // id: entry._id,
        id: entry.slug.current,
        ...entry
    }))
  }
});

const blogCategories_Studio = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_blogCategory" && count( *[_type == "type_blog" && isHidden != true && agencyBrand->name == "Studio" && references(^._id)] ) > 0]{
        ...,
        "posts": *[_type == "type_blog" && agencyBrand->name == "Studio" && references(^._id)]{ _id, slug, postDate } | order(postDate desc),
        metafields{ title, description, image{${imageBaseFields}} }
    } | order(title.text asc)`})
    return data.map((entry) => ({
        // id: entry._id,
        id: entry.slug.current,
        ...entry
    }))
  }
});

// Projects

const projects_Domaine = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_project" && agencyBrand->name == "Domaine" && isHidden != true ]{${projectPageFields}} | order( orderRank asc)`})
    return data.map((entry) => ({
        id: entry.slug.current,
        ...entry
    }))
  }
});

const projects_Studio = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_project" && agencyBrand->name == "Studio" && isHidden != true ]{${projectPageFields}} | order( orderRank asc)`})
    return data.map((entry) => ({
        id: entry.slug.current,
        ...entry
    }))
  }
});

// Industries

const industries_Domaine = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_industry" && count(*[_type == "type_project" && references(^._id) && agencyBrand->name == "Domaine"]) > 0 ]{ 
      ..., 
      excerpt,
      metafields{ title, description, image{${imageBaseFields}} },
      "relatedProjects": *[_type == "type_project" && agencyBrand->name == "Domaine" && references(^._id) && isHidden != true ]{ _id, slug },
    }`})
    return data.map((entry) => ({
      // id: entry._id,
      id: entry.slug.current,
      ...entry
  }))
  }
})

const industries_Studio = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_industry" && count(*[_type == "type_project" && references(^._id) && agencyBrand->name == "Studio"]) > 0 ]{ 
      ..., 
      excerpt,
      metafields{ title, description, image{${imageBaseFields}} },
      "relatedProjects": *[_type == "type_project" && agencyBrand->name == "Studio" && references(^._id) && isHidden != true ]{ _id, slug },
    }`})
    return data.map((entry) => ({
      // id: entry._id,
      id: entry.slug.current,
      ...entry
  }))
  }
})

// Features

const features_Domaine = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_projectFeature" &&  count(*[_type == "type_project" && agencyBrand->name == "Domaine" && references(^._id)]) > 0 ]{
      _id,
      title,
      excerpt,
      slug, 
      orderRank,
      metafields{ title, description, image{${imageBaseFields}} },
      "relatedProjects": *[_type == "type_project" && agencyBrand->name == "Domaine" && references(^._id) && isHidden != true ]{ _id, slug },
    }`})
    return data.map((entry) => ({
      id: entry.slug.current,
      ...entry
  }))
  }
})

const features_Studio = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_projectFeature" &&  count(*[_type == "type_project" && agencyBrand->name == "Studio" && references(^._id)]) > 0 ]{
      _id,
      title,
      excerpt,
      slug, 
      orderRank,
      metafields{ title, description, image{${imageBaseFields}} },
      "relatedProjects": *[_type == "type_project" && agencyBrand->name == "Studio" && references(^._id) && isHidden != true ]{ _id, slug },
    }`})
    return data.map((entry) => ({
      id: entry.slug.current,
      ...entry
  }))
  }
})

// Partners

const query_Partner = `
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
  "relatedBlogPosts": *[_type == "type_blog" && agencyBrand->name == "Domaine" && references(^._id) && isHidden != true]{ _id, slug, postDate} | order(postDate desc),
  "relatedProjects": *[_type == "type_project" && agencyBrand->name == "Domaine" && references(^._id) && isHidden != true ]{ _id, slug, orderRank } | order(orderRank),
  metafields{ title, description, image{${imageBaseFields}} },
  orderRank,
`

const partners_Domaine = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_partner" && count(*[_type == "type_project" && agencyBrand->name == "Domaine"]) > 0]{${query_Partner}}`})
    return data.map((entry) => ({
      id: entry.slug.current,
      ...entry
  }))
  }
})

const partners_Studio = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query :`*[_type == "type_partner" && count(*[_type == "type_project" && references(^._id) && agencyBrand->name == "Studio"]) > 0]{
      _id,
      title, 
      excerpt, 
      slug, 
      icon{${imageFields}}, 
      tier->{slug, title, createLandingPages}, 
      websiteUrl, 
      orderRank,
      "relatedProjects": *[_type == "type_project" && agencyBrand->name == "Studio" && references(^._id) && isHidden != true ]{ _id, slug },
      metafields{ title, description, image{${imageBaseFields}} },
    }`})
    return data.map((entry) => ({
      // id: entry._id,
      id: entry.slug.current,
      ...entry
  }))
  }
})

// Partner Tiers
const partnerTiers_Domaine = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_partnerTier"]{ 
      ...,
      "partners": *[_type == "type_partner" && references(^._id)]{
        ${partnerTileFields} 
      } | order(orderRank),
    } | order(orderRank)`})
    return data.map((entry) => ({
      // id: entry._id,
      id: entry.slug.current,
      ...entry
  }))
  }
})

// General Pages

const generalPages_Domaine = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "page_general" && !isMarketingPage]{
      ..., 
      globalSections{ sections[]{${globalSectionsFields}} },
      metafields{ title, description, image{${imageBaseFields}} },
    } | order(_createdAt desc)`})
    return data.map((entry) => ({
      id: entry.slug.current,
      ...entry
    }))
  }
})

const generalPages_Studio = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "page_studio-general"]{
      ..., 
      globalSections{ sections[]{${globalSectionsFields}} },
      metafields{ title, description, image{${imageBaseFields}} },
    } | order(_createdAt desc)`})
    return data.map((entry) => ({
      id: entry.slug.current,
      ...entry
    }))
  }
})

// Marketing Pages

const marketingPages_Domaine = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "page_general" && isMarketingPage == true]{
      ..., 
      media{${imageFields}, ${videoFields}},
      globalSections{ sections[]{${globalSectionsFields}} },
      metafields{ title, description, image{${imageBaseFields}} },
    } | order(_createdAt desc)`})
    return data.map((entry) => ({
      id: entry.slug.current,
      ...entry
    }))
  }
})

const marketingPages_Studio = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "page_studio_general" && isMarketingPage == true]{
      ..., 
      media{${imageFields}, ${videoFields}},
      globalSections{ sections[]{${globalSectionsFields}} },
      metafields{ title, description, image{${imageBaseFields}} },
    } | order(_createdAt desc)`})
    return data.map((entry) => ({
      id: entry.slug.current,
      ...entry
    }))
  }
})

// Events

const events = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_event"]{${eventQuery}} | order(dateTime)`})
    return data.map((entry) => ({
      id: entry.slug.current,
      ...entry
    }))
  }
})

// Page Settings

const query_HeaderSettings = `
  ...,
  locationClocks[]->{${locationsQuery}},
  linkCardImage{${imageFields}},
  brandMenuBrands[]{
      ..., 
      media{${videoFields}, ${imageFields}} 
  }
`

const pageSettings = defineCollection({
  // loader: sanityLoader({ query: `*[_type == 'type_service']{...}` })
  loader: async () => {

    const { data: headerSettings_Domaine } = await loadQuery({ query: `*[_type == "settings_header" && _id == "settings_header--domaine"]{${query_HeaderSettings}}[0]`})
    const { data: headerSettings_Studio } = await loadQuery({ query: `*[_type == "settings_header" && _id == "settings_header--studio"]{${query_HeaderSettings}}[0]`})

    const { data: pageHome_Domaine } = await loadQuery({ query: `*[_type == "page_home-domaine"][0]{ 
      ...,  
      globalSections{ sections[]{${globalSectionsFields}} }, 
      media{ ..., ${imageFields}, ${videoFields} },
      metafields{ title, description, image{${imageBaseFields}} },
    }`})

    const { data: blogIndex_Domaine } = await loadQuery({ query: `*[_type == "page_blog-index" && _id == "page_blog-index-domaine"][0]`})
    const { data: blogIndex_Studio } = await loadQuery({ query: `*[_type == "page_blog-index" && _id == "page_blog-index-studio"][0]`})

    const { data: projectsIndex_Domaine } = await loadQuery({ query: `*[_type == "page_projects-index" && _id == "page_projects-index-domaine"][0]`})
    const { data: projectsIndex_Studio } = await loadQuery({ query: `*[_type == "page_projects-index" && _id == "page_projects-index-studio"][0]`})
    
    const { data: servicesIndex_Domaine } = await loadQuery({ query: `
      *[_type == "page_services-index-domaine" && _id == "page_services-index-domaine"]{
          ...,
          sections[]{${globalSectionsFields}},
          metafields{ title, description, image{${imageBaseFields}} },
      }[0]
    `})
    
    const { data: servicesIndex_Studio } = await loadQuery({ query: `*[_type == "page_services-index-studio" && _id == "page_services-index-studio"]{
        ...,  
        title,
        heading,
        images[]{${imageFields}},
        sections[]{${globalSectionsFields}},
        metafields
      }[0]
    `})

    const { data: footerSettings_Domaine } = await loadQuery({ query: `*[_type == "settings_footer" && _id == "settings_footer--domaine"][0]` })
    const { data: footerSettings_Studio } = await loadQuery({ query: `*[_type == "settings_footer" && _id == "settings_footer--studio"][0]` })

    const { data: brandSettings_Domaine } = await loadQuery({ query: `*[_type == "type_agencyBrand" && slug.current == "/"][0]{ ..., cookieNoticeText{ ..., richContent[]{${richContentFields}} }}`})
    const { data: brandSettings_Studio } = await loadQuery({ query: `*[_type == "type_agencyBrand" && slug.current == "/studio"][0]`})

    const { data: partnersIndex_Domaine } = await loadQuery({ query: ` *[_type == "page_partners-index"] { 
      title, 
      heading, 
      heroMedia{${videoFields}}, 
      text, 
      formHeading, 
      formText, 
      hubspotFormId,
      metafields{ title, description, image{${imageBaseFields}} },
    }[0]`})

    return [
      {
        id: pageHome_Domaine._id,
        ...pageHome_Domaine
      },
      {
        id: blogIndex_Domaine._id,
        ...blogIndex_Domaine
      },
      {
        id: blogIndex_Studio._id,
        ...blogIndex_Studio
      },
      {
        id: projectsIndex_Domaine._id,
        ...projectsIndex_Domaine
      },
      {
        id: projectsIndex_Studio._id,
        ...projectsIndex_Studio
      },
      {
        id: servicesIndex_Domaine._id,
        ...servicesIndex_Domaine
      },
      {
        id: servicesIndex_Studio._id,
        ...servicesIndex_Studio
      },
      {
        id: "headerSettings_Domaine",
        ...headerSettings_Domaine
      },
      {
        id: "headerSettings_Studio",
        ...headerSettings_Studio
      },
      {
        id: footerSettings_Domaine._id,
        ...footerSettings_Domaine
      },
      {
        id: footerSettings_Studio._id,
        ...footerSettings_Studio
      },
      {
        id: "brandSettings_Domaine",
        ...brandSettings_Domaine
      },
      {
        id: "brandSettings_Studio",
        ...brandSettings_Studio
      },
      {
        id: "partnersIndex_Domaine",
        ...partnersIndex_Domaine
      }
    ]
  }
});

export const collections = { 
  services_Domaine,
  serviceGroups_Domaine,
  serviceTypes_Domaine,
  services_Studio,
  serviceGroups_Studio,
  serviceTypes_Studio,
  blogPosts_Domaine,
  blogPosts_Studio,
  blogCategories_Domaine,
  blogCategories_Studio,
  projects_Domaine,
  projects_Studio,
  industries_Domaine,
  industries_Studio,
  features_Domaine,
  features_Studio,
  partners_Domaine,
  partners_Studio,
  partnerTiers_Domaine,
  events,
  pageSettings,
  generalPages_Domaine,
  generalPages_Studio,
  marketingPages_Domaine,
  marketingPages_Studio
};