import {defineField, defineType} from 'sanity'
import { iconPartners, iconPractices } from '../variables'
import { orderRankField } from '@sanity/orderable-document-list'

// DEPRECATED TYPE
export default defineType({
  name: 'type_practice',
  title: 'Practice',
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
    // defineField({
    //   name: 'isPrimaryPractice',
    //   title: 'Primary Practice',
    //   type: 'boolean',
    //   initialValue: false
    // }),
    defineField({
      name: 'thumbnailMedia',
      title: 'Thumbnail Media',
      type: 'snippet_video',
      // validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'inlineSvg',
    }),
    orderRankField({ type: 'type_practice'}),
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title,
        media: iconPractices
      }
    }
  },
})
