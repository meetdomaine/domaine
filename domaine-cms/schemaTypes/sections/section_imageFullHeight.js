import {defineField, defineType} from 'sanity'
import { DesktopIcon } from '@sanity/icons'

export default defineType({
  name: 'section_imageFullHeight',
  title: 'Image Full Height',
  type: 'document',
  icon: DesktopIcon,
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
      const { title, blockTitle1, blockTitle2, blockTitle3 } = selection
      return {
        title: 'Image Full-Height',
        media: DesktopIcon
      }
    }
  },
})
