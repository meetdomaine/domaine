
import { sanityClient } from "sanity:client"
import imageUrlBuilder from '@sanity/image-url'
import SanityPicture, {  setSanityPictureDefaults} from "astro-sanity-picture";

export const urlBuilder = imageUrlBuilder(sanityClient)
setSanityPictureDefaults({ imageUrlBuilder: urlBuilder })

export function urlFor(source) {
  return urlBuilder.image(source)
}

export const imageBaseFields = `crop, asset->{_id, metadata}, hotspot`
export const imageFields = `image{${imageBaseFields}, alt }`
export const videoFields = 'video{ asset->{playbackId, assetId, filename} }'

export const partnerTileFields = `
  _id,
  title, 
  excerpt, 
  slug, 
  icon{${imageFields}}, 
  tier->{slug, title, createLandingPages}, 
  websiteUrl, 
  orderRank
`

export const agencyBrandsQuery = `..., thumbnailMedia{${videoFields}, ${imageFields}}`
export const practicesQuery = `..., thumbnailMedia{${videoFields}, ${imageFields}}`

export const blogCardFields = `
  title,
  excerpt,
  postDate,
  category->{ _id, title, slug{...} },
  slug{...},
  agencyBrand->{slug},
  thumbnailImage{${imageFields}}
  `

export const projectFeatureQuery = `
  _id,
  title,
  excerpt,
  slug, 
  orderRank,
  "relatedBlogPosts": *[_type=='type_blog' && references(^._id)]{${blogCardFields}}
`

export const projectGridFields = `
  title,
  excerpt,
  slug, 
  industry->{..., _id },
  agencyBrand->{slug},
  partners[]->{..., _id}, 
  client->{title, logoDark{${imageFields}}, logoLight{${imageFields}}, "logo": logo.asset->url, logoWidthProjectCard, productImage{${imageBaseFields}}, isEnterprise },
  logoColor,
  features[]->{ title, slug, _id } | order(orderRank), 
  services[]->{ _id, title, serviceGroup->{ _id, title, slug} },
  orderRank,
  thumbnailMedia{${videoFields}, ${imageFields}},
  thumbnailImageSecondary{${imageFields}},
  heroMedia{${videoFields}, ${imageFields}},
  isHidden,
`

export const serviceQuery = `
  ...,
  excerpt,
  description,
  serviceGroup->{
      ..., 
      serviceType->{...}
  },
  "relatedBlogPosts": *[_type=='type_blog' && references(^._id)]{${blogCardFields}} | order(orderRank),
  "relatedProjects": *[_type == "type_project" && isHidden != true && references(^._id)]{${projectGridFields} } | order(orderRank),
`

export const serviceTypeQuery = `
  ...,
  excerpt,
  images[]{${imageFields}},
  "serviceGroups": *[_type == "type_serviceGroup" && references(^._id) ]{
      ...,
      serviceType->{slug},
      "services": *[_type == "type_service" && references(^._id)] {
          ...
      } | order(orderRank)
  } | order(orderRank),
  "relatedProjects": *[_type == "type_project" && isHidden != true && ^._id in services[]->serviceGroup->serviceType._ref]{${projectGridFields}}| order(orderRank),
  "relatedBlogPosts": *[_type == "type_blog" && ^._id in services[]->serviceGroup->serviceType._ref]{${blogCardFields}}| order(postDate)
`
export const serviceGroupQuery = `
  ..., 
  excerpt,
  images[]{${imageFields}},
  serviceType->{...},
  "services": *[_type == "type_service" && references(^._id)]{..., ${serviceQuery} } | order(orderRank),
  "relatedBlogPosts": *[_type=='type_blog' && ^._id in services[]->serviceGroup._ref ]{${blogCardFields}},
  "relatedProjects": *[_type == "type_project" && isHidden != true && ^._id in services[]->serviceGroup._ref ]{${projectGridFields}} | order(orderRank)
`

export const richContentFields = `
  ...,
  _type == "inlineImage" => {${imageFields}},
  _type == "imageGallery" => { images[]{${imageFields}} },
`

export const globalSectionsFields = `
    ...,
    _type == "section_projectsFeed" => { showSection, heading, subheading, projects[]->{ ${projectGridFields} } },
    _type == "section_projectsFullBleed" => { showSection, projects[]{ project->{title, slug, backgroundColor, accentColor, agencyBrand->{slug}, thumbnailImageSecondary{${imageFields}} }, media{${imageFields}} } },
    _type == "section_projectsGrid" => { showSection, title, heading, button{...}, projects[]->{title, slug, agencyBrand->{slug}, thumbnailMedia{${imageFields}, ${videoFields}}, client->{..., "logo": logo.asset->url } } },
    _type == "section_blogFeed" => { showSection, heading, showHero, featuredPost->{${blogCardFields}}, featuredCategory->{ ... } },
    _type == "section_contentBlocks" => { ..., contentBlocks[]{ ..., media{..., ${imageFields}, ${videoFields}} } },
    _type == "section_partnersFeed" => { showSection, eyebrow, heading, button },
    _type == "section_imageFullHeight" => { showSection, media{${imageFields}, ${videoFields}} },
    _type == "section_mediaCarousel" => { showSection, heading, slides[]{${imageFields}, ${videoFields}} },
    _type == "section_quote" => { showSection, quote, author, authorInfo, quoteImage{${imageFields}} },
    _type == "section_richContent" => { ..., showSection, richContent[]{..., ${richContentFields}} },
    _type == "section_statsCarousel" => { showSection, heading, subheading, stats[]{number, label, thumbnailImage{${imageFields}} } },
    _type == "section_serviceCards" => { showSection, services[]{ service->{${serviceTypeQuery}}, thumbnailImage{${imageFields}} } },
    _type == "section_serviceFeature" => { showSection, heading, button, featuredService->{ 
      _type == "type_serviceType" => { showSection, ${serviceTypeQuery}},
      _type == "type_serviceGroup" => { showSection, ${serviceGroupQuery}}
      } 
    },
    _type == "section_textVideoPlayer" => { showSection, eyebrow, heading, subheading, text, button, media{${imageFields}, ${videoFields}}, mediaTitle, mediaSubtitle },
    _type == "section_textMedia" => { ..., media{ ..., ${imageFields}, ${videoFields} } },
    _type == "section_textMediaTabs" => { showSection, eyebrow, heading, button, tabs[]{ title, text, media{${imageFields}, ${videoFields}}, insetMedia, button } },
    _type == "section_textLinkCard" => { showSection, heading, stats[]{ number, label }, linkCardHeading, linkCardImage{${imageFields}}, linkCardURL, linkCardColor, linkCardTextColor },
    _type == "section_textClients" => { eyebrow, heading, quote, quoteAuthor, quoteClient->{logoDark{${imageFields}} }, text, button },
    _type == "section_videoPlayer" => { ..., ${videoFields} },
`

export const serviceTypePageQuery = `
  ...,
  excerpt,
  pageSectionsDomaine[]{${globalSectionsFields}},
  pageSectionsStudio[]{${globalSectionsFields}},
  images[]{${imageFields}},
  "serviceGroups": *[_type == "type_serviceGroup" && references(^._id) ]{
      ...,
      serviceType->{slug},
      "services": *[_type == "type_service" && references(^._id)] {
          ...
      } | order(orderRank)
  } | order(orderRank),
  "relatedProjects": *[_type == "type_project" && isHidden != true && ^._id in services[]->serviceGroup->serviceType._ref]{${projectGridFields}}| order(orderRank),
  "relatedBlogPosts": *[_type == "type_blog" && ^._id in services[]->serviceGroup->serviceType._ref]{${blogCardFields}}| order(postDate)
`

export const projectPageFields = `
  title,
  description,
  industry->{...},
  url,
  client->{..., logoDark{${imageBaseFields}}, logoLight{${imageBaseFields}}, isEnterprise },
  foregroundColor,
  backgroundColor,
  accentColor,
  services[]->{..., serviceGroup->{slug, title, serviceType->{slug} } },
  features[]->{...},
  partners[]->{..., title, excerpt, slug, icon{${imageFields}}, tier->{..., createLandingPages}, websiteUrl },
  metrics[]{...},
  awards[]{...},
  agencyBrand->{slug},
  slug{...},
  heroMedia{..., ${videoFields}, ${imageFields}},
  "relatedProjects": *[_type == "type_project" && isHidden != true && agencyBrand->slug.current == ^.agencyBrand->slug.current && references(^.industry._ref) && _id != ^._id]{${projectGridFields}}|order(orderRank)[0...3],
  sections[]{${globalSectionsFields}},
`

export const projectsGridQuery = (brand) => {
  return `*[_type == "type_project" && agencyBrand->name == "${brand}" ] { ${projectGridFields} } | order(orderRank)`
}

export const getProjectCardsByFeature = (feature) => {
  return `*[_type == "type_project" && isHidden != true && references("${feature}") ] { ${projectGridFields} } | order(orderRank)`
}

export const projectPostQuery = (brand) => {
  return `*[_type == "type_project" && agencyBrand->name == "${brand}"] { 
    title,
    slug,
    description,
    backgroundColor,
    foregroundColor,
    url,
    heroImage{${imageFields}},
    heroVideo{asset-> {playbackId,assetId,filename,}},
    heroIsVideo,
    client->{...}, 
    services[]->{..., serviceGroup->{..., serviceType->{...} } }, 
    features[]->{...},
    partners[]->{...},
    metrics,
    awards[],
    industry->{...}, 
    mux{ asset->{playbackId, assetId, filename}},
    metafields,
  }`
}

export const clientQuery = `title, orderRank, logoDark{${imageBaseFields}}, logo`

export const blogQuery = `
  ..., 
  authors[]->{name, role, bio, ${imageFields}, department->{title} },
  thumbnailImage{${imageFields}},
  category->{..., slug{...} }, 
  body[]{${richContentFields}},
  agencyBrand->{slug},
  "relatedPosts": *[_type == "type_blog" && references(^.category->_id)]{${blogCardFields}} | order(orderRank asc),
  "relatedProjects": 
      *[_type == "type_project" 
          && isHidden != true
          && references(^.features[]->_id)
          // || references(^.services[]->_id)
          || references(^.industries[]->_id)
      ]{${projectGridFields}} | order(orderRank asc)[0...4]
`

export const eventQuery = `
  ...,
  dateTime,
  thumbnailImage{${imageFields}}
`

export const locationsQuery = `
  ...,
  locations[]{...}
`