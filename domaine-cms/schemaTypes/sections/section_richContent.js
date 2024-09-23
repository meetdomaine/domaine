import {defineField, defineType} from 'sanity'
import {ComposeIcon} from '@sanity/icons'

export default defineType({
  name: 'section_richContent',
  title: 'Rich Content',
  type: 'document',
  icon: ComposeIcon,
  fields: [
    defineField({
      name: 'showSection',
      title: 'Show Section',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'richContent',
      title: 'Content',
      type: 'snippet_rich-content',
      validation: Rule => Rule.required()
    }),
  ],
  preview: {
    prepare(selection) {
      return {
        title: 'Rich Content',
        media: ComposeIcon,
      }
    }
  },
})
