import {defineField, defineType} from 'sanity'
import { iconStat } from '../variables'

export default defineType({
  name: 'type_project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https']
      })
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'reference',
      to: [{ type: 'type_client'}]
    }),
    defineField({
      name: 'agencyBrand',
      title: 'Agency Brand',
      type: 'reference',
      to: [{ type: 'type_agencyBrand'}]
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'reference',
      to: [{ type: 'type_industry'}],
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
      }]
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
      }]
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
      }]
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
