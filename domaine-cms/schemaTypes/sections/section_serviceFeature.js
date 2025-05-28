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
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'snippet_locale-string',
      description: 'If added, will override the Sevice title.'
    }),
    defineField({
      name: 'headingSize',
      title: 'Heading Size',
      type: 'string',
      options: {
        list: [
          { title: "Small", value: "small" },
          { title: "Large", value: "large" },
        ],
        layout: "radio",
        direction: "horizontal"
      },
      initialValue: "large"
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'snippet_locale-text',
      description: 'If added, will override the Sevice excerpt.'
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'snippet_locale-button',
    }),
  ],
  preview: {
    select: {
      title: 'featuredService.title.text',
      subtitle: 'heading.text' 
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
