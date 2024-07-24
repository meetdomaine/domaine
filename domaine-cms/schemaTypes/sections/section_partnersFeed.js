import {defineField, defineType} from 'sanity'
import { iconPartners } from '../variables'

export default defineType({
  name: 'section_partnersFeed',
  title: 'Partners Feed',
  type: 'document',
  icon: iconPartners,
  fields: [
    defineField({
      name: 'showSection',
      title: 'Show Section',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'snippet_button',
    }),
  ],
  preview: {
    select: {
      title: 'heading', 
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title,
        subtitle: 'Partners Feed',
        media: iconPartners,
      }
    }
  },
})
