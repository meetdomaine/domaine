import {defineField, defineType} from 'sanity'
import { iconServices } from '../variables'

export default defineType({
  name: 'section_serviceCards',
  title: 'Service Cards',
  type: 'document',
  icon: iconServices,
  fields: [
    defineField({
      name: 'showSection',
      title: 'Show Section',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{
        name: 'serviceCard',
        type: 'object',
        fields: [
          {
            name: 'service',
            title: 'Service',
            type: 'reference',
            to: [{ type: 'type_serviceType'}],
            validation: Rule => Rule.required()
          },
          {
            name: 'thumbnailImage',
            title: 'Thumbnail Image',
            type: 'snippet_image',
            validation: Rule => Rule.required()
          }
        ],
        validation: Rule => Rule.required(),
        preview: {
          select: {
            title: 'service.title',
            image: 'thumbnailImage.image'
          },
          prepare(selection) {
            const { title, image } = selection
            return {
              title: title,
              media: image
            }
          }
        }
      }]
    }),
  ],
  preview: {
    prepare(selection) {
      return {
        ...selection,
        title: 'Service Cards',
        media: iconServices,
      }
    }
  },
})
