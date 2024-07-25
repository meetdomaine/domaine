import {defineField, defineType} from 'sanity'
import { iconPartners } from '../variables'
import { orderRankField } from '@sanity/orderable-document-list'

export default defineType({
  name: 'type_partner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'tier',
      title: 'Tier',
      type: 'reference',
      to: [{type: 'type_partnerTier'}]
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'snippet_image',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'snippet_image',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https'],
        allowRelative: false
      })
    }),
    orderRankField({ type: 'type_partner'}),
  ],

  preview: {
    select: {
      title: 'title', 
      subtitle: 'tier.title',
      media: 'icon.image'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: title,
        subtitle: subtitle,
        media: media ? media : iconPartners
      }
    }
  },
})
