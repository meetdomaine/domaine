import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings_partners',
  title: 'Partners Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.text',
        maxLength: 96,
      },
    }),
  ],

  preview: {
    select: {
      title: 'title.text', 
    },
  },
})
