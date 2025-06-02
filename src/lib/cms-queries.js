
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

export const agencyBrandsQuery = `..., "logo": logo.asset->url, thumbnailMedia{${videoFields}, ${imageFields}}`
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
`

export const projectGridFields = `
  title,
  excerpt,
  slug, 
  industry->{..., _id },
  agencyBrand->{slug},
  partners[]->{..., _id}, 
  client->{title, logoDark{${imageFields}}, logoLight{${imageFields}}, "logo": logo.asset->url, logoScale, productImage{${imageBaseFields}}, isEnterprise },
  logoColor,
  features[]->{ title, slug, _id } | order(orderRank), 
  services[]->{ _id, title, serviceGroup->{ _id, title, slug} },
  thumbnailMedia{${videoFields}, ${imageFields}},
  thumbnailImageSecondary{${imageFields}},
  heroMedia{${videoFields}, ${imageFields}},
  isHidden,
  orderRank,
`

export const serviceQuery = `
  ...,
  isHidden,
  excerpt,
  description,
  agencyBrands[]->{..., slug, name},
  serviceGroup->{
      ..., 
      serviceType->{...},
      _id
  },
  metafields{ title, description, image{${imageBaseFields}} },
`

export const serviceGroupQuery = `
  ..., 
  isHidden,
  excerpt,
  description,
  images[]{${imageFields}},
  agencyBrands[]->{..., slug, name},
  serviceType->{..., formHeading, formText, hubspotFormId },
  "services": *[_type == "type_service" && references(^._id)]{..., ${serviceQuery} } | order(orderRank),
  metafields{ title, description, image{${imageBaseFields}} },
`

export const serviceTypeQuery = `
  ...,
  isHidden,
  excerpt,
  images[]{${imageFields}},
  agencyBrands[]->{..., slug, name},
  "serviceGroups": *[_type == "type_serviceGroup" && references(^._id) ]{
      ...,
      serviceType->{slug},
      agencyBrands[]->{..., slug, name},
      "services": *[_type == "type_service" && references(^._id)] {${serviceQuery}} | order(orderRank)
  } | order(orderRank),
`

export const richContentFields = `
  ...,
  _type == "inlineImage" => {${imageFields}},
  _type == "imageGallery" => { images[]{${imageFields}} },
`

export const globalSectionsFields = `
    ...,
    _type == "section_agenda" => { ... },
    _type == "section_projectsFeed" => { showSection, heading, subheading, projects[]->{ ${projectGridFields} } },
    _type == "section_projectsFullBleed" => { showSection, projects[]{ project->{title, slug, backgroundColor, accentColor, agencyBrand->{slug}, thumbnailImageSecondary{${imageFields}} }, media{${imageFields}} } },
    _type == "section_projectsGrid" => { showSection, title, heading, button{...}, projects[]->{title, slug, backgroundColor, accentColor, foregroundColor, agencyBrand->{slug}, thumbnailMedia{${imageFields}, ${videoFields}}, client->{..., "logo": logo.asset->url } } },
    _type == "section_blogFeed" => { showSection, heading, showHero, featuredPost->{${blogCardFields}}, featuredCategory->{ ... } },
    _type == "section_contentBlocks" => { ..., contentBlocks[]{ ..., media{..., ${imageFields}, ${videoFields}} } },
    _type == "section_partnersFeed" => { showSection, eyebrow, heading, button },
    _type == "section_imageFullHeight" => { showSection, media{${imageFields}, ${videoFields}} },
    _type == "section_mediaCarousel" => { showSection, heading, slides[]{${imageFields}, ${videoFields}} },
    _type == "section_mediaFullbleed" => { showSection, media{${imageFields}, ${videoFields}} },
    _type == "section_quote" => { showSection, quote, author, authorInfo, quoteImage{${imageFields}} },
    _type == "section_richContent" => { ..., showSection, richContent[]{..., ${richContentFields}}, content{..., richContent[]{${richContentFields}}, translations[]{${richContentFields}} } },
    _type == "section_statsCarousel" => { showSection, heading, subheading, stats[]{number, label, thumbnailImage{${imageFields}} } },
    _type == "section_serviceCards" => { showSection, services[]{ service->{${serviceTypeQuery}}, thumbnailImage{${imageFields}}, showButton, buttonText, enableServiceLinks } },
    _type == "section_serviceFeature" => { showSection, heading, headingSize, subheading, button, featuredService->{ 
      _type == "type_serviceType" => { showSection, ${serviceTypeQuery}},
      _type == "type_serviceGroup" => { showSection, ${serviceGroupQuery}}
      } 
    },
    _type == "section_textVideoPlayer" => { showSection, eyebrow, heading, subheading, text, button, media{${imageFields}, ${videoFields}}, mediaTitle, mediaSubtitle },
    _type == "section_textMedia" => { ..., media{${imageFields}, ${videoFields} } },
    _type == "section_textMediaBlocks" => { showSection, eyebrow, heading, button, columnCount, blocks[]{ media{${imageFields}, ${videoFields}}, heading, subheading } },
    _type == "section_textMediaTabs" => { showSection, eyebrow, heading, button, tabs[]{ title, subtitle, media{${imageFields}, ${videoFields}}, insetMedia, button } },
    _type == "section_textLinkCard" => { showSection, heading, subheading, stats[]{ number, label }, linkCardHeading, linkCardImage{${imageFields}}, linkCardURL, linkCardColor, linkCardTextColor, orientation, imageWidth },
    _type == "section_textClients" => { eyebrow, heading, quote, quoteAuthor, clients[]->{ title, slug, "logo": logo.asset->url, logoScale }, quoteClient->{"logo": logo.asset->url, logoScale}, text, button },
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
  } | order(orderRank)
`


export const projectPageFields = `
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
  agencyBrand->{slug},
  thumbnailMedia{${videoFields}, ${imageFields}},
  thumbnailImageSecondary{${imageFields}},
  slug{...},
  heroMedia{..., ${videoFields}, ${imageFields}},
  sections[]{${globalSectionsFields}},
  metafields{ title, description, image{${imageBaseFields}} },
  orderRank,
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
  _id,
  authors[]->{name, role, bio, image{${imageFields}}, department->{title} },
  postDate,
  thumbnailImage{${imageFields}},
  category->{..., slug{...} }, 
  body[]{${richContentFields}},
  agencyBrand->{slug},
  globalSections{ sections[]{${globalSectionsFields}} }
`

export const eventQuery = `
  ...,
  dateTime,
  partnerLogos[]{${imageFields}},
  speakers[]{..., speakerImage{${imageFields}}, speakerLogo{${imageFields}} },
  thumbnailImage{${imageFields}},
  globalSections{ sections[]{${globalSectionsFields}}},
  thumbnailImage{${imageFields}},
`

export const locationsQuery = `
  city,
  stateProvince,
  country,
  timezone,
  text,
  button,
  orderRank
`