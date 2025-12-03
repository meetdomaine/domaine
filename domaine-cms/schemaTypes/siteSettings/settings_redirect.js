import {defineField, defineType} from 'sanity'
import { iconLink } from '../variables'

export default defineType({
  name: 'settings_redirect',
  title: 'Redirects',
  type: 'document',
  fields: [
    defineField({
        name: 'redirects',
        title: 'Redirects',
        type: 'array',
        of: [{
            type: 'object',
            icon: iconLink,
            fields: [
                {
                    name: 'from',
                    title: 'Redirect from',
                    type: 'string',
                    description: 'e.g, /insights/events/a-sip-and-shop-with-mejuri/',
                    validation: Rule => Rule.required(),
                },
                {
                    name: 'to',
                    title: 'Redirect to',
                    type: 'string',
                    description: 'e.g, /insights/events/a-sip-and-shop-with-mejuri/',
                    validation: Rule => Rule.required(),
                },
                {
                  name: 'statusCode',
                  title: 'Status Code',
                  type: 'string',
                  options: {
                    list: [
                      {title: '301', value: '301'},
                      {title: '302', value: '302'},
                      {title: '303', value: '303'},
                      {title: '307', value: '307'},
                      {title: '308', value: '308'},
                    ]
                  },
                  initialValue: '301',
                  validation: Rule => Rule.required(),
                }
            ],
        }],
    })
  ],
  preview: {
    prepare() { 
      return {
        title: "Internal Redirects"
      }
    }
  }
})
