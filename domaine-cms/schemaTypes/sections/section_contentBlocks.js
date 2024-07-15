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
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'snippet_button',
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
            name: 'heading',
            title: 'Heading',
            type: 'string',
          },
          {
            name: 'text',
            title: 'Text',
            type: 'text',
          },
          {
            name: 'button',
            title: 'Button',
            type: 'snippet_button',
          }
        ],
        preview: {
          select: {
            title: 'heading',
            image: 'media.image'
          },
          prepare(selection) {
            const { title, image } = selection
            return {
              title: title ? title : "No Heading",
              subtitle: 'Content Block',
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
    select: {
      title: 'heading',
      blockTitle1: 'contentBlocks.0.heading',
      blockTitle2: 'contentBlocks.1.heading',
      blockTitle3: 'contentBlocks.2.heading',
    },
    prepare(selection) {
      const { title, blockTitle1, blockTitle2, blockTitle3 } = selection
      return {
        title: title ? title : blockTitle1 ? blockTitle1 : blockTitle2 ? blockTitle2 : blockTitle3,
        subtitle: 'Content Blocks',
        media: ProjectsIcon
      }
    }
  },
})
