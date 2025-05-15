import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'snippet_locale-text',
  title: 'Locale Text',
  type: 'document',
  fields: [
    defineField({
        name: 'text',
        title: 'Text',
        type: 'text',
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
            type: 'text',
          },
          {
            name: 'nl',
            title: 'Dutch',
            type: 'text',
          }
        ]
    })
  ]
})
