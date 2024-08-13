import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'


export default defineType({
  name: 'settings_header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'navigationLinks',
      title: 'Navigation Links',
      type: 'snippet_link-list',
    }),
    defineField({
      name: 'hubspotFormId',
      title: 'Hubspot Form ID',
      type: 'string',
    }),
    defineField({
      name: 'contactForms',
      title: 'Contact Forms',
      description: 'Note: These forms fields are not managed by Hubspot and can be adjusted in the frontend code.',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string'
          },
          {
            name: 'hubspotFormId',
            title: 'Hubspot Form ID',
            description: 'Form will send POST request to Hubspot API with this form ID.',
            type: 'string'
          }
        ],
        preview: {
          select: {
            title: 'title'
          },
          prepare(selection) {
            const { title } = selection
            return {
              title: title,
              icon: EnvelopeIcon
            }
          }
        }
      }]
    }),
    defineField({
      name: 'processConsentMessage',
      title: 'Checkbox Text: Consent to Process',
      type: 'string',
    }),
    defineField({
      name: 'marketingConsentMessage',
      title: 'Checkbox Text: Marketing Consent',
      type: 'string',
    }),
  ],
})
