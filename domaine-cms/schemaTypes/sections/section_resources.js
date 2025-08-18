import {defineField, defineType} from 'sanity'
import { iconResource } from '../variables'
import {UlistIcon, LinkIcon, BlockquoteIcon} from '@sanity/icons'


export default defineType({
  name: 'section_resources',
  title: 'Resources',
  type: 'document',
  icon: iconResource,
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
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'snippet_locale-text',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{
        type: 'reference',
        title: 'Blog',
        to: [{ type: 'type_blog'}]
      },{
        type: 'object',
        title: 'Resource',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'snippet_locale-string',
          },
          {
            name: 'badge',
            title: 'Badge',
            type: 'snippet_locale-string',
          },
          {
            name: 'media',
            title: 'Media',
            type: 'snippet_video',
          },
          {
            name: 'url',
            title: 'URL',
            type: 'url',
            validation: Rule => Rule.uri({
              allowRelative: true,
              scheme: ['http', 'https']
            })
          },
          {
            name: 'newTab',
            title: 'Open in New Tab',
            type: 'boolean',
            initialValue: false,
          }
        ],
        preview: {
          select: {
            title: 'title.text',
            media: 'media.image',
          },
          prepare(selection) {
            const { title, media } = selection
            return {
              title: title,
              subtitle: 'Resource',
              media: media
            }
          }
        }
      }],
      // validation: Rule => Rule.required()
    }),
  ],
  preview: {
    select: {
      title: 'heading.text'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: title,
        subtitle: 'Resources',
        media: iconResource,
      }
    }
  },
})
