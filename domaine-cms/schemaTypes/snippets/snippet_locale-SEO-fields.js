import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'snippet_locale-SEO-fields',
  title: 'SEO Fields',
  type: 'document',
  fields: [
    defineField({
        name: 'title',
        title: 'SEO Title',
        type: 'snippet_locale-string',
        description: 'Optional override of SEO page title.'
      }),
    defineField({
        name: 'description',
        title: 'SEO Description',
        type: 'snippet_locale-text',
        description: 'Optional override of SEO page description.'
    }),
    defineField({
      name: 'image',
      title: 'SEO Image',
      type: 'image',
      description: 'Optional override of SEO page image.'
    }),
  ],

  preview: {
    select: {
      title: 'title.text', 
    },
  },
})
