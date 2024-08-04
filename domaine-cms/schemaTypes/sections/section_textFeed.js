import {defineField, defineType} from 'sanity'
import {InfoOutlineIcon} from '@sanity/icons'
import { iconStat } from '../variables'


export default defineType({
  name: 'section_textFeed',
  title: 'Text + Feed',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'showSection',
      title: 'Show Section',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'number',
            title: 'Number',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'label',
            title: 'Label',
            type: 'string',
            validation: Rule => Rule.required()
          }
        ],
        preview: {
          select: {
            title: 'number',
            subtitle: 'label'
          },
          prepare(selection){
            return {
              ...selection,
              icon: iconStat
            }
          }
        }
      }]
    }),
  ],

  preview: {
    select: {
      title: 'heading', 
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title,
        subtitle: 'Text + Feed',
        icon: InfoOutlineIcon
      }
    }
  },
})
