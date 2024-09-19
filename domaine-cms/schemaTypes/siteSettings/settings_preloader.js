import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings_preloader',
  title: 'Preloader',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description: 'Must be 18 images.',
      of: [{ type: 'snippet_image'}],
      validation: Rule => Rule.required().min(9),
    }),
  ],
})
