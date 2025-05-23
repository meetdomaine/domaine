
import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

import { media } from 'sanity-plugin-media'

export default defineType({
  name: 'section_mediaCarousel',
  title: 'Media Carousel',
  type: 'document',
  icon: ImagesIcon,
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
    }),
    defineField({
        name: 'slides',
        title: 'Slides',
        type: 'array',
        of: [{
            name: 'media',
            title: 'Media',
            type: 'snippet_video',
        }],
        validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'carouselSize',
      title: 'Carousel Size',
      type: 'string',
      description: 'Project page foreground color.',
      options: {
        list: [
          { title: "Large", value: "large" },
          { title: "Small", value: "small" },
        ],
        layout: 'radio'
      },
      initialValue: "small",
    }),
  ],
  preview: {
    prepare(selection) {
      return {
        title: 'Media Carousel',
        media: ImagesIcon,
      }
    }
  },
})
