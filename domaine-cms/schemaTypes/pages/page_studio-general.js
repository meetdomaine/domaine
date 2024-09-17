import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page_studio-general',
  title: 'Studio Pages',
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
      name: 'globalSections',
      title: 'Sections',
      type: 'section_globalSections',
    }),
    defineField({
      name: 'metafields',
      title: 'Metafields',
      type: 'snippet_SEO-fields',
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      // const {author} = selection
      return {...selection}
    },
  },
})
