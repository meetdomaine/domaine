
import {defineField, defineType} from 'sanity'
import { iconProjects } from '../variables'
import { media } from 'sanity-plugin-media'

export default defineType({
  name: 'section_projectsFullBleed',
  title: 'Projects Full-bleed',
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
        name: 'projects',
        title: 'Projects',
        type: 'array',
        of: [{
            type: 'object',
            fields: [
                {
                    name: 'project',
                    title: 'Project',
                    type: 'reference',
                    to: { type: 'type_project'},
                    validation: Rule => Rule.required(),
                },
                {
                    name: 'media',
                    title: 'Image',
                    type: 'snippet_image',
                    validation: Rule => Rule.required(),
                }
            ],
            preview: {
                select: {
                  title: 'project.title',
                  media: 'media.image'
                },
              },
        }]
    }),
  ],
  preview: {
    prepare(selection) {
      return {
        title: 'Projects Full-bleed',
        media: iconProjects,
      }
    }
  },
})
