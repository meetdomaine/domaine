import {defineField, defineType} from 'sanity'
import { iconPartners } from '../variables'
import { orderRankField } from '@sanity/orderable-document-list'

export default defineType({
  name: 'type_partner',
  title: 'Partner',
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
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'info',
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
      group: 'info',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'tier',
      title: 'Tier',
      type: 'reference',
      group: 'info',
      to: [{type: 'type_partnerTier'}]
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Website URL',
      group: 'info',
      type: 'url',
      validation: Rule => Rule.required().uri({
        scheme: ['http', 'https'],
        allowRelative: false
      })
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'snippet_image',
      group: 'media',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'snippet_image',
      group: 'media',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'snippet_rich-content',
      group: 'content',
      // validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'globalSections',
      title: 'Sections',
      type: 'section_globalSections',
      group: 'content',
    }),
    defineField({
      name: 'metafields',
      title: 'Metafields',
      type: 'snippet_SEO-fields',
      group: 'seo',
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
