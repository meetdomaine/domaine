import imageUrlBuilder from '@sanity/image-url'
import SanityPicture, {  setSanityPictureDefaults} from "astro-sanity-picture";

export const urlBuilder = imageUrlBuilder(sanityClient)
setSanityPictureDefaults({ imageUrlBuilder: urlBuilder })

export function urlFor(source) {
  return urlBuilder.image(source)
}