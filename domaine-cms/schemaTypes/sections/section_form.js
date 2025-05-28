import {defineField, defineType} from 'sanity'
import { iconForm, iconIndustries } from '../variables'

export default defineType({
  name: 'section_form',
  title: 'Form',
  type: 'document',
  icon: iconForm,
  fields: [
    defineField({
      name: 'showSection',
      title: 'Show Section',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'snippet_locale-string',
      validation: Rule => Rule.required(),
    }),
    defineField({
        name: 'subheading',
        title: 'Subheading',
        type: 'snippet_locale-string',
    }),
    defineField({
        name: 'hubspotFormId',
        title: 'Hubspot Form ID',
        type: 'string',
        validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heading.text', 
    },
    prepare(selection) {
      return {
        ...selection,
        subtitle: 'Form',
        media: iconForm
      }
    }
  },
})
