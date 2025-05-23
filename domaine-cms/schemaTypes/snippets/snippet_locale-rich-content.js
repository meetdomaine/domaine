import {defineType, defineArrayMember, defineField} from 'sanity'
import {PlayIcon, ImageIcon, BellIcon, EnvelopeIcon, JsonIcon, ImagesIcon, ErrorOutlineIcon, StackCompactIcon } from '@sanity/icons'


export default defineType({
  title: 'Content',
  name: 'snippet_locale-rich-content',
  type: 'object',
  fields: [
    defineField({
      name: 'richContent',
      title: 'Content',
      type: 'snippet_rich-content',
      validation: Rule => Rule.required()
    }),
    defineField({
        name: 'translations',
        title: 'Translations',
        type: 'object',
        options: {
          collapsible: true,
          collapsed: true
        },
        fields: [
          {
            name: 'de',
            title: 'German',
            type: 'snippet_rich-content',
          },
          {
            name: 'nl',
            title: 'Dutch',
            type: 'snippet_rich-content',
          }
        ]
    })
  ],
})
