import {defineField, defineType} from 'sanity'
import { iconBlog } from '../variables'
import {CalendarIcon} from '@sanity/icons'


export default defineType({
  name: 'section_agenda',
  title: 'Agenda',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'showSection',
      title: 'Show Section',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'dates',
      title: 'Dates',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'heading',
            title: 'Heading',
            type: 'string',
          },
          {
            name: 'subheading',
            title: 'Subheading',
            type: 'string',
          },
          {
            name: 'times',
            title: 'Times',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                {
                  name: 'heading',
                  title: 'Heading',
                  type: 'string'
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'string'
                },
                {
                  name: 'time',
                  title: 'Time',
                  type: 'string'
                },
                {
                  name: 'date',
                  title: 'Date',
                  type: 'string'
                },
              ],
              preview: {
                select: {
                  title: 'heading',
                  subtitle: 'time'
                },
                prepare(selection) {
                  return {
                    ...selection,
                    icon: CalendarIcon
                  }
                }
              }
            }]
          }
        ],
        preview: {
          select: {
            title: 'heading',
            subtitle: 'subheading'
          },
          prepare(selection) {
            return {
              ...selection,
              icon: CalendarIcon
            }
          }
        }
      }],
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heading', 
    },
    prepare(selection) {
      return {
        title: 'Agenda',
        media: CalendarIcon
      }
    }
  },
})
