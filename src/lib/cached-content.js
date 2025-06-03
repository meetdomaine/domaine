import { getCollection } from "astro:content"

let _serviceTypes = {}
let _services = {}
let _blogCategories = {}
let _blogPosts = {}
let _projects = {}
let _projectFeatures = {}


// Services

export const getServiceTypes = async (brand) => {
  if (_serviceTypes[brand]) return _serviceTypes[brand]
  const allServiceTypes = await getCollection('serviceTypes')
  const serviceTypes = allServiceTypes.filter((serviceType) => serviceType.data.agencyBrands.some((agencyBrand) => agencyBrand.name === brand))
  _serviceTypes[brand] = serviceTypes
  return serviceTypes
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