import {defineField, defineType} from 'sanity'
// import { InlineSvgPreviewItem } from '@focus-reactive/sanity-plugin-inline-svg-input'
import { iconPartnerTiers } from '../variables'
import { orderRankField } from '@sanity/orderable-document-list'

export default defineType({
  name: 'type_partnerTier',
  title: 'Partner Tier',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    // defineField({
    //   name: 'icon',
    //   title: 'Icon',
    //   type: 'inlineSvg',
    //   validation: Rule => Rule.required(),
    // }),
    // defineField({
    //   name: 'icon',
    //   title: 'Icon',
    //   type: 'snippet_image',
    //   validation: Rule => Rule.required(),
    // }),
    defineField({
      name: 'createLandingPages',
      title: 'Create Landing Pages',
      type: 'boolean',
    }),
    orderRankField({ type: 'type_partner'}),
  ],

  preview: {
    select: {
      title: 'title',
      icon: 'icon',
    },
  },
  // components: {
  //   preview: ({ icon, title }) => {
  //     const media = icon ? icon : iconPartnerTiers
  //     return <InlineSvgPreviewItem icon={media} title={title} subtitle={"Partner Tier"} />
  //   },
  // },
})
