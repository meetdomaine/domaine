import {defineField, defineType} from 'sanity'
import { media } from 'sanity-plugin-media'

export default defineType({
  name: 'type_agencyBrand',
  title: 'Agency Brand',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Resolution: 64x64px.',
      validation: Rule => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'favicon'
    },
  },
})
