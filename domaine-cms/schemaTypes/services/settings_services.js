import {defineField, defineType} from 'sanity'

// DEPRECATED
export default defineType({
  name: 'settings_services',
  title: 'Services Settings',
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
      name: 'redirectPath',
      title: 'Redirect Path',
      type: 'string',
      description: 'e.g /careers'
    }),
  ],

  preview: {
    select: {
      title: 'title', 
    },
  },
})
