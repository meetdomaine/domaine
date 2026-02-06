import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'snippet_locale-string',
  title: 'Locale String',
  type: 'document',
  fields: [
    defineField({
        name: 'text',
        title: 'Text',
        type: 'string',
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
            name: 'uk',
            title: 'British English',
            type: 'string',
          },
          {
            name: 'de',
            title: 'German',
            type: 'string',
          },
          {
            name: 'nl',
            title: 'Dutch',
            type: 'string',
          }
        ]
    })
  ]
})
