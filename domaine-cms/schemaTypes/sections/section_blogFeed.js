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
    }),
  ],
  preview: {
    select: {
      title: 'title', 
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
