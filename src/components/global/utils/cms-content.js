import { agencyBrandsQuery, blogCardFields, partnerTileFields, practicesQuery, projectFeatureQuery, projectGridFields } from "./cms-queries"

// Global Content
export const agencyBrands = await sanityClient.fetch(`*[_type == 'type_agencyBrand']{${agencyBrandsQuery}} | order(orderRank)`)
export const practices = await sanityClient.fetch(`*[_type == 'type_practice']{${practicesQuery}} | order(orderRank)`)

// Blog - All
export const allBlogPosts_Domaine = await sanityClient.fetch(`*[_type == "type_blog" && agencyBrand->name == "Domaine" ]{${blogCardFields} } | order( postDate desc)`)
export const allBlogPosts_Studio = await sanityClient.fetch(`*[_type == "type_blog" && agencyBrand->name == "Studio" ]{${blogCardFields} } | order( postDate desc)`)

// Projects - All
export const allProjects_Domaine = await sanityClient.fetch(`*[_type == "type_project" && agencyBrand->name == "Domaine"]{${projectGridFields}} | order( orderRank asc)`)
export const allProjects_Studio = await sanityClient.fetch(`*[_type == "type_project" && agencyBrand->name == "Studio"]{${projectGridFields}} | order( orderRank asc)`)

// Features - All
export const allProjectFeatures_Domaine = await sanityClient.fetch(`*[_type == "type_projectFeature" &&  count(*[_type == "type_project" && agencyBrand->name == "Domaine" && references(^._id)]) > 0 ]{${projectFeatureQuery} } | order( orderRank asc)`)
export const allProjectFeatures_Studio = await sanityClient.fetch(`*[_type == "type_projectFeature" &&  count(*[_type == "type_project" && agencyBrand->name == "Studio" && references(^._id)]) > 0 ]{${projectFeatureQuery} } | order( orderRank asc)`)
// console.log(await allProjectFeatures_Domaine.length)

// Partners - All
export const allPartners = await sanityClient.fetch(`*[_type == "type_partner"]{${partnerTileFields}} | order(orderRank)[0...10]`)

export const latestProjects = 'test'