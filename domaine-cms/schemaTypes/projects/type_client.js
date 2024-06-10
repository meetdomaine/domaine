import {defineField, defineType} from 'sanity'
import { iconClients } from '../variables'

export default defineType({
  name: 'type_client',
  title: 'Client',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'agencyBrands',
      title: 'Agency Brands',
      type: 'array',
      of: [
        {
          name: 'agencyBrand',
          title: 'Agency Brand',
          type: 'reference',
          to: [{ type: 'type_agencyBrand'}]
        }
      ]
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],

  preview: {
    select: {
      title: 'title', 
    },
    prepare(selection) {
      return {
        ...selection,
        media: iconClients
      }
    }
  },
})
