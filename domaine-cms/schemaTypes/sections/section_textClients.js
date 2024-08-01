import {defineField, defineType} from 'sanity'
import { CaseIcon } from '@sanity/icons' 

export default defineType({
  name: 'section_textClients',
  title: 'Text + Clients',
  type: 'document',
  icon: CaseIcon,
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
  ],
  preview: {
    select: {
      title: 'heading', 
    },
    prepare(selection) {
      return {
        ...selection,
        subtitle: 'Text + Clients',
        media: CaseIcon
      }
    }
  },
})
