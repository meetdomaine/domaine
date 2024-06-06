import {defineField, defineType} from 'sanity'
import { iconAward, iconStat } from '../variables'

export default defineType({
  name: 'type_project',
  title: 'Project',
  type: 'document',
  groups: [
    {
      name: 'info',
      title: 'Info',
    },
    {
      name: 'media',
      title: 'Media',
    },
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'info',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'info',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string',
      group: 'info',
      description: 'Description on project cards.'
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'info',
      description: 'Project page heading.'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'info',
      description: 'Project page main description.'
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      group: 'info',
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https']
      })
    }),
    defineField({
      name: 'projectCardMedia',
      title: 'Project Card',
      type: 'snippet_video',
      group: 'media',
    }),
    defineField({
      name: 'mux',
      title: 'Mux',
      type: 'mux.video',
      group: 'media',
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'reference',
      group: 'info',
      to: [{ type: 'type_client'}]
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{
        title: 'Service',
        type: 'reference',
        to: [{ type: 'type_service'}],
      }],
      group: 'info',
    }),
    defineField({
      name: 'agencyBrand',
      title: 'Agency Brand',
      type: 'reference',
      to: [{ type: 'type_agencyBrand'}],
      group: 'info',
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'reference',
      to: [{ type: 'type_industry'}],
      group: 'info',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'array',
      of: [{
        name: 'partner',
        title: 'Partner',
        type: 'reference',
        to: [{ type: 'type_partner'}],
      }],
      group: 'info',
    }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [{
        name: 'metric',
        title: 'Metric',
        type: 'object',
        fields: [
          {
            name: 'number',
            title: 'Number',
            type: 'string',
          },
          {
            name: 'label',
            title: 'Label',
            type: 'string',
          },
        ],
        preview: {
          select: {
            title: 'number',
            subtitle: 'label',
          },
          prepare(selection) {
            return {
              ...selection,
              media: iconStat,
            }
          }
        }
      }],
      group: 'info',
    }),
    
    defineField({
      name: 'awards',
      title: 'Awards',
      type: 'array',
      of: [{
        name: 'award',
        title: 'Award',
        type: 'object',
        fields: [
          {
            name: 'awardTitle',
            title: 'Award Title',
            type: 'string',
          },
          {
            name: 'publication',
            title: 'Publication',
            type: 'string',
          },
        ],
        preview: {
          select: {
            title: 'awardTitle',
            subtitle: 'publication',
          },
          prepare(selection) {
            return {
              ...selection,
              media: iconAward,
            }
          }
        }
      }],
      group: 'info',
    }),
    // defineField({
    //   name: 'thumbnail',
    //   title: 'Thumbnail',
    //   type: 'image',
    //   options: {
    //     hotspot: true,
    //   },
    //   validation: (Rule) => Rule.required(),
    // }),
    defineField({
      name: 'metafields',
      title: 'Metafields',
      type: 'snippet_SEO-fields',
      group: 'seo',
    }),
  ],

  preview: {
    select: {
      title: 'title', 
      subtitle: 'agencyBrand.name'
    },
  },
  prepare(selection) {
    return {
      ...selection
    }
  }
})
