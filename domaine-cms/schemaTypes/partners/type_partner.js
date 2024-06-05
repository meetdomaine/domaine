import {defineField, defineType} from 'sanity'
import { iconPartners } from '../variables'

export default defineType({
  name: 'type_partner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'tier',
      title: 'Tier',
      type: 'reference',
      to: [{type: 'type_partnerTier'}]
    }),
  ],

  preview: {
    select: {
      title: 'title', 
      subtitle: 'tier.title'
    },
    prepare(selection) {
      return {
        ...selection,
        media: iconPartners
      }
    }
  },
})
