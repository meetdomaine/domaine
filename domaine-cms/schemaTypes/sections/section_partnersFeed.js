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
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'snippet_locale-string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'snippet_locale-button',
    }),
    defineField({
      name: 'linkText',
      title: 'Link Text',
      description: 'Used for "View All Partners" button.',
      type: 'snippet_locale-string',
    }),
  ],
  preview: {
    select: {
      title: 'heading.text', 
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
