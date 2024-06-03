import {defineField, defineType} from 'sanity'
import { iconLink } from '../variables'

export default defineType({
  name: 'snippet_link-list',
  title: 'Link List',
  type: 'document',
  fields: [
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
            {
                name: 'linkText',
                title: 'Text',
                type: 'string',
                validation: Rule => Rule.required(),
            },
            {
                name: 'linkUrl',
                title: 'URL',
                type: 'url',
                validation: Rule => Rule.uri({
                    scheme: ['http', 'https'],
                    allowRelative: true
                }).required()
            },
            {
              name: 'newTab',
              title: 'Open in New Tab',
              type: 'boolean',
              initialValue: false,
          },
        ],
        preview: {
            select: {
                title: 'linkText', 
            },
            prepare(selection) {
                return {...selection, subtitle: "Link", icon: iconLink}
            }
        },
      }]
    }),
  ],

  
})
