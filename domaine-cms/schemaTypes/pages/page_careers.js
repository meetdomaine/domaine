import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page_careers',
  title: 'Careers Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'section_globalSections',
    }),
    defineField({
      name: 'showPreloader',
      title: 'Show Preloader',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'metafields',
      title: 'Metafields',
      type: 'snippet_locale-SEO-fields',
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
      title: 'title.text',
    },
    prepare(selection) {
      // const {author} = selection
      return {
        ...selection
      }
    },
  },
})
