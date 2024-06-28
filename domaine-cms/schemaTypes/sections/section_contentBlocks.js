import {defineField, defineType} from 'sanity'
import { ProjectsIcon } from '@sanity/icons' 

export default defineType({
  name: 'section_contentBlocks',
  title: 'Content Blocks',
  type: 'document',
  icon: ProjectsIcon,
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
        subtitle: 'Content Blocks',
        media: ProjectsIcon
      }
    }
  },
})
