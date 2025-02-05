// ./src/sanity/lib/resolve.ts

import { defineDocuments, defineLocations } from "sanity/presentation";
import type { PresentationPluginOptions } from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  mainDocuments: defineDocuments([
    {
      route: '/',
      type: 'page_home-domaine',
    },
    {
      route: '/studio',
      type: 'page_home-studio',
    },
  ]),
  // locations: {
  //   // Add more locations for other post types
  //   type_blog: defineLocations({
  //     select: {
  //       title: "title",
  //       slug: "slug.current",
  //       category: "category->slug.current",
  //     },
  //     resolve: (doc) => ({
  //       locations: [
  //         {
  //           title: doc?.title || "Untitled",
  //           href: `/insights/${doc?.category}/${doc?.slug}`,
  //         },
  //       ],
  //     }),
  //   }),
  //   page_home-domaine: defineLocations({
  //     select: {
  //       title: "title",
  //       slug: "slug.current",
  //       category: "category->slug.current",
  //     },
  //     resolve: (doc) => ({
  //       locations: [
  //         {
  //           title: doc?.title || "Untitled",
  //           href: `/insights/${doc?.category}/${doc?.slug}`,
  //         },
  //       ],
  //     }),
  //   }),
  // },
};