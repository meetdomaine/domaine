import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'


export default defineType({
  name: 'settings_cookieNotice',
  title: 'Cookie Notice',
  type: 'document',
  fields: [
    defineField({
      name: 'consentMessage',
      title: 'Consent Message',
      type: 'string',
    }),
    defineField({
      name: 'marketingConsentMessage',
      title: 'Checkbox Text: Marketing Consent',
      type: 'string',
    }),
  ],
})
