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
      type: 'snippet_locale-string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'snippet_locale-string',
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
            type: 'snippet_locale-string',
            validation: Rule => Rule.required(),
          },
          {
            name: 'label',
            title: 'Label',
            type: 'snippet_locale-string',
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
            title: 'number.text',
            subtitle: 'label.text',
            media: 'thumbnailImage.image'
          }
        }
      }],
      validation: Rule => Rule.required().min(4),
    }),
  ],
  preview: {
    select: {
      title: 'heading.text', 
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
