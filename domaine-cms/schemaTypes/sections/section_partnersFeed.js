import {defineField, defineType} from 'sanity'
import { iconPartners } from '../variables'

export default defineType({
  name: 'section_partnersFeed',
  title: 'Partners Feed',
  type: 'document',
  icon: iconPartners,
  fields: [
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
        subheading: 'Partners Feed',
        media: iconPartners,
      }
    }
  },
})
