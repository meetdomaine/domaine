import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'type_blog',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'snippet_locale-string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'series',
      title: 'Series',
      type: 'snippet_locale-string',
      description: "Optional name of series this post belongs to (ex. 'Domaine Migrations')"
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.text',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'isHidden',
      title: 'Hidden',
      type: 'boolean',
      description: 'Hidden posts are not shown on site and are not crawled by search engines.'
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
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'snippet_image',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'type_blogCategory' }]
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'snippet_locale-text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'snippet_locale-rich-content',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'migrate',
      title: 'Body (MIGRATE)',
      type: 'snippet_locale-rich-content',
      validation: Rule => Rule.required(),
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
      name: 'agencyBrand',
      title: 'Agency Brand',
      type: 'reference',
      to: [{ type: 'type_agencyBrand'}],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'partners',
      title: 'Related Partners',
      type: 'array',
      of: [{
        name: 'partner',
        title: 'Partner',
        type: 'reference',
        to: [{ type: 'type_partner'}],
      }],
    }),
    defineField({
      name: 'services',
      title: 'Related Services',
      type: 'array',
      of: [{
        name: 'service',
        title: 'Service',
        type: 'reference',
        to: [{ type: 'type_service'}],
      }],
    }),
    defineField({
      name: 'industries',
      title: 'Related Industries',
      type: 'array',
      of: [{
        name: 'industry',
        title: 'Industry',
        type: 'reference',
        to: [{ type: 'type_industry'}],
      }],
    }),
    defineField({
      name: 'features',
      title: 'Related Features',
      type: 'array',
      of: [{
        name: 'feature',
        title: 'Feature',
        type: 'reference',
        to: [{ type: 'type_projectFeature'}],
      }],
    }),
    defineField({
      name: 'globalSections',
      title: 'Sections',
      type: 'section_globalSections',
    }),
    defineField({
      name: 'metafields',
      title: 'Metafields',
      type: 'snippet_locale-SEO-fields',
    }),
  ],

  preview: {
    select: {
      title: 'title.text', 
      subtitle: 'agencyBrand.name',
      media: 'thumbnailImage.image'
    },
  },
})
