import {defineField, defineType} from 'sanity'
import { iconPractices } from '../variables'
import {UlistIcon, LinkIcon} from '@sanity/icons'


export default defineType({
  name: 'section_linkList',
  title: 'Link List',
  type: 'document',
  icon: UlistIcon,
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
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'text',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{ 
        type: 'object',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
          },
          {
            name: 'url',
            title: 'URL',
            type: 'url',
            validation: Rule => Rule.required().uri({
              allowRelative: true,
              scheme: ['http', 'https']
            })
          },
          {
            name: 'newTab',
            title: 'New Tab?',
            type: 'boolean',
            initialValue: true
          },
        ],
        preview: {
          select: {
            title: 'title',
            subtitle: 'subtitle'
          },
          prepare(selection) {
            const { title, subtitle } = selection
            return {
              title: title,
              subtitle: subtitle,
              media: LinkIcon
            }
          }
        }
      }],
      validation: Rule => Rule.required()
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title,
        subtitle: 'Link List',
        media: UlistIcon,
      }
    }
  },
})
