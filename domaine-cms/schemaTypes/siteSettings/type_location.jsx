import { orderRankField } from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'
import { iconLocation } from '../variables'

export default defineType({
  name: 'type_location',
  title: 'Location',
  type: 'document',
  fields: [
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'city',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'stateProvince',
      title: 'State/Province',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'timezone',
      title: 'Timezone',
      type: 'string',
      description: (() => (
        <p>Identifier from the <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones" target="_blank">TZ Database</a></p>
      ))(),
      validation: Rule => Rule.required()
    }),
    orderRankField({ type: 'type_location'}),
  ],
  preview: {
    select: {
      title: 'city',
      subtitle: 'country'
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title,
        subtitle: subtitle,
        icon: iconLocation
      }
    }
  }
})
