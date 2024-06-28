import {defineField, defineType} from 'sanity'
import { DocumentVideoIcon } from '@sanity/icons' 

export default defineType({
  name: 'section_textMedia',
  title: 'Text + Media',
  type: 'document',
  icon: DocumentVideoIcon,
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
        subtitle: 'Text + Media',
        media: DocumentVideoIcon
      }
    }
  },
})
