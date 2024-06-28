import {defineField, defineType} from 'sanity'
import { iconProjects } from '../variables'

export default defineType({
  name: 'section_projectsFeed',
  title: 'Projects Feed',
  type: 'document',
  icon: iconProjects,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
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
        subheading: 'Projects Feed',
        media: iconProjects,
      }
    }
  },
})
