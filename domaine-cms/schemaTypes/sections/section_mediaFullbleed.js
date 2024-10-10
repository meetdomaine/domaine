
import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

import { media } from 'sanity-plugin-media'

export default defineType({
  name: 'section_mediaFullbleed',
  title: 'Media Fullbleed',
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
      name: 'media',
      title: 'Media',
      type: 'snippet_video',
    }),
  ],
  preview: {
    prepare(selection) {
      return {
        title: 'Media Fullbleed',
        media: ImagesIcon,
      }
    }
  },
})
