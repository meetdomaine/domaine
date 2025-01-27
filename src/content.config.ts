import { defineCollection, z } from "astro:content";
import { sanityLoader } from "./content/sanity-loader";
import { sanityQueryHomepage, sanityQueryPages } from "./content/queries/pages-query";

const homepage = defineCollection({
  loader: sanityLoader({ query: `*[_type == 'page_home-domaine']{ ${sanityQueryHomepage} }` }),
})

const pages = defineCollection({
  loader: sanityLoader({ query: `*[_type == 'page_general']{ ${sanityQueryPages} }` }),
})

const pagesStudio = defineCollection({
  loader: sanityLoader({ query: `*[_type == 'page_studio-general']{ ${sanityQueryPages} }` }),
})

export const collections = {
  homepage,
  pages,
  pagesStudio
}