import { getCollection } from "astro:content"
import { Brands } from "../enums/brands"

let _serviceTypes = {}
let _serviceGroups = {}
let _services = {}

let _blogCategories = {}
let _blogPosts = {}

let _projects = {}
let _projectFeatures = {}
let _projectIndustries = {}

let _pages = {}

let _partners = {}


// Services
export const getServiceTypes = async (brand) => {
  if (_serviceTypes[brand]) return _serviceTypes[brand]
  const allServiceTypes = await getCollection('serviceTypes')
  const serviceTypes = allServiceTypes.filter((serviceType) => serviceType.data.agencyBrands.some((agencyBrand) => agencyBrand.name === brand))
  _serviceTypes[brand] = serviceTypes
  return serviceTypes
}

export const getServiceGroups = async (brand) => {
  if (_serviceGroups[brand]) return _serviceGroups[brand]
  const allServiceGroups = await getCollection('serviceGroups')
  const serviceGroups = allServiceGroups.filter((serviceGroup) => serviceGroup.data.agencyBrands.some((brand) => brand.name === brand))
  _serviceGroups[brand] = serviceGroups
  return serviceGroups
}

export const getServices = async (brand) => {
  if (_services[brand]) return _services[brand]
  const allServices = await getCollection('services')
  const services = allServices.filter((serviceType) => serviceType.data.agencyBrands.some((agencyBrand) => agencyBrand.name === brand))
  _services[brand] = services
  return services
}

// Blog
export const getBlogPosts = async (brand) => {
  if (_blogPosts[brand]) return _blogPosts[brand]
  const allBlogPosts = await getCollection('blogPosts')
  const blogPosts = allBlogPosts.filter((blogPost) => blogPost.data.agencyBrand.name === brand)
  _blogPosts[brand] = blogPosts
  return blogPosts
}

export const getBlogCategories = async (brand) => {
  if (_blogCategories[brand]) return _blogCategories[brand]
  const allBlogCategories = await getCollection('blogCategories')
  const blogCategories = allBlogCategories.filter((category) => category.data.postCount[brand] > 0)
  _blogCategories[brand] = blogCategories
  return blogCategories
}

// Projects
export const getProjects = async (brand) => {
  if (_projects[brand]) return _projects[brand]
  const allProjects = await getCollection('projects')
  const projects = allProjects.filter((project) => project.data.agencyBrand.name === brand)
  _projects[brand] = projects
  return projects
}

export const getProjectFeatures = async (brand) => {
  if (_projectFeatures[brand]) return _projectFeatures[brand]
  const allProjectFeatures = await getCollection('features')
  const projectFeatures = allProjectFeatures.filter((feature) => feature.data.projectCount[brand] > 0)
  _projectFeatures[brand] = projectFeatures
  return projectFeatures
}

export const getProjectIndustries = async (brand) => {
  if (_projectIndustries[brand]) return _projectIndustries[brand]
  const allProjectIndustries = await getCollection('industries')
  const projectIndustries = allProjectIndustries.filter((industry) => industry.data.projectCount[brand] > 0)
  _projectIndustries[brand] = projectIndustries
  return projectIndustries
}

// Pages
export const getPages = async (brand) => {
  if (_pages[brand]) return _pages[brand]
  const allPages = await getCollection('pages')
  const pages = allPages.filter((page) => page.data._type === (brand === Brands.STUDIO ? 'page_studio-general' :  'page_general') )
  _pages[brand] = pages
  return pages
}

// Partners
export const getPartners = async (brand) => {
  if (_partners[brand]) return _partners[brand]
  const allPartners = await getCollection('partners')
  const partners = allPartners.filter((partner) => partner.data.projectCount[brand] > 0)
  _partners[brand] = partners
  return partners
}