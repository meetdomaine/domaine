import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page_careers',
  title: 'Careers Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
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
      type: 'snippet_SEO-fields',
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      // const {author} = selection
      return {
        ...selection
      }
    },
  },
})
