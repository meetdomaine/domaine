import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page_projects-index',
  title: 'Projects Index',
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
    prepare(selection) {
      // const {author} = selection
      return {...selection}
    },
  },
})
