import { defineCollection } from 'astro:content';
import { agencyBrandsQuery, blogCardFields, eventQuery, globalSectionsFields, imageBaseFields, imageFields, locationsQuery, partnerTileFields, projectGridFields, projectPageFields, richContentFields, serviceGroupQuery, serviceQuery, serviceTypePageQuery, videoFields } from './lib/cms-queries';
import {sanityClient} from "sanity:client"
import { loadQuery } from './lib/sanity-load-query';
import { Brands } from './enums/brands';

// Services
const services = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_service" ]{
      ${serviceQuery}
      pageSectionsDomaine[]{${globalSectionsFields}},
      pageSectionsStudio[]{${globalSectionsFields}},
    } | order(postDate desc)`})
    return data.map((entry) => ({
        id: entry.slug.current,
        ...entry
    }))
  }
});

// Service Groups
const serviceGroups = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_serviceGroup"]{
      ${serviceGroupQuery}
      pageSectionsDomaine{ sections[]{${globalSectionsFields}}},
      pageSectionsStudio[]{ sections[]{${globalSectionsFields}}},
  }`})
    return data.map((entry) => ({
      id: entry.slug.current,
      ...entry
  }))
  }
})

// Service Types
const serviceTypes = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_serviceType" ]{
      _id,
      title,
      slug,
      orderRank,
      ${serviceTypePageQuery}
    } | order(orderRank)`})
    return data.map((entry) => ({
      id: entry.slug.current,
      ...entry
    }))
  }
})

// Blog Posts
const blogPosts = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_blog" ]{
      ..., 
      _id,
      slug,
      authors[]->{name, role, bio, image{${imageFields}}, department->{title} },
      postDate,
      thumbnailImage{${imageFields}},
      category->{..., slug{...} }, 
      body{..., richContent[]{${richContentFields}} },
      services[]->{...},
      agencyBrand->{slug, name },
      globalSections{ sections[]{${globalSectionsFields}} },
      metafields{ title, description, image{${imageBaseFields}} },
      "relatedPosts": *[_type == "type_blog" && agencyBrand->name == ^.agencyBrand->name && category._ref == ^.category->._id && isHidden != true && _id != ^._id ]{ _id, slug, postDate } | order(postDate desc)
    } | order(postDate desc)`})
    return data.map((entry) => ({
        id: entry.slug.current,
        ...entry
    }))
  }
});

// Blog Categories
const blogCategories = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_blogCategory"]{
        ...,
        "posts": *[_type == "type_blog" && agencyBrand->name == "Domaine" && references(^._id)]{ _id, slug, postDate } | order(postDate desc),
        "postCount": {
          "${Brands.DOMAINE}": count( *[_type == "type_blog" && isHidden != true && agencyBrand->name == '${Brands.DOMAINE}' && references(^._id)] ),
          "${Brands.STUDIO}": count( *[_type == "type_blog" && isHidden != true && agencyBrand->name == '${Brands.STUDIO}' && references(^._id)] ),
        },
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
const projects = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_project" && isHidden != true ]{
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
    } | order( orderRank asc)`})
    return data.map((entry) => ({
        id: entry.slug.current,
        ...entry
    }))
  }
});

// Industries
const industries = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_industry" && count(*[_type == "type_project" && references(^._id) && agencyBrand->name == "Domaine"]) > 0 ]{ 
      ...,
      "projectCount": {
        "${Brands.DOMAINE}": count( *[_type == "type_project" && isHidden != true && agencyBrand->name == '${Brands.DOMAINE}' && references(^._id)] ),
        "${Brands.STUDIO}": count( *[_type == "type_project" && isHidden != true && agencyBrand->name == '${Brands.STUDIO}' && references(^._id)] ),
      },
      excerpt,
      metafields{ title, description, image{${imageBaseFields}} },
    }`})
    return data.map((entry) => ({
      // id: entry._id,
      id: entry.slug.current,
      ...entry
  }))
  }
})

// Features
const features = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_projectFeature" &&  count(*[_type == "type_project" && agencyBrand->name == "Domaine" && references(^._id)]) > 0 ]{
      _id,
      title,
      excerpt,
      slug, 
      "projectCount": {
        "${Brands.DOMAINE}": count( *[_type == "type_project" && isHidden != true && agencyBrand->name == '${Brands.DOMAINE}' && references(^._id)] ),
        "${Brands.STUDIO}": count( *[_type == "type_project" && isHidden != true && agencyBrand->name == '${Brands.STUDIO}' && references(^._id)] ),
      },
      orderRank,
      metafields{ title, description, image{${imageBaseFields}} },
    }`})
    return data.map((entry) => ({
      id: entry.slug.current,
      ...entry
  }))
  }
})

// Agency Brands
const agencyBrands = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_agencyBrand"]{ ${agencyBrandsQuery} }`})
    return data.map((entry) => ({
      id: entry.slug.current,
      ...entry
    }))
  }
})

// Locations
const locations = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_location"]{${locationsQuery}} | order(orderRank)`})
    return data.map((entry) => ({
      id: entry.slug.current,
      ...entry
    }))
  }
})

// Careers
const careers = defineCollection({
  loader: async () => {
    const careersResponse = await fetch('https://api.rippling.com/platform/api/ats/v1/board/domaine-careers/jobs');
    const data = await careersResponse.json()
    return data.map((entry) => ({
      id: entry.uuid,
      ...entry
    }));
  }
})

// Partners
const partners = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_partner"]{
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
      "projectCount": {
        "${Brands.DOMAINE}": count( *[_type == "type_project" && isHidden != true && agencyBrand->name == '${Brands.DOMAINE}' && references(^._id)] ),
        "${Brands.STUDIO}": count( *[_type == "type_project" && isHidden != true && agencyBrand->name == '${Brands.STUDIO}' && references(^._id)] ),
      },
      "relatedBlogPosts": *[_type == "type_blog" && agencyBrand->name == "Domaine" && references(^._id) && isHidden != true]{ _id, slug, postDate} | order(postDate desc),
      "relatedProjects": *[_type == "type_project" && agencyBrand->name == "Domaine" && references(^._id) && isHidden != true ]{ _id, slug, orderRank } | order(orderRank),
      metafields{ title, description, image{${imageBaseFields}} },
      orderRank,
    } | order(orderRank)`} )
    return data.map((entry) => ({
      id: entry.slug.current,
      ...entry
  }))
  }
})

// Partner Tiers
const partnerTiers = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_partnerTier"]{ 
      ...,
      "partners": *[_type == "type_partner" && references(^._id)]{
        ${partnerTileFields} 
      } | order(orderRank),
    } | order(orderRank)`})
    return data.map((entry) => ({
      id: entry.slug.current,
      ...entry
  }))
  }
})

// General Pages
const pages = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "page_general" || _type == "page_studio-general" ]{
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
    const { data } = await loadQuery({ query: `*[_type == "type_event"]{
      ...,
      dateTime,
      partnerLogos[]{${imageFields}},
      speakers[]{..., speakerImage{${imageFields}}, speakerLogo{${imageFields}} },
      thumbnailImage{${imageFields}},
      globalSections{ sections[]{${globalSectionsFields}}},
      thumbnailImage{${imageFields}},
    } | order(dateTime)`})
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
  services,
  serviceGroups,
  serviceTypes,
  blogPosts,
  blogCategories,
  projects,
  industries,
  features,
  partners,
  partnerTiers,
  events,
  pages,
  pageSettings,
  agencyBrands,
  locations,
  careers
};