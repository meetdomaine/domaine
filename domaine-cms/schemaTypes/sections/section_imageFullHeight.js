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
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'colorScheme',
      title: 'Color Scheme',
      type: 'string',
      options: {
        list: [
          { 
            value: 'default',
            title: 'Default'
          },
          // { 
          //   value: 'secondary',
          //   title: 'Secondary'
          // },
          { 
            value: 'invert',
            title: 'Inverted'
          },
          // { 
          //   value: 'brand',
          //   title: 'Brand'
          // }
        ],
        layout: 'radio',
      },
      initialValue: 'default',
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
