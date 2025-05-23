import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page_contact-domaine',
  title: 'Contact Domaine',
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
    defineField({
      name: 'metafields',
      title: 'Metafields',
      type: 'snippet_locale-SEO-fields',
    }),
  ],

  preview: {
    select: {
      title: 'title', 
    },
  },
})
