
import {defineField, defineType} from 'sanity'
import { iconProjects } from '../variables'
import { media } from 'sanity-plugin-media'

export default defineType({
  name: 'section_projectsGrid',
  title: 'Projects Grid',
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
        name: 'title',
        title: 'Title',
        type: 'snippet_locale-string',
        validation: Rule => Rule.required()
    }),
    defineField({
        name: 'heading',
        title: 'Heading',
        type: 'snippet_locale-string',
        validation: Rule => Rule.required()
    }),
    defineField({
        name: 'button',
        title: 'Button',
        type: 'snippet_locale-button',
    }),
    defineField({
        name: 'projects',
        title: 'Projects',
        type: 'array',
        of: [{
            name: 'project',
            title: 'Project',
            type: 'reference',
            to: { type: 'type_project'},
        }],
        validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    prepare(selection) {
      return {
        title: 'Projects Grid',
        media: iconProjects,
      }
    }
  },
})
