
import { sanityClient } from "sanity:client"
import imageUrlBuilder from '@sanity/image-url'
import SanityPicture, {  setSanityPictureDefaults} from "astro-sanity-picture";



export const urlBuilder = imageUrlBuilder(sanityClient)
setSanityPictureDefaults({ imageUrlBuilder: urlBuilder })

export function urlFor(source) {
  return urlBuilder.image(source)
}

export const imageFields = 'image{ crop, asset->{_id, metadata}, alt }'

export const projectsGridQuery = (brand) => {
  return `*[_type == "type_project" && agencyBrand->name == "${brand}" ] { 
    title,
    excerpt,
    slug, 
    industry->{...}, 
    partners[]->{...}, 
    features[]->{ title, slug }, 
    services[]->{ serviceGroup->{title, slug} }, 
    thumbnailImage{${imageFields}},
    orderRank,
  } | order(orderRank)`
}

export const projectPostQuery = (brand) => {
  return `*[_type == "type_project" && agencyBrand->name == "${brand}"] { 
    title,
    slug,
    description,
    url,
    heroImage{${imageFields}},
    heroVideo,
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

