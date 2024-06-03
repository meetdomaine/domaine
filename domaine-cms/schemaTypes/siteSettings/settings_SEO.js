import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings_SEO',
  title: 'SEO Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'metafields',
      title: 'Metafields',
      type: 'snippet_SEO-fields',
      description: 'Default site SEO fields.'
    }),
  ],

  preview: {
    select: {
      title: 'title', 
    },
  },
})
