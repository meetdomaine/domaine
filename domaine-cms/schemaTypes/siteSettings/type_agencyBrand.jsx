import {defineField, defineType} from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'
// import { InlineSvgPreviewItem } from '@focus-reactive/sanity-plugin-inline-svg-input'

import { media } from 'sanity-plugin-media'
import { iconAgencyBrand } from '../variables'

export default defineType({
  name: 'type_agencyBrand',
  title: 'Agency Brand',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'If you change this, the whole site will break :)',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Resolution: 64x64px.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string',
      description: 'Used in Brand menu & practices section.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'thumbnailMedia',
      title: 'Thumbnail Media',
      type: 'snippet_video',
      description: 'Used in Brand menu & practices section.',
      validation: Rule => Rule.required(),
    }),
    // defineField({
    //   name: 'logo',
    //   title: 'Logo',
    //   type: 'inlineSvg',
    // }),
    defineField({
      name: 'url',
      title: 'Root URL',
      type: 'url',
      validation: Rule => Rule.uri({
        allowRelative: true
      })
    }),
    defineField({
      name: 'metafields',
      title: 'Metafields',
      type: 'snippet_SEO-fields',
      description: 'Default brand SEO fields.'
    }),
    defineField({
      name: 'cookieNoticeText',
      title: 'Cookie Notice: Text',
      type: 'snippet_rich-content',
      validation: Rule => Rule.required()
    }),
    orderRankField({ type: 'type_practice'}),
  ],
  preview: {
    select: {
      title: 'name',
      // icon: 'logo',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title,
        media: iconAgencyBrand
      }
    }
  },
  // components: {
  //   preview: ({ icon, title }) => {
  //     return <InlineSvgPreviewItem icon={icon} title={title} subtitle={'Agency Brand'} />
  //   },
  // },
})
