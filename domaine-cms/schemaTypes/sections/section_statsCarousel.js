import {defineField, defineType} from 'sanity'
import {ChartUpwardIcon} from '@sanity/icons'

import { media } from 'sanity-plugin-media'

export default defineType({
  name: 'section_statsCarousel',
  title: 'Stats Carousel',
  type: 'document',
  icon: ChartUpwardIcon,
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
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{
        name: 'stat',
        type: 'object',
        fields: [
          {
            name: 'number',
            title: 'Number',
            type: 'string',
            validation: Rule => Rule.required(),
          },
          {
            name: 'label',
            title: 'Label',
            type: 'string',
            validation: Rule => Rule.required(),
          },
          {
            name: 'thumbnailImage',
            title: 'Thumbnail Image',
            type: 'snippet_image',
            validation: Rule => Rule.required(),
          }
        ],
        validation: Rule => Rule.required(),
        preview: {
          select: {
            title: 'number',
            subtitle: 'label',
            media: 'thumbnailImage.image'
          }
        }
      }],
      validation: Rule => Rule.required().min(4),
    }),
  ],
  preview: {
    select: {
      title: 'heading', 
    },
    prepare(selection) {
      return {
        ...selection,
        subtitle: 'Stats Carousel',
        media: ChartUpwardIcon
      }
    }
  },
})
