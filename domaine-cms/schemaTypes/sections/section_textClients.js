import {defineField, defineType} from 'sanity'
import { CaseIcon } from '@sanity/icons' 

export default defineType({
  name: 'section_textClients',
  title: 'Text + Clients',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'showSection',
      title: 'Show Section',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'snippet_locale-string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'clients',
      title: 'Clients',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'type_client'}]
      }],
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'quoteAuthor',
      title: 'Quote: Author',
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'quoteClient',
      title: 'Quote: Client',
      type: 'reference',
      to: [{ type: 'type_client' }],
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'snippet_locale-text',
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'snippet_locale-button',
    }),
  ],
  preview: {
    select: {
      title: 'heading.text', 
    },
    prepare(selection) {
      return {
        ...selection,
        subtitle: 'Text + Clients',
        media: CaseIcon
      }
    }
  },
})
