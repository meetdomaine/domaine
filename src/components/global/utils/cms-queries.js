
import { sanityClient } from "sanity:client"
import imageUrlBuilder from '@sanity/image-url'
import SanityPicture, {  setSanityPictureDefaults} from "astro-sanity-picture";



export const urlBuilder = imageUrlBuilder(sanityClient)
setSanityPictureDefaults({ imageUrlBuilder: urlBuilder })

export function urlFor(source) {
  return urlBuilder.image(source)
}

export const imageFields = 'image{ crop, asset->{_id, metadata}, alt }'

export const projectsGridQuery = (brand, industry) => {
  return `*[_type == "type_project" && agencyBrand->name == "${brand}" ${industry ? `&& industry._ref == '${industry}'` : ''} ] {..., industry->{...}, partners[]->{...}, services[]->{ serviceGroup->{slug} }, thumbnailImage{${imageFields}}} | order( orderRank )`
}

export const projectPostQuery = (brand) => {
  return `*[_type == "type_project" && agencyBrand->name == "${brand}"] { ..., heroImage{${imageFields}}, client->{...}, services[]->{..., serviceGroup->{..., serviceType->{...} } }, industry->{...}, mux{ asset->{playbackId, assetId, filename}} }`
}