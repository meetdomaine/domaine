import { defineCollection } from "astro:content";
import { sanityClient } from "sanity:client";
import { agencyBrandsQuery, blogCardFields, imageBaseFields, imageFields, projectGridFields, richContentFields } from "./lib/cms-queries";
import { Brands } from "./enums/brands";
import { Locales } from "./enums/locales";

/**
 In Astro, Content Collections are fetched at build time. We use them to fetch data that needs to be used across multiple pages.
 To refresh content, the site needs to be rebuilt.
 */

const getHeaderSettings = async (brand) => {
  const headerId = brand === Brands.STUDIO ? 'settings_header--studio' : 'settings_header--domaine'
  const content = await sanityClient.fetch(`*[_type == "settings_header" && _id == '${headerId}'][0]{
    ...,
    locationClocks[]->{
      ...,
      agencyBrand->{slug},
      images[]{${imageFields}},
      metafields{ title, description, image{crop, asset->{_id, metadata}, hotspot} },
    },
    linkCardImage{${imageFields}},
    brandMenuBrands[]{
        ..., 
        media{video{ asset->{playbackId, assetId, filename} }, ${imageFields}} 
    }
  }`)
  return content
}

const getFooterSettings = async (brand) => {
  const footerId = brand === Brands.STUDIO ? 'settings_footer--studio' : 'settings_footer--domaine'
  const content = await sanityClient.fetch(`*[_type == "settings_footer" && _id == '${footerId}'][0]{
    ...,
  }`)
  return content
}

const getBrandSettings = async (brand) => {
  const content = await sanityClient.fetch(`*[_type == "type_agencyBrand" && name == '${brand}' ][0]{
    ..., 
    cookieNoticeText{ 
      translations{ 
        ${Object.keys(Locales).filter(locale => Locales[locale] !== "en").map((locale) => (
          `"${Locales[locale]}": ${Locales[locale]}[]{ ..., children[]{${richContentFields}} }`
        )
      ).join()}
      },
      "richContent": richContent[]{ ..., children[]{${richContentFields}}}
    },
    metafields{ title, description, image{${imageBaseFields}} },
  }`)
  return content
}

const globalSettingsDomaine = defineCollection({
  loader: async () => {
    const [ headerSettings, footerSettings, brandSettings ] = await Promise.all([
      getHeaderSettings(Brands.DOMAINE),
      getFooterSettings(Brands.DOMAINE),
      getBrandSettings(Brands.DOMAINE)
    ])
    return [
      {
        id: 'headerSettings',
        ...headerSettings
      }, {
        id: 'footerSettings',
        ...footerSettings
      }, {
        id: 'brandSettings',
        ...brandSettings
      }
    ];
  }
});

const globalSettingsStudio = defineCollection({
  loader: async () => {
    const [ headerSettings, footerSettings, brandSettings ] = await Promise.all([
      getHeaderSettings(Brands.STUDIO),
      getFooterSettings(Brands.STUDIO),
      getBrandSettings(Brands.STUDIO)
    ])
    return [
      {
        id: 'headerSettings',
        ...headerSettings
      }, {
        id: 'footerSettings',
        ...footerSettings
      }, {
        id: 'brandSettings',
        ...brandSettings
      }
    ];
  }
});

const agencyBrands = defineCollection({
  loader: async () => {
    const content = await sanityClient.fetch(`*[_type == "type_agencyBrand"]{ ${agencyBrandsQuery} }`)
    return content.map(brand => ({
      id: brand.slug.current,
      ...brand
    }))
  }
});

const preloaderSettings = defineCollection({
  loader: async () => {
    const settingsDomaine = await sanityClient.fetch(`*[_type == "settings_preloader" && _id == "settings_preloader-domaine"][0]{..., heading, images[]{${imageFields}} }`)
    const settingsStudio = await sanityClient.fetch(`*[_type == "settings_preloader" && _id == "settings_preloader-studio"][0]{..., heading, images[]{${imageFields}} }`)
    return [
      {
        id: 'preloaderSettings-domaine',
        ...settingsDomaine
      },
      {
        id: 'preloaderSettings-studio',
        ...settingsStudio
      }
    ]
  }
});

const projectCards = defineCollection({
  loader: async () => {
    const content = await sanityClient.fetch(`*[_type == "type_project" && isHidden != true && agencyBrand != null && client != null]{${projectGridFields}} | order(orderRank)`)
    return content.map(project => ({
      id: project.slug.current,
      ...project
    }))
  }
})

const blogCards = defineCollection({
  loader: async () => {
    const content = await sanityClient.fetch(`*[_type == "type_blog" && isHidden != true && agencyBrand != null]{${blogCardFields}} | order(postDate desc)`)
    return content.map(blog => ({
      id: blog.slug.current,
      ...blog
    }))
  }
})

export const collections = { globalSettingsDomaine, globalSettingsStudio, agencyBrands, preloaderSettings, projectCards, blogCards };