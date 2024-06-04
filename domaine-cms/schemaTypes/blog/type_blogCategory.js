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
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    orderRankField({ type: 'type_blogCategory'}),
  ],

  preview: {
    select: {
      title: 'title', 
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
