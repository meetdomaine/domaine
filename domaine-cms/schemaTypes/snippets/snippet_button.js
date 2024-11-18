import {defineField, defineType} from 'sanity'
import { iconLink } from '../variables'

export default defineType({
  name: 'snippet_button',
  title: 'Button',
  type: 'document',
  fields: [
    defineField({
        name: 'text',
        title: 'Text',
        type: 'string',
    }),
    defineField({
        name: 'url',
        title: 'URL',
        type: 'url',
        validation: (Rule) => Rule.uri({
            allowRelative: true,
            scheme: ['http', 'https']
        })
    }),
    defineField({
        name: 'newTab',
        title: 'Open in New Tab',
        type: 'boolean',
        initialValue: false,
    }),
  ],
})
