import {defineField, defineType} from 'sanity'
import { TextIcon } from '@sanity/icons' 

export default defineType({
  name: 'section_textHeading',
  title: 'Text Heading',
  type: 'document',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'showSection',
      title: 'Show Section',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'count',
      title: 'Count',
      type: 'number',
      description: 'Optional number to show alongside title. Usually not needed.'
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'largeHeading',
      title: 'Large Heading',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title', 
    },
    prepare(selection) {
      return {
        ...selection,
        subtitle: 'Text Heading',
        media: TextIcon
      }
    }
  },
})
