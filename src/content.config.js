import { defineCollection } from 'astro:content';
import { agencyBrandsQuery, blogCardFields, eventQuery, globalSectionsFields, imageBaseFields, imageFields, locationsQuery, partnerTileFields, projectGridFields, projectPageFields, richContentFields, serviceGroupQuery, serviceQuery, serviceTypePageQuery, videoFields } from './lib/cms-queries';
import { loadQuery } from './lib/sanity-load-query';
import { Brands } from './enums/brands';
import { sanityClient } from 'sanity:client';

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
    const data = await sanityClient.fetch(`*[_type == "type_blog" ]{
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
    } | order(postDate desc)`)
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
        "hasContent": {
          "${Brands.DOMAINE}": defined(*[_type == "type_blog" && isHidden != true && agencyBrand->name == '${Brands.DOMAINE}' && references(^._id)][0]),
          "${Brands.STUDIO}": defined(*[_type == "type_blog" && isHidden != true && agencyBrand->name == '${Brands.STUDIO}' && references(^._id)][0]),
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
    const data = await sanityClient.fetch(`*[_type == "type_project" && isHidden != true ]{
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
    return data.map((entry) => ({
        id: entry.slug.current,
        ...entry
    }))
  }
});

// Industries
const industries = defineCollection({
  loader: async () => {
    const data = await sanityClient.fetch(`*[_type == "type_industry" && defined(*[_type == "type_project" && references(^._id) && agencyBrand->name == "Domaine"][0]) ]{ 
      ...,
      "hasContent": {
        "${Brands.DOMAINE}": defined(*[_type == "type_project" && isHidden != true && agencyBrand->name == '${Brands.DOMAINE}' && references(^._id)][0]),
        "${Brands.STUDIO}": defined(*[_type == "type_project" && isHidden != true && agencyBrand->name == '${Brands.STUDIO}' && references(^._id)][0]),
      },
      excerpt,
      metafields{ title, description, image{${imageBaseFields}} },
    }`)
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
    const data = await sanityClient.fetch(`*[_type == "type_projectFeature" && defined(*[_type == "type_project" && agencyBrand->name == "Domaine" && references(^._id)][0]) ]{
      _id,
      title,
      excerpt,
      slug, 
      "hasContent": {
        "${Brands.DOMAINE}": defined(*[_type == "type_project" && isHidden != true && agencyBrand->name == '${Brands.DOMAINE}' && references(^._id)][0]),
        "${Brands.STUDIO}": defined(*[_type == "type_project" && isHidden != true && agencyBrand->name == '${Brands.STUDIO}' && references(^._id)][0]),
      },
      orderRank,
      metafields{ title, description, image{${imageBaseFields}} },
    }`)
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
    const data = await sanityClient.fetch(`*[_type == "type_location"]{${locationsQuery}} | order(orderRank)`)
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
    const data = await sanityClient.fetch(`*[_type == "type_partner"]{
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
        "${Brands.DOMAINE}": defined(*[_type == "type_project" && isHidden != true && agencyBrand->name == '${Brands.DOMAINE}' && references(^._id)][0]),
        "${Brands.STUDIO}": defined(*[_type == "type_project" && isHidden != true && agencyBrand->name == '${Brands.STUDIO}' && references(^._id)][0]),
      },
      metafields{ title, description, image{${imageBaseFields}} },
      orderRank,
    } | order(orderRank)`)
    return data.map((entry) => ({
      id: entry.slug.current,
      ...entry
  }))
  }
})

// Partner Tiers
const partnerTiers = defineCollection({
  loader: async () => {
    const data = await sanityClient.fetch(`*[_type == "type_partnerTier"]{ 
      ...,
      "partners": *[_type == "type_partner" && references(^._id)]{
        ${partnerTileFields} 
      } | order(orderRank),
    } | order(orderRank)`)
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

// Header
const headerSettings = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "settings_header"]{
      ...,
      locationClocks[]->{${locationsQuery}},
      linkCardImage{${imageFields}},
      brandMenuBrands[]{
          ..., 
          media{${videoFields}, ${imageFields}} 
      }
    } | order(dateTime)`})
    return data.map((entry) => ({
      id: entry._id,
      ...entry
    }))
  }
})

// Footer
const footerSettings = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "settings_footer"]`})
    return data.map((entry) => ({
      id: entry._id,
      ...entry
    }))
  }
})

// Homepage Settings
const homePageSettings = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "page_home-domaine" || _type == "page_home-studio"]{
      ...,
      globalSections{ sections[]{${globalSectionsFields}} }, 
      media{ ..., ${imageFields}, ${videoFields} },
      metafields{ title, description, image{${imageBaseFields}} },
      projects[]{
        project->{${projectGridFields}},
        image{${imageFields}}
      },
    }`})
    return data.map((entry) => ({
      id: entry._id,
      ...entry
    }))
  }
})

// Projects Index Settings
const projectsIndexSettings = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "page_projects-index"]`})
    return data.map((entry) => ({
      id: entry._id,
      ...entry
    }))
  }
})

// Blog Index Settings
const blogIndexSettings = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "page_blog-index"]`})
    return data.map((entry) => ({
      id: entry._id,
      ...entry
    }))
  }
})

// Services Index Settings
const servicesIndexSettings = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "page_services-index-domaine" || _type == "page_services-index-studio"]{
      ...,  
      title,
      heading,
      images[]{${imageFields}},
      sections[]{${globalSectionsFields}},
      metafields{ title, description, image{${imageBaseFields}} },
    }`})
    return data.map((entry) => ({
      id: entry._id,
      ...entry
    }))
  }
})

// Brand Settings
const brandSettings = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: `*[_type == "type_agencyBrand" ]{
      ..., 
      cookieNoticeText{ 
        ..., 
        richContent[]{${richContentFields}}
      },
      metafields{ title, description, image{${imageBaseFields}} },
    }`})
    return data.map((entry) => ({
      id: entry.name,
      ...entry
    }))
  }
})

// Page Settings
const partnersIndexSettings = defineCollection({
  loader: async () => {
    const { data } = await loadQuery({ query: ` *[_type == "page_partners-index"] { 
      _id,
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
        id: "partnersIndex",
        ...data
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
  locations,
  careers,
  headerSettings,
  footerSettings,
  homePageSettings,
  projectsIndexSettings,
  blogIndexSettings,
  servicesIndexSettings,
  brandSettings,
  partnersIndexSettings,
  agencyBrands,
};