import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'type_blog',
  title: 'Blog Post',
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
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'type_blogCategory' }]
    }),
    defineField({
      name: 'postDate',
      title: 'Post Date',
      type: 'date',
      options: {
        dateFormat: 'MM-DD-YYYY',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'agencyBrand',
      title: 'Agency Brand',
      type: 'reference',
      to: [{ type: 'type_agencyBrand'}],
      validation: Rule => Rule.required(),
    }),
    // defineField({
    //   name: 'thumbnail',
    //   title: 'Thumbnail',
    //   type: 'image',
    //   options: {
    //     hotspot: true
    //   },
    //   validation: Rule => Rule.required(),
    // }),
    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'snippet_image',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'array',
      of: [{
        name: 'partner',
        title: 'Partner',
        type: 'reference',
        to: [{ type: 'type_partner'}],
      }],
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{
        name: 'author',
        title: 'Author',
        type: 'reference',
        to: [{ type: 'type_teamMember'}],
      }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    }),
    defineField({
      name: 'metafields',
      title: 'Metafields',
      type: 'snippet_SEO-fields',
    }),
  ],

  preview: {
    select: {
      title: 'title', 
      subtitle: 'agencyBrand.name',
      media: 'thumbnailImage.image'
    },
  },
})
