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
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string',
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
      title: 'title', 
    },
    prepare(selection) {
      return {
        ...selection,
        media: iconIndustries
      }
    }
  },
})
