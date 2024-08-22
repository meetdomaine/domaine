import { agencyBrandsQuery, blogCardFields, blogQuery, clientQuery, partnerTileFields, practicesQuery, projectFeatureQuery, projectGridFields, serviceGroupQuery, serviceQuery, serviceTypeQuery } from "./cms-queries"

// Global Content
export const agencyBrands = await sanityClient.fetch(`*[_type == 'type_agencyBrand']{${agencyBrandsQuery}} | order(orderRank)`)
export const practices = await sanityClient.fetch(`*[_type == 'type_practice']{${practicesQuery}} | order(orderRank)`)

// Blog - All
export const allBlogPosts_Domaine = await sanityClient.fetch(`*[_type == "type_blog" && agencyBrand->name == "Domaine" ]{${blogQuery} } | order( postDate desc)`)
export const allBlogPosts_Studio = await sanityClient.fetch(`*[_type == "type_blog" && agencyBrand->name == "Studio" ]{${blogQuery} } | order( postDate desc)`)

// Blog - Categories
export const allBlogCategories_Domaine = await sanityClient.fetch(`*[_type == "type_blogCategory" && count( *[_type == "type_blog" && agencyBrand->name == "Domaine" && references(^._id)] ) > 0]`)
export const allBlogCategories_Studio = await sanityClient.fetch(`*[_type == "type_blogCategory" && count( *[_type == "type_blog" && agencyBrand->name == "Studio" && references(^._id)] ) > 0]`)

// Projects - All
export const allProjects_Domaine = await sanityClient.fetch(`*[_type == "type_project" && agencyBrand->name == "Domaine"]{${projectGridFields}} | order( orderRank asc)`)
export const allProjects_Studio = await sanityClient.fetch(`*[_type == "type_project" && agencyBrand->name == "Studio"]{${projectGridFields}} | order( orderRank asc)`)

// Project Features - All
export const allProjectFeatures_Domaine = await sanityClient.fetch(`*[_type == "type_projectFeature" &&  count(*[_type == "type_project" && agencyBrand->name == "Domaine" && references(^._id)]) > 0 ]{${projectFeatureQuery} } | order( orderRank asc)`)
export const allProjectFeatures_Studio = await sanityClient.fetch(`*[_type == "type_projectFeature" &&  count(*[_type == "type_project" && agencyBrand->name == "Studio" && references(^._id)]) > 0 ]{${projectFeatureQuery} } | order( orderRank asc)`)



// Partners - All
export const allPartners_Domaine = await sanityClient.fetch(`*[_type == "type_partner" && count(*[_type == "type_project" && references(^._id) && agencyBrand->name == "Domaine"]) > 0]{${partnerTileFields}} | order(orderRank)`)
export const allPartners_Studio = await sanityClient.fetch(`*[_type == "type_partner" && count(*[_type == "type_project" && references(^._id) && agencyBrand->name == "Studio"]) > 0]{${partnerTileFields}} | order(orderRank)`)

// Service Types - All
export const allServiceTypes_Domaine = await sanityClient.fetch(`*[_type == "type_serviceType" && 'Domaine' in agencyBrands[]->name ]{${serviceTypeQuery}} | order(orderRank)`)
export const allServiceTypes_Studio = await sanityClient.fetch(`*[_type == "type_serviceType" && 'Studio' in agencyBrands[]->name ]{${serviceTypeQuery}} | order(orderRank)`)

// Service Groups - All
export const allServiceGroups_Domaine = await sanityClient.fetch(`*[_type == "type_serviceGroup" && count( *[_type == "type_service" && references(^._id) && count( *[_type == "type_project" && references(^._id) && agencyBrand->name == "Domaine" ]) > 0  ]) > 0 ]{${serviceGroupQuery}} | order(orderRank asc)`)
export const allServiceGroups_Studio= await sanityClient.fetch(`*[_type == "type_serviceGroup" && count( *[_type == "type_service" && references(^._id) && count( *[_type == "type_project" && references(^._id) && agencyBrand->name == "Studio" ]) > 0  ]) > 0 ]{${serviceGroupQuery}} | order(orderRank asc)`)

// Services - All
export const allServices_Domaine = await sanityClient.fetch(`*[_type == "type_service" && "Domaine" in agencyBrands[]->name ]{${serviceQuery}} | order(postDate desc)`)
export const allServices_Studio = await sanityClient.fetch(`*[_type == "type_service" && "Studio" in agencyBrands[]->name ]{${serviceQuery}} | order(postDate desc)`)

// Clients - All
export const allClients_Domaine = await sanityClient.fetch(`*[_type == "type_client" && count(*[_type == "type_project" && agencyBrand->name == "Domaine" && references(^._id) ]) > 0 ]{${clientQuery}} | order(orderRank)`)
export const allClients_Studio = await sanityClient.fetch(`*[_type == "type_client" && count(*[_type == "type_project" && agencyBrand->name == "Studio" && references(^._id) ]) > 0 ]{${clientQuery}} | order(orderRank)`)

// Client Industries
export const allClientIndustries_Domaine = await sanityClient.fetch(`*[_type == "type_industry" && count(*[_type == "type_project" && references(^._id) && agencyBrand->name == "Domaine"]) > 0 ] | order(title asc)`)
export const allClientIndustries_Studio = await sanityClient.fetch(`*[_type == "type_industry" && count(*[_type == "type_project" && references(^._id) && agencyBrand->name == "Studio"]) > 0 ] | order(title asc)`)