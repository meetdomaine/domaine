import {defineField, defineType} from 'sanity'
import { iconServiceTypes } from '../variables'
import { orderRankField } from '@sanity/orderable-document-list'

export default defineType({
  name: 'type_serviceType',
  title: 'Service Type',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'agencyBrands',
      title: 'Agency Brands',
      type: 'array',
      of: [{
        name: 'agencyBrand',
        title: 'Brand',
        type: 'reference',
        to: [{ type: 'type_agencyBrand'}]
      }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'metafields',
      title: 'Metafields',
      type: 'snippet_SEO-fields',
    }),
    orderRankField({ type: 'type_serviceType'}),
  ],

  preview: {
    select: {
      title: 'title',
      brands: 'agencyBrands'
    },
    prepare(selection) {
      return {
        ...selection,
        media: iconServiceTypes,
        subtitle: 'Service'
      }
    }
  },
})
