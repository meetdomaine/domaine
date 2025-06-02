import {defineField, defineType} from 'sanity'
import { ClipboardImageIcon, ToggleArrowRightIcon, SplitVerticalIcon } from '@sanity/icons' 

export default defineType({
  name: 'section_textMediaBlocks',
  title: 'Text + Media Blocks',
  type: 'document',
  icon: ClipboardImageIcon,
  fields: [
    defineField({
      name: 'showSection',
      title: 'Show Section',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'snippet_locale-button',
    }),
    defineField({
      name: 'columnCount',
      title: 'Columns',
      type: 'number',
      validation: Rule => Rule.required().min(2).max(6),
    }),
    defineField({
      name: 'blocks',
      title: 'Text + Media Blocks',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'media',
            title: 'Media',
            type: 'snippet_video',
            validation: Rule => Rule.required(),
          },
          {
            name: 'heading',
            title: 'Heading',
            type: 'snippet_locale-string',
            validation: Rule => Rule.required(),
          },
          {
            name: 'subheading',
            title: 'Subheading',
            type: 'snippet_locale-text',
          },
          {
            name: 'button',
            title: 'Button',
            type: 'snippet_locale-button',
          }
        ],
        preview: {
          select: {
            title: 'heading.text'
          },
          prepare(selection) {
            const { title } = selection
            return {
              title: title,
              subtitle: 'Block',
              icon: SplitVerticalIcon,
            }
          }
        },
      }],
      validation: Rule => Rule.required()
    }),
  ],
  preview: {
    select: {
      title: 'heading.text'
    },
    prepare(selection) {
      const { title, blockTitle1, blockTitle2, blockTitle3 } = selection
      return {
        title: title ? title : 'Text + Media Blocks',
        subtitle: title ? 'Text + Media Blocks' : null,
        media: ClipboardImageIcon
      }
    }
  },
})
