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
      type: 'snippet_locale-string',
      group: 'info',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'snippet_locale-text',
      group: 'info',
      description: 'Required for Partners with a landing page.',
      // validation: Rule => Rule.required(),
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
      name: 'websiteText',
      title: 'Website Text',
      group: 'info',
      description: 'A prettier looking version of the URL (ex. Shopify.com)',
      type: 'string',
      // validation: Rule => Rule.required()
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Social Link: Instagram',
      type: 'url',
      group: 'info',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel'],
        allowRelative: false
      }),
    }),
    defineField({
      name: 'twitterUrl',
      title: 'Social Link: Twitter',
      type: 'url',
      group: 'info',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel'],
        allowRelative: false
      }),
    }),
    defineField({
      name: 'linkedInUrl',
      title: 'Social Link: LinkedIn',
      type: 'url',
      group: 'info',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel'],
        allowRelative: false
      }),
    }),
    defineField({
      name: 'youTubeUrl',
      title: 'Social Link: YouTube',
      type: 'url',
      group: 'info',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel'],
        allowRelative: false
      }),
    }),
    defineField({
      name: 'tikTokUrl',
      title: 'Social Link: TikTok',
      type: 'url',
      group: 'info',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel'],
        allowRelative: false
      }),
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
      type: 'snippet_locale-SEO-fields',
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
