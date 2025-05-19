import {defineField, defineType} from 'sanity'
import { iconBlogCategories } from '../variables'
import { orderRankField } from '@sanity/orderable-document-list'

export default defineType({
  name: 'type_blogCategory',
  title: 'Blog Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'snippet_locale-string',
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
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'metafields',
      title: 'Metafields',
      type: 'snippet_SEO-fields',
    }),
    orderRankField({ type: 'type_blogCategory'}),
  ],

  preview: {
    select: {
      title: 'title.text', 
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: 'Blog Category',
        media: iconBlogCategories,
      }
    }
  },
})
