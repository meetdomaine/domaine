import {defineField, defineType} from 'sanity'
import { iconPractices } from '../variables'

export default defineType({
  name: 'section_practicesFeed',
  title: 'Practices Feed',
  type: 'document',
  icon: iconPractices,
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
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'snippet_locale-string',
      validation: Rule => Rule.required()
    }),
  ],
  preview: {
    select: {
      title: 'title.text',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title,
        subtitle: 'Practices Feed',
        media: iconPractices,
      }
    }
  },
})
