import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page_contact-studio',
  title: 'Contact Studio',
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
  ],

  preview: {
    select: {
      title: 'title', 
    },
  },
})
