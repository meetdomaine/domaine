import { 
  agencyBrandsQuery, 
  blogQuery, 
  clientQuery, 
  eventQuery, 
  locationsQuery, 
  partnerTileFields, 
  projectFeatureQuery, 
  projectGridFields, 
  serviceGroupQuery, 
  serviceQuery, 
  serviceTypeQuery 
} from "./cms-queries"

// CMS Content Cache
let _agencyBrands = undefined
let _brandSettings_Domaine = undefined
let _brandSettings_Studio = undefined
let _blogPosts_Domaine = undefined
let _blogPosts_Studio = undefined
let _blogCategories_Domaine = undefined
let _blogCategories_Studio = undefined
let _clients_Domaine = undefined
let _clients_Studio = undefined
let _clientIndustries_Domaine = undefined
let _clientIndustries_Studio = undefined
let _events = undefined
let _locations = undefined
let _partners_Domaine = undefined
let _partners_Studio = undefined
let _projects_Domaine = undefined
let _projects_Studio = undefined
let _projectFeatures_Domaine = undefined
let _projectFeatures_Studio = undefined
let _serviceGroups_Domaine = undefined
let _serviceGroups_Studio = undefined
let _serviceTypes_Domaine = undefined
let _serviceTypes_Studio = undefined
let _services_Domaine = undefined
let _services_Studio = undefined
let _footerSettings_Domaine = undefined
let _footerSettings_Studio = undefined

// Agency Brands
export const getAgencyBrands = async () => {
  if (_agencyBrands) return _agencyBrands
  _agencyBrands = await sanityClient.fetch(`*[_type == 'type_agencyBrand']{${agencyBrandsQuery}} | order(orderRank)` )
  return _agencyBrands
}

export const getBrandSettings_Domaine = async () => {
  if (_brandSettings_Domaine) return _brandSettings_Domaine
  _brandSettings_Domaine = await sanityClient.fetch(`*[_type == "type_agencyBrand" && slug.current == "/"][0]`)
  return _brandSettings_Domaine
}

export const getBrandSettings_Studio = async () => {
  if (_brandSettings_Studio) return _brandSettings_Studio
  _brandSettings_Studio = await sanityClient.fetch(`*[_type == "type_agencyBrand" && slug.current == "/studio"][0]`)
  return _brandSettings_Studio
}

export const getFooterSettings_Domaine = async () => {
  if (_footerSettings_Domaine) return _footerSettings_Domaine
  _footerSettings_Domaine = await sanityClient.fetch(`*[_type == "settings_footer" && _id == "settings_footer--domaine"][0]`)
  return _footerSettings_Domaine
}

export const getFooterSettings_Studio = async () => {
  if (_footerSettings_Studio) return _footerSettings_Studio
  _footerSettings_Studio = await sanityClient.fetch(`*[_type == "settings_footer" && _id == "settings_footer--studio"][0]`)
  return _footerSettings_Studio
}

// Blog - All
export const getBlogPosts_Domaine = async () => {
  if (_blogPosts_Domaine) return _blogPosts_Domaine
  _blogPosts_Domaine = await sanityClient.fetch(`*[_type == "type_blog" && isHidden != true && agencyBrand->name == "Domaine" ]{${blogQuery} } | order( postDate desc)`)
  return _blogPosts_Domaine
}

export const getBlogPosts_Studio = async () => {
  if (_blogPosts_Studio) return _blogPosts_Studio
  _blogPosts_Studio = await sanityClient.fetch(`*[_type == "type_blog" && isHidden != true && agencyBrand->name == "Studio" ]{${blogQuery} } | order( postDate desc)`)
  return _blogPosts_Studio
}

// Blog - Categories
export const getBlogCategories_Domaine = async () => {
  if (_blogCategories_Domaine) return _blogCategories_Domaine
  _blogCategories_Domaine = await sanityClient.fetch(`*[_type == "type_blogCategory" && count( *[_type == "type_blog" && isHidden != true && agencyBrand->name == "Domaine" && references(^._id)] ) > 0]{ ..., slug} | order( orderRank )`)
  return _blogCategories_Domaine
}

export const getBlogCategories_Studio = async () => {
  if (_blogCategories_Studio) return _blogCategories_Studio
  _blogCategories_Studio = await sanityClient.fetch(`*[_type == "type_blogCategory" && count( *[_type == "type_blog" && agencyBrand->name == "Studio" && references(^._id)] ) > 0] | order( orderRank )`)
  return _blogCategories_Studio
}

// Projects - All
export const getProjects_Domaine = async () => {
  if (_projects_Domaine) return _projects_Domaine
  _projects_Domaine = await sanityClient.fetch(`*[_type == "type_project" && agencyBrand->name == "Domaine" && isHidden != true]{${projectGridFields}} | order( orderRank asc)`)
  return _projects_Domaine
}

export const getProjects_Studio = async () => {
  if (_projects_Studio) return _projects_Studio
  _projects_Studio = await sanityClient.fetch(`*[_type == "type_project" && agencyBrand->name == "Studio" && isHidden != true]{${projectGridFields}} | order( orderRank asc)`)
  return _projects_Studio
}

// Project Features - All (Only get features used on 3+ projects)
export const getProjectFeatures_Domaine = async () => {
  if (_projectFeatures_Domaine) return _projectFeatures_Domaine
  _projectFeatures_Domaine = await sanityClient.fetch(`*[_type == "type_projectFeature" &&  count(*[_type == "type_project" && agencyBrand->name == "Domaine" && references(^._id)]) > 0 ]{${projectFeatureQuery} } | order( title asc)`)
  return _projectFeatures_Domaine
}

export const getProjectFeatures_Studio = async () => {
  if (_projectFeatures_Studio) return _projectFeatures_Studio
  _projectFeatures_Studio = await sanityClient.fetch(`*[_type == "type_projectFeature" &&  count(*[_type == "type_project" && agencyBrand->name == "Studio" && references(^._id)]) > 0 ]{${projectFeatureQuery} } | order( title asc)`)
  return _projectFeatures_Studio
}

// Partners - All
export const getPartners_Domaine = async () => {
  if (_partners_Domaine) return _partners_Domaine
  _partners_Domaine = await sanityClient.fetch(`*[_type == "type_partner" && count(*[_type == "type_project" && references(^._id) && agencyBrand->name == "Domaine"]) > 0]{${partnerTileFields}} | order(orderRank)`)
  return _partners_Domaine
}

export const getPartners_Studio = async () => {
  if (_partners_Studio) return _partners_Studio
  _partners_Studio = await sanityClient.fetch(`*[_type == "type_partner" && count(*[_type == "type_project" && references(^._id) && agencyBrand->name == "Studio"]) > 0]{${partnerTileFields}} | order(orderRank)`)
  return _partners_Studio
}

// Service Types - All
export const getServiceTypes_Domaine = async () => {
  if (_serviceTypes_Domaine) return _serviceTypes_Domaine
  _serviceTypes_Domaine = await sanityClient.fetch(`*[_type == "type_serviceType" && 'Domaine' in agencyBrands[]->name ]{${serviceTypeQuery}} | order(orderRank)`)
  return _serviceTypes_Domaine
}

export const getServiceTypes_Studio = async () => {
  if (_serviceTypes_Studio) return _serviceTypes_Studio
  _serviceTypes_Studio = await sanityClient.fetch(`*[_type == "type_serviceType" && 'Studio' in agencyBrands[]->name ]{${serviceTypeQuery}} | order(orderRank)`)
  return _serviceTypes_Studio
}

// Service Groups - All
export const getServiceGroups_Domaine = async () => {
  if (_serviceGroups_Domaine) return _serviceGroups_Domaine
  _serviceGroups_Domaine = await sanityClient.fetch(`*[_type == "type_serviceGroup" && "/" in agencyBrands[]->slug.current]{${serviceGroupQuery}} | order(orderRank asc)`)
  return _serviceGroups_Domaine
}

export const getServiceGroups_Studio = async () => {
  if (_serviceGroups_Studio) return _serviceGroups_Studio
  _serviceGroups_Studio = await sanityClient.fetch(`*[_type == "type_serviceGroup" && "/studio" in agencyBrands[]->slug.current]{${serviceGroupQuery}} | order(orderRank asc)`)
  return _serviceGroups_Studio
}

// Services - All
export const getServices_Domaine = async () => {
  if (_services_Domaine) return _services_Domaine
  _services_Domaine = await sanityClient.fetch(`*[_type == "type_service" && "Domaine" in agencyBrands[]->name ]{${serviceQuery}} | order(postDate desc)`)
  return _services_Domaine
}

export const getServices_Studio = async () => {
  if (_services_Studio) return _services_Studio
  _services_Studio = await sanityClient.fetch(`*[_type == "type_service" && "Studio" in agencyBrands[]->name ]{${serviceQuery}} | order(postDate desc)`)
  return _services_Studio
}

// Clients - All
export const getClients_Domaine = async () => {
  if (_clients_Domaine) return _clients_Domaine
  _clients_Domaine = await sanityClient.fetch(`*[_type == "type_client" && count(*[_type == "type_project" && agencyBrand->name == "Domaine" && references(^._id) ]) > 0 ]{${clientQuery}} | order(orderRank)`)
  return _clients_Domaine
}

export const getClients_Studio = async () => {
  if (_clients_Studio) return _clients_Studio
  _clients_Studio = await sanityClient.fetch(`*[_type == "type_client" && count(*[_type == "type_project" && agencyBrand->name == "Studio" && references(^._id) ]) > 0 ]{${clientQuery}} | order(orderRank)`)
  return _clients_Studio
}

// Client Industries
export const getClientsIndustries_Domaine = async () => {
  if (_clientIndustries_Domaine) return _clientIndustries_Domaine
  _clientIndustries_Domaine = await sanityClient.fetch(`*[_type == "type_industry" && count(*[_type == "type_project" && references(^._id) && agencyBrand->name == "Domaine"]) > 0 ]{ ..., excerpt } | order(title asc)`)
  return _clientIndustries_Domaine
}

export const getClientsIndustries_Studio = async () => {
  if (_clientIndustries_Studio) return _clientIndustries_Studio
  _clientIndustries_Studio = await sanityClient.fetch(`*[_type == "type_industry" && count(*[_type == "type_project" && references(^._id) && agencyBrand->name == "Studio"]) > 0 ]{ ..., excerpt } | order(title asc)`)
  return _clientIndustries_Studio
}

// Events
export const getEvents = async () => {
  if (_events) return _events
  _events = await sanityClient.fetch(`*[_type == "type_event"]{${eventQuery}} | order(dateTime)`)
  return _events
}

// Locations
export const getLocations = async () => {
  if (_locations) return _locations
  _locations = await sanityClient.fetch(`*[_type == "type_location"]{${locationsQuery}} | order(orderRank)`)
  return _locations
}

// Careers
export async function getAllCareers() {
  const careersResponse = await fetch('https://api.rippling.com/platform/api/ats/v1/board/domaine-careers/jobs');
  return await careersResponse.json();
}