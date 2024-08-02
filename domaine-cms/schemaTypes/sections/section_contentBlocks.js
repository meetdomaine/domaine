import {defineField, defineType} from 'sanity'
import { ProjectsIcon, ToggleArrowRightIcon } from '@sanity/icons' 

export default defineType({
  name: 'section_contentBlocks',
  title: 'Content Blocks',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'showSection',
      title: 'Show Section',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      of: [{
        name: 'contentBlock',
        type: 'object',
        fields: [
          {
            name: 'media',
            title: 'Media',
            type: 'snippet_video',
          },
          {
            name: 'insetMedia',
            title: 'Inset Media',
            type: 'boolean',
            initialValue: false,
          },
        ],
        preview: {
          select: {
            image: 'media.image'
          },
          prepare(selection) {
            const { title, image } = selection
            return {
              title: 'Content Block',
              icon: ToggleArrowRightIcon,
              media: image,
            }
          }
        },
      }],
      validation: Rule => Rule.max(3).required()
    }),
  ],
  preview: {
    prepare(selection) {
      const { title, blockTitle1, blockTitle2, blockTitle3 } = selection
      return {
        title: 'Content Blocks',
        media: ProjectsIcon
      }
    }
  },
})
