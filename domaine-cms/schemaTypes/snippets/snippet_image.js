import {defineField, defineType} from 'sanity'
import { iconLink } from '../variables'

export default defineType({
  name: 'snippet_image',
  title: 'Image',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      fields: [
        {
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
      ]
    }),
  ],

  
})
