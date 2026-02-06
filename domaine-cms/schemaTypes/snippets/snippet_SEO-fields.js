import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'snippet_SEO-fields',
  title: 'SEO Fields',
  type: 'document',
  fields: [
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      description: 'Prevent bots from indexing the page.',
      defaultValue: false,
    }),
    defineField({
        name: 'title',
        title: 'SEO Title',
        type: 'string',
        description: 'Optional override of SEO page title.'
      }),
    defineField({
        name: 'description',
        title: 'SEO Description',
        type: 'text',
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
      title: 'title', 
    },
  },
})
