
import { sanityClient } from "sanity:client"
import imageUrlBuilder from '@sanity/image-url'
import SanityPicture, {  setSanityPictureDefaults} from "astro-sanity-picture";



export const urlBuilder = imageUrlBuilder(sanityClient)
setSanityPictureDefaults({ imageUrlBuilder: urlBuilder })

export function urlFor(source) {
  return urlBuilder.image(source)
}

export const imageBaseFields = `crop, asset->{_id, metadata}`
export const imageFields = `image{${imageBaseFields}, alt }`
export const videoFields = 'video{ asset->{playbackId, assetId, filename} }'



export const projectGridFields = `
  title,
  excerpt,
  slug, 
  industry->{...}, 
  partners[]->{...}, 
  client->{title, logoDark{${imageBaseFields}}, logoLight{${imageBaseFields}}, productImage{${imageBaseFields}} },
  logoColor,
  features[]->{ title, slug, _id }, 
  services[]->{ serviceGroup->{title, slug} },
  orderRank,
  thumbnailMedia{${videoFields}, ${imageFields}},
  heroMedia{${videoFields}, ${imageFields}},
  `

export const projectPageFields = `
  title,
  description,
  industry->{...},
  url,
  client->{...},
  services->{...},
  features->{...},
  partners->{...},
  metrics{...},
  awards{...},
  slug{...},
  category->{..., slug{...} }, 
  authors[]->{...},
  heroMedia{..., ${videoFields}, ${imageFields}},
`

export const blogCardFields = `
    title,
    excerpt,
    category->{ title, slug{...} },
    slug{...},
    thumbnailImage{${imageFields}}`


export const globalSectionsFields = `
  sections[]{
    ...,
    _type == "section_projectsFeed" => { ..., heading, subheading, projects[]->{ ${projectGridFields} } },
    _type == "section_textMedia" => { ..., media{ ..., ${imageFields}, ${videoFields} } },
    _type == "section_videoPlayer" => { ..., ${videoFields} },
    _type == "section_contentBlocks" => { ..., contentBlocks[]{ ..., media{..., ${imageFields}, ${videoFields}} } },
  }
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

