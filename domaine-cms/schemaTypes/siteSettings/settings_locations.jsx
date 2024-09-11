import {defineField, defineType} from 'sanity'
import { iconLocation } from '../variables'

export default defineType({
  name: 'settings_locations',
  title: 'Locations',
  type: 'document',
  fields: [
    defineField({
      name: 'locations',
      title: 'Locations',
      type: 'array',
      of: [{
        name: 'location',
        title: 'Location',
        type: 'object',
        fields: [
          {
            name: 'isPrimary',
            title: 'Primary Location',
            type: 'boolean',
            initialValue: false,
          },
          {
            name: 'city',
            title: 'City',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'stateProvince',
            title: 'State/Province',
            type: 'string',
            // validation: Rule => Rule.required()
          },
          {
            name: 'country',
            title: 'Country',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'timezone',
            title: 'Timezone',
            type: 'string',
            description: (() => (
              <p>Identifier from the <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">TZ Database</a></p>
            ))(),
          },
          {
            name: 'addressLine1',
            title: 'Address: Line 1',
            type: 'string',
          },
          {
            name: 'addressLine2',
            title: 'Address: Line 2',
            type: 'string',
          },
          {
            name: 'label',
            title: 'Label',
            description: 'Tiny lil label that shows next to primary brands.',
            type: 'string',
          },
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
              icon: iconLocation,
            }
          }
        }
      }]
    }),
  ],
})
