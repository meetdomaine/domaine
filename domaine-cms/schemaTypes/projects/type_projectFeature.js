import {defineField, defineType} from 'sanity'
import { iconClients, iconProjectFeatures } from '../variables'
import { orderRankField } from '@sanity/orderable-document-list'

export default defineType({
  name: 'type_projectFeature',
  title: 'Project Feature',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'snippet_locale-string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.text',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'metafields',
      title: 'Metafields',
      type: 'snippet_locale-SEO-fields',
    }),
    orderRankField({ type: 'type_projectFeature'})
    // defineField({
    //   name: 'agencyBrands',
    //   title: 'Agency Brands',
    //   type: 'array',
    //   of: [
    //     {
    //       name: 'agencyBrand',
    //       title: 'Agency Brand',
    //       type: 'reference',
    //       to: [{ type: 'type_agencyBrand'}]
    //     }
    //   ]
    // }),
    // defineField({
    //   name: 'description',
    //   title: 'Description',
    //   type: 'text',
    // }),
  ],

  preview: {
    select: {
      title: 'title.text', 
    },
    prepare(selection) {
      return {
        ...selection,
        media: iconProjectFeatures
      }
    }
  },
})
