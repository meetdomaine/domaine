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
            type: 'snippet_locale-string',
          },
          {
            name: 'subheading',
            title: 'Subheading',
            type: 'snippet_locale-string',
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
                  type: 'snippet_locale-string',
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'snippet_locale-string',
                },
                {
                  name: 'time',
                  title: 'Time',
                  type: 'string'
                },
                {
                  name: 'date',
                  title: 'Date',
                  type: 'snippet_locale-string',
                },
              ],
              preview: {
                select: {
                  title: 'heading.text',
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
            title: 'heading.text',
            subtitle: 'subheading.text'
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
      title: 'heading.text', 
    },
    prepare(selection) {
      return {
        title: 'Agenda',
        media: CalendarIcon
      }
    }
  },
})
