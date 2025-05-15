import {defineField, defineType} from 'sanity'
import { iconLink } from '../variables'

export default defineType({
  name: 'snippet_locale-button',
  title: 'Button',
  type: 'document',
  fields: [
    defineField({
        name: 'label',
        title: 'Label',
        type: 'snippet_locale-string',
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
