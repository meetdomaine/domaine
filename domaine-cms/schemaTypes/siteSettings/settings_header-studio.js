import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings_header-studio',
  title: 'Studio Header',
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
