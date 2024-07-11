
import { sanityClient } from "sanity:client"
import imageUrlBuilder from '@sanity/image-url'
import SanityPicture, {  setSanityPictureDefaults} from "astro-sanity-picture";



export const urlBuilder = imageUrlBuilder(sanityClient)
setSanityPictureDefaults({ imageUrlBuilder: urlBuilder })

export function urlFor(source) {
  return urlBuilder.image(source)
}

export const imageFields = 'image{ crop, asset->{_id, metadata}, alt }'



export const projectGridFields = `
    title,
    excerpt,
    slug, 
    industry->{...}, 
    partners[]->{...}, 
    features[]->{ title, slug, _id }, 
    services[]->{ serviceGroup->{title, slug} }, 
    thumbnailImage{${imageFields}},
    thumbnailVideo{asset-> {playbackId,assetId,filename,}},
    orderRank,
    thumbnailIsVideo`


export const globalSectionsFields = `
  sections[]{
    ...,
    _type == "section_projectsFeed" => { ..., heading, subheading, projects[]->{ ${projectGridFields} } }
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

