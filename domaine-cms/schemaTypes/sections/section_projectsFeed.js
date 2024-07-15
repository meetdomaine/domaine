import {defineField, defineType} from 'sanity'
import { iconProjects } from '../variables'

export default defineType({
  name: 'section_projectsFeed',
  title: 'Projects Feed',
  type: 'document',
  icon: iconProjects,
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
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      description: 'Optional. If not added, projects will auto-populate.',
      type: 'array',
      of: [{
        name: 'project',
        title: 'Project',
        type: 'reference',
        to: { type: 'type_project'}
      }]
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare(selection) {
      return {
        ...selection,
        subtitle: 'Projects Feed',
        media: iconProjects,
      }
    }
  },
})
