import {defineField, defineType} from 'sanity'
import { iconServices } from '../variables'
import { orderRankField } from '@sanity/orderable-document-list'

export default defineType({
  name: 'type_service',
  title: 'Service',
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      // validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'serviceGroup',
      title: 'Service Group',
      type: 'reference',
      to: [{ type: 'type_serviceGroup' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'agencyBrands',
      title: 'Agency Brands',
      type: 'array',
      of: [{
        name: 'agencyBrand',
        title: 'Agency Brand',
        type: 'reference',
        to: [{ type: 'type_agencyBrand'}]
      }],
      validation: Rule => Rule.required(),
    }),
    orderRankField({ type: 'type_service'}),
  ],

  preview: {
    select: {
      title: 'title',
      group: 'serviceGroup.title'
    },
    prepare(selection) {
      return {
        ...selection,
        subtitle: selection.group,
        media: iconServices,
      }
    }
  },
})
