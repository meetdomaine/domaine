import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'type_partnerTier',
  title: 'Partner Tier',
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
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'createLandingPages',
      title: 'Create Landing Pages',
      type: 'boolean',
    }),
  ],

  preview: {
    select: {
      title: 'title', 
    },
  },
})
