import {defineField, defineType} from 'sanity'
import { iconIndustries } from '../variables'

export default defineType({
  name: 'type_industry',
  title: 'Industry',
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
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'metafields',
      title: 'Metafields',
      type: 'snippet_SEO-fields',
    }),
    defineField({
      name: 'redirectPath',
      title: 'Redirect Path',
      type: 'string',
      description: 'e.g /careers'
    }),
    // defineField({
    //   name: 'agencyBrands',
    //   title: 'Agency Brands',
    //   type: 'array',
    //   of: [{
    //     name: 'agencyBrand',
    //     title: 'Agency Brand',
    //     type: 'reference',
    //     to: [{ type: 'type_agencyBrand'}]
    //   }],
    //   validation: Rule => Rule.required(),
    // }),
  ],

  preview: {
    select: {
      title: 'title.text', 
    },
    prepare(selection) {
      return {
        ...selection,
        media: iconIndustries
      }
    }
  },
})
