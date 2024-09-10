import {defineField, defineType} from 'sanity'
import { iconServices, iconServiceTypes } from '../variables'

export default defineType({
  name: 'section_serviceFeature',
  title: 'Service Feature',
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
      name: 'featuredService',
      title: 'Featured Service',
      description: 'Either a Service Type or Service Group.',
      type: 'reference',
      to: [
        { type: 'type_serviceType'},
        { type: 'type_serviceGroup'}
      ]
    }),
    // defineField({
    //   name: 'heading',
    //   title: 'Heading',
    //   type: 'string',
    // }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'snippet_button',
    }),
  ],
  preview: {
    select: {
      title: 'featuredService.title',
      subtitle: 'heading' 
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title,
        subtitle: 'Service Feature',
        media: iconServiceTypes,
      }
    }
  },
})
