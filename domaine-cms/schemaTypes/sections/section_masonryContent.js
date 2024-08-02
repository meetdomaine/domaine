import {defineField, defineType} from 'sanity'
import {DashboardIcon} from '@sanity/icons'


export default defineType({
  name: 'section_masonryContent',
  title: 'Masonry Content',
  type: 'document',
  icon: DashboardIcon,
  fields: [
    defineField({
      name: 'showSection',
      title: 'Show Section',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'snippet_button',
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
        subtitle: 'Masonry Content',
        media: DashboardIcon,
      }
    }
  },
})
