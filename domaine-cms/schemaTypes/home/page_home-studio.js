import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page_home-studio',
  title: 'Studio Home',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'globalSections',
      title: 'Global Sections',
      type: 'section_globalSections',
    }),
  ],

  preview: {
    select: {
      title: 'title', 
    },
  },
})
