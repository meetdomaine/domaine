import {defineField, defineType} from 'sanity'
import { iconBlog } from '../variables'

export default defineType({
  name: 'section_blogFeed',
  title: 'Blog Feed',
  type: 'document',
  icon: iconBlog,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'heading', 
    },
    prepare(selection) {
      return {
        ...selection,
        subtitle: 'Blog Feed',
        media: iconBlog
      }
    }
  },
})
