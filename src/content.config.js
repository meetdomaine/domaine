import { defineCollection } from 'astro:content';
import { globalSectionsFields, imageBaseFields, imageFields, projectPageFields, richContentFields, serviceGroupQuery, serviceQuery, serviceTypePageQuery } from './components/global/utils/cms-queries';
import {sanityClient} from "sanity:client"


// Services

const services_Domaine = defineCollection({
  loader: async () => {
    const data = await sanityClient.fetch(`*[_type == "type_service" && "Domaine" in agencyBrands[]->name ]{
      ${serviceQuery}
      "relatedProjects": *[_type == "type_project" && agencyBrand->name == "Domaine" && references(^._id) && isHidden != true ]{ _id, slug }
    } | order(postDate desc)`)
    return data.map((entry) => ({
        id: entry.slug.current,
        ...entry
    }))
  }
});

const services_Studio = defineCollection({
  loader: async () => {
    const data = await sanityClient.fetch(`*[_type == "type_service" && "Studio" in agencyBrands[]->name ]{
      ${serviceQuery}
      "relatedProjects": *[_type == "type_project" && agencyBrand->name == "Studio" && references(^._id) && isHidden != true ]{ _id, slug }
    } | order(postDate desc)`)
    return data.map((entry) => ({
        id: entry.slug.current,
        ...entry
    }))
  }
});

// Service Groups

const serviceGroups_Domaine = defineCollection({
  loader: async () => {
    const data = await sanityClient.fetch(`*[_type == "type_serviceGroup" && "/" in agencyBrands[]->slug.current]{
      ${serviceGroupQuery}
      "relatedProjects": *[_type == "type_project" && agencyBrand->name == "Domaine" && references(*[_type == "type_service" && serviceGroup._ref == ^.^._id ]._id) && isHidden != true ]{ _id, slug },
      pageSectionsDomaine{ sections[]{${globalSectionsFields}}}
  }`)
    return data.map((entry) => ({
      // id: entry._id,
      id: entry.slug.current,
      ...entry
  }))
  }
})

const serviceGroups_Studio = defineCollection({
  loader: async () => {
    const data = await sanityClient.fetch(`*[_type == "type_serviceGroup" && "/studio" in agencyBrands[]->slug.current ]{
      ${serviceGroupQuery}
      "relatedProjects": *[_type == "type_project" && agencyBrand->name == "Studio" && references(*[_type == "type_service" && serviceGroup._ref == ^.^._id ]._id) && isHidden != true ]{ _id, slug },
      pageSectionsStudio[]{ sections[]{${globalSectionsFields}}},
    }`)
    return data.map((entry) => ({
      id: entry.slug.current,
      ...entry
    }))
  }
})

// Service Types

const serviceTypes_Domaine = defineCollection({
  loader: async () => {
    const data = await sanityClient.fetch(`*[_type == "type_serviceType" && 'Domaine' in agencyBrands[]->name ]{
      "relatedProjects": *[_type == "type_project" && agencyBrand->name == "Domaine" && references(^._id) && isHidden != true ]{ _id, slug },
      ..., 
      ${serviceTypePageQuery}
    } | order(orderRank)`)
    return data.map((entry) => ({
      // id: entry._id,
      id: entry.slug.current,
      ...entry
  }))
  }
})

const serviceTypes_Studio = defineCollection({
  loader: async () => {
    const data = await sanityClient.fetch(`*[_type == "type_serviceType" && '/studio' in agencyBrands[]->slug.current ]{
      "relatedProjects": *[_type == "type_project" && agencyBrand->name == "Studio" && references(^._id) && isHidden != true ]{ _id, slug },
      ${serviceTypePageQuery}
    } | order(orderRank)`)
    return data.map((entry) => ({
      // id: entry._id,
      id: entry.slug.current,
      ...entry
  }))
  }
})

// Blog Posts

const blogPosts_Domaine = defineCollection({
  // loader: sanityLoader({ query: `*[_type == 'type_service']{...}` })
  loader: async () => {
    const data = await sanityClient.fetch(`*[_type == "type_blog" && agencyBrand->name == "Domaine" ]{
        ..., 
        _id,
        slug,
        authors[]->{name, role, bio, image{${imageFields}}, department->{title} },
        postDate,
        thumbnailImage{${imageFields}},
        category->{..., slug{...} }, 
        body[]{${richContentFields}},
        services[]->{...},
        agencyBrand->{slug},
        globalSections{ sections[]{${globalSectionsFields}} },
        metafields{ title, description, image{${imageBaseFields}} }
    } | order(postDate desc)`)
    return data.map((entry) => ({
        // id: entry._id,
        id: entry.slug.current,
        ...entry
    }))
  }
});

const blogPosts_Studio = defineCollection({
  // loader: sanityLoader({ query: `*[_type == 'type_service']{...}` })
  loader: async () => {
    const data = await sanityClient.fetch(`*[_type == "type_blog" && agencyBrand->name == "Studio" ]{
        ..., 
        _id,
        slug,
        authors[]->{name, role, bio, image{${imageFields}}, department->{title} },
        postDate,
        thumbnailImage{${imageFields}},
        category->{..., slug{...} }, 
        body[]{${richContentFields}},
        services[]->{...},
        agencyBrand->{slug},
        globalSections{ sections[]{${globalSectionsFields}} },
        metafields{ title, description, image{${imageBaseFields}} }
    } | order(postDate desc)`)
    return data.map((entry) => ({
        // id: entry._id,
        id: entry.slug.current,
        ...entry
    }))
  }
});

// Blog Categories

const blogCategories_Domaine = defineCollection({
  // loader: sanityLoader({ query: `*[_type == 'type_service']{...}` })
  loader: async () => {
    const data = await sanityClient.fetch(`*[_type == "type_blogCategory" && count( *[_type == "type_blog" && isHidden != true && agencyBrand->name == "Domaine" && references(^._id)] ) > 0]{
        ...,
        "posts": *[_type == "type_blog" && agencyBrand->name == "Domaine" && references(^._id)]{ _id, slug, postDate } | order(postDate asc),
        metafields{ title, description, image{${imageBaseFields}} }
    }`)
    return data.map((entry) => ({
        // id: entry._id,
        id: entry.slug.current,
        ...entry
    }))
  }
});

const blogCategories_Studio = defineCollection({
  loader: async () => {
    const data = await sanityClient.fetch(`*[_type == "type_blogCategory" && count( *[_type == "type_blog" && isHidden != true && agencyBrand->name == "Studio" && references(^._id)] ) > 0]{
        ...,
        "posts": *[_type == "type_blog" && agencyBrand->name == "Studio" && references(^._id)]{ _id, slug, postDate } | order(postDate asc),
        metafields{ title, description, image{${imageBaseFields}} }
    }`)
    return data.map((entry) => ({
        // id: entry._id,
        id: entry.slug.current,
        ...entry
    }))
  }
});

// Projects

const projects_Domaine = defineCollection({
  // loader: sanityLoader({ query: `*[_type == 'type_service']{...}` })
  loader: async () => {
    const data = await sanityClient.fetch(`*[_type == "type_project" && agencyBrand->name == "Domaine" && isHidden != true ]{${projectPageFields}} | order( orderRank asc)`)
    return data.map((entry) => ({
        id: entry.slug.current,
        ...entry
    }))
  }
});

const projects_Studio = defineCollection({
  // loader: sanityLoader({ query: `*[_type == 'type_service']{...}` })
  loader: async () => {
    const data = await sanityClient.fetch(`*[_type == "type_project" && agencyBrand->name == "Studio" && isHidden != true ]{${projectPageFields}} | order( orderRank asc)`)
    return data.map((entry) => ({
        id: entry.slug.current,
        ...entry
    }))
  }
});

// Industries

const industries_Domaine = defineCollection({
  loader: async () => {
    const data = await sanityClient.fetch(`*[_type == "type_industry" && count(*[_type == "type_project" && references(^._id) && agencyBrand->name == "Domaine"]) > 0 ]{ 
      ..., 
      excerpt,
      metafields{ title, description, image{${imageBaseFields}} },
      "relatedProjects": *[_type == "type_project" && agencyBrand->name == "Domaine" && references(^._id) && isHidden != true ]{ _id, slug },
    }`)
    return data.map((entry) => ({
      // id: entry._id,
      id: entry.slug.current,
      ...entry
  }))
  }
})

const industries_Studio = defineCollection({
  loader: async () => {
    const data = await sanityClient.fetch(`*[_type == "type_industry" && count(*[_type == "type_project" && references(^._id) && agencyBrand->name == "Studio"]) > 0 ]{ 
      ..., 
      excerpt,
      metafields{ title, description, image{${imageBaseFields}} },
      "relatedProjects": *[_type == "type_project" && agencyBrand->name == "Studio" && references(^._id) && isHidden != true ]{ _id, slug },
    }`)
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
    const data = await sanityClient.fetch(`*[_type == "type_projectFeature" &&  count(*[_type == "type_project" && agencyBrand->name == "Domaine" && references(^._id)]) > 0 ]{
      _id,
      title,
      excerpt,
      slug, 
      orderRank,
      metafields{ title, description, image{${imageBaseFields}} },
      "relatedProjects": *[_type == "type_project" && agencyBrand->name == "Domaine" && references(^._id) && isHidden != true ]{ _id, slug },
    }`)
    return data.map((entry) => ({
      // id: entry._id,
      id: entry.slug.current,
      ...entry
  }))
  }
})

const features_Studio = defineCollection({
  loader: async () => {
    const data = await sanityClient.fetch(`*[_type == "type_projectFeature" &&  count(*[_type == "type_project" && agencyBrand->name == "Studio" && references(^._id)]) > 0 ]{
      _id,
      title,
      excerpt,
      slug, 
      orderRank,
      metafields{ title, description, image{${imageBaseFields}} },
      "relatedProjects": *[_type == "type_project" && agencyBrand->name == "Studio" && references(^._id) && isHidden != true ]{ _id, slug },
    }`)
    return data.map((entry) => ({
      // id: entry._id,
      id: entry.slug.current,
      ...entry
  }))
  }
})

// Partners

const partners_Domaine = defineCollection({
  loader: async () => {
    const data = await sanityClient.fetch(`*[_type == "type_partner" && count(*[_type == "type_project" && references(^._id) && agencyBrand->name == "Domaine"]) > 0]{
      _id,
      title, 
      excerpt, 
      slug, 
      icon{${imageFields}}, 
      tier->{slug, title, createLandingPages}, 
      websiteUrl, 
      orderRank,
      "relatedProjects": *[_type == "type_project" && agencyBrand->name == "Domaine" && references(^._id) && isHidden != true ]{ _id, slug },
      metafields{ title, description, image{${imageBaseFields}} },
    }`)
    return data.map((entry) => ({
      // id: entry._id,
      id: entry.slug.current,
      ...entry
  }))
  }
})

const partners_Studio = defineCollection({
  loader: async () => {
    const data = await sanityClient.fetch(`*[_type == "type_partner" && count(*[_type == "type_project" && references(^._id) && agencyBrand->name == "Studio"]) > 0]{
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
    }`)
    return data.map((entry) => ({
      // id: entry._id,
      id: entry.slug.current,
      ...entry
  }))
  }
})

// Page Settings

const pageSettings_Domaine = defineCollection({
  // loader: sanityLoader({ query: `*[_type == 'type_service']{...}` })
  loader: async () => {

    const blogIndex_Domaine = await sanityClient.fetch(`*[_type == "page_blog-index" && _id == "page_blog-index-domaine"][0]`)
    const blogIndex_Studio = await sanityClient.fetch(`*[_type == "page_blog-index" && _id == "page_blog-index-studio"][0]`)

    const projectsIndex_Domaine = await sanityClient.fetch(`*[_type == "page_projects-index" && _id == "page_projects-index-domaine"][0]`)
    const projectsIndex_Studio = await sanityClient.fetch(`*[_type == "page_projects-index" && _id == "page_projects-index-studio"][0]`)
    
    const servicesIndex_Domaine = await sanityClient.fetch(`
      *[_type == "page_services-index-domaine" && _id == "page_services-index-domaine"]{
          ...,
          sections[]{${globalSectionsFields}},
          metafields{ title, description, image{${imageBaseFields}} },
      }[0]
    `)
    
    const servicesIndex_Studio = await sanityClient.fetch(`*[_type == "page_services-index-studio" && _id == "page_services-index-studio"]{
        ...,  
        title,
        heading,
        images[]{${imageFields}},
        sections[]{${globalSectionsFields}},
        metafields
      }[0]
    `)

    return [
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
  pageSettings_Domaine
};