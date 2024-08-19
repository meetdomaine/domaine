
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
export const partnerTileFields = `title, excerpt, slug, icon{${imageFields}}, tier->{slug, title, createLandingPages}, websiteUrl, orderRank`
export const headerSettingsQuery = `..., brandMenuBrands[]{..., media{${videoFields}, ${imageFields}} }`
export const agencyBrandsQuery = `..., thumbnailMedia{${videoFields}, ${imageFields}}`
export const practicesQuery = `..., thumbnailMedia{${videoFields}, ${imageFields}}`

export const projectGridFields = `
  title,
  excerpt,
  slug, 
  industry->{...},
  agencyBrand->{slug},
  partners[]->{...}, 
  client->{title, logoDark{${imageBaseFields}}, logoLight{${imageBaseFields}}, productImage{${imageBaseFields}}, stage->{ title } },
  logoColor,
  features[]->{ title, slug, _id } | order(orderRank), 
  services[]->{ title, serviceGroup->{title, slug} },
  orderRank,
  thumbnailMedia{${videoFields}, ${imageFields}},
  thumbnailImageSecondary{${imageFields}},
  heroMedia{${videoFields}, ${imageFields}},
  `
export const blogCardFields = `
  title,
  excerpt,
  postDate,
  category->{ title, slug{...} },
  slug{...},
  agencyBrand->{slug},
  thumbnailImage{${imageFields}}
  `


export const globalSectionsFields = `
  sections[]{
    ...,
    _type == "section_projectsFeed" => { heading, subheading, projects[]->{ ${projectGridFields} } },
    _type == "section_projectsFullBleed" => { projects[]{ project->{title, slug, agencyBrand->{slug}, thumbnailImageSecondary{${imageFields}} }, media{${imageFields}} } },
    _type == "section_projectsGrid" => { title, heading, button{...}, projects[]->{title, slug, agencyBrand->{slug}, thumbnailMedia{${imageFields}, ${videoFields}} } },
    _type == "section_blogFeed" => { heading, showHero, featuredPost->{${blogCardFields}}, featuredCategory->{ ... } },
    _type == "section_textMedia" => { ..., media{ ..., ${imageFields}, ${videoFields} } },
    _type == "section_videoPlayer" => { ..., ${videoFields} },
    _type == "section_contentBlocks" => { ..., contentBlocks[]{ ..., media{..., ${imageFields}, ${videoFields}} } },
    _type == "section_partnersFeed" => { eyebrow, heading, button },
    _type == "section_imageFullHeight" => { showSection, media{${imageFields}, ${videoFields}} },
    _type == "section_mediaCarousel" => { showSection, heading, slides[]{${imageFields}, ${videoFields}} },
  }
`

export const projectPageFields = `
  title,
  description,
  industry->{...},
  url,
  client->{..., stage->{...}, logoDark{${imageBaseFields}}, logoLight{${imageBaseFields}} },
  foregroundColor,
  backgroundColor,
  accentColor,
  services[]->{..., serviceGroup->{slug, title, serviceType->{slug} } },
  features[]->{...},
  partners[]->{..., title, excerpt, slug, icon{${imageFields}} },
  metrics[]{...},
  awards[]{...},
  agencyBrand->{slug},
  slug{...},
  heroMedia{..., ${videoFields}, ${imageFields}},
  "relatedProjects": *[_type == "type_project" && references(^.industry._ref) && _id != ^._id]{${projectGridFields}}|order(orderRank)[0...3],
  ${globalSectionsFields}
`





export const projectsGridQuery = (brand) => {
  return `*[_type == "type_project" && agencyBrand->name == "${brand}" ] { ${projectGridFields} } | order(orderRank)`
}

export const getProjectCardsByFeature = (feature) => {
  return `*[_type == "type_project" && references("${feature}") ] { ${projectGridFields} } | order(orderRank)`
}

// export const projectsGridQuery = (brand) => {
//   return `*[_type == "type_project" && agencyBrand->name == "${brand}" ] { 
//     title,
//     excerpt,
//     slug, 
//     industry->{...}, 
//     partners[]->{...}, 
//     features[]->{ title, slug }, 
//     services[]->{ serviceGroup->{title, slug} }, 
//     thumbnailImage{${imageFields}},
//     thumbnailVideo{asset-> {playbackId,assetId,filename,}},
//     orderRank,
//     thumbnailIsVideo,
//   } | order(orderRank)`
// }

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

