import {defineField, defineType} from 'sanity'
import { TextIcon } from '@sanity/icons' 

export default defineType({
  name: 'section_textColumns',
  title: 'Text Columns',
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
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'snippet_locale-text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: "Small", value: "small" },
          { title: "Large", value: "large" },
        ],
        layout: 'radio'
      },
      initialValue: "small",
    }),
  ],
  preview: {
    select: {
      title: 'title.text', 
    },
    prepare(selection) {
      return {
        ...selection,
        subtitle: 'Text Columns',
        media: TextIcon
      }
    }
  },
})
