import {defineField, defineType} from 'sanity'
import { iconServices } from '../variables'

export default defineType({
  name: 'section_servicesFeed',
  title: 'Services Feed',
  type: 'document',
  icon: iconServices,
  fields: [
    defineField({
      name: 'showSection',
      title: 'Show Section',
      type: 'boolean',
      initialValue: true
    }),
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
        subtitle: 'Services Feed',
        media: iconServices,
      }
    }
  },
})
