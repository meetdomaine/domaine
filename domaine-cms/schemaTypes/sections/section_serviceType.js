import {defineField, defineType} from 'sanity'
import { iconServices, iconServiceTypes } from '../variables'

export default defineType({
  name: 'section_serviceType',
  title: 'Service Type',
  type: 'document',
  icon: iconServiceTypes,
  fields: [
    defineField({
      name: 'showSection',
      title: 'Show Section',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'serviceType',
      title: 'Service Type',
      type: 'reference',
      to: [{ type: 'type_serviceType'}]
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'snippet_button',
    }),
  ],
  preview: {
    select: {
      title: 'serviceType.title',
      subtitle: 'heading' 
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title,
        subtitle: 'Service Type',
        media: iconServiceTypes,
      }
    }
  },
})
