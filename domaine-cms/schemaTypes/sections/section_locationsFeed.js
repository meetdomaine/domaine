import {defineField, defineType} from 'sanity'
import { iconLocation, iconPartners } from '../variables'

export default defineType({
  name: 'section_locationsFeed',
  title: 'Locations Feed',
  type: 'document',
  icon: iconLocation,
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
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'snippet_button',
    }),
    // defineField({
    //   name: 'locations',
    //   title: 'Locations',
    //   type: 'array',
    //   of: [{
    //     type: 'reference',
    //     to: [{ type: 'type_location'}]
    //   }]
    // }),
  ],
  preview: {
    select: {
      title: 'heading', 
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title,
        subtitle: 'Locations Feed',
        media: iconLocation,
      }
    }
  },
})
