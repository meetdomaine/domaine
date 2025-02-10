import {defineField, defineType} from 'sanity'
import { iconServiceTypes } from '../variables'
import { orderRankField } from '@sanity/orderable-document-list'

export default defineType({
  name: 'type_serviceType',
  title: 'Service Type',
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
      name: 'isHidden',
      title: 'Hidden',
      description: 'Removes internal links to the Service Type page, but keeps the page live.',
      type: 'boolean',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'excerptStudio',
      title: 'Excerpt: Studio',
      type: 'string',
      description: 'Optional override for Studio.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'descriptionStudio',
      title: 'Description: Studio',
      type: 'text',
      description: 'Optional override for Studio.',
    }),
    defineField({
      name: 'agencyBrands',
      title: 'Agency Brands',
      type: 'array',
      of: [{
        name: 'agencyBrand',
        title: 'Brand',
        type: 'reference',
        to: [{ type: 'type_agencyBrand'}]
      }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      description: 'Used in Services section.',
      type: 'array',
      of: [{ type: 'snippet_image' }],
      validation: Rule => Rule.required().min(2),
    }),
    defineField({
      name: 'pageSectionsDomaine',
      title: 'Page Sections: Domaine',
      type: 'array',
      of: [
        { type: 'section_blogFeed'},
        { type: 'section_contentBlocks'},
        { type: 'section_form'},
        { type: 'section_imageFullHeight'},
        { type: 'section_mediaCarousel'},
        { type: 'section_mediaFullbleed'},
        { type: 'section_partnersFeed'},
        { type: 'section_practicesFeed'},
        { type: 'section_projectsFeed'},
        { type: 'section_serviceFeature'},
        // { type: 'section_projectsGrid'},
        // { type: 'section_projectsFullBleed'},
        // { type: 'section_servicesFeed'},
        { type: 'section_textClients'},
        { type: 'section_textColumns'},
        { type: 'section_textVideoPlayer'},
        { type: 'section_textHeading'},
        { type: 'section_textLinkCard'},
        { type: 'section_textMedia'},
        { type: 'section_textMediaBlocks'},
        { type: 'section_textMediaTabs'},
        { type: 'section_videoPlayer'},
    ]
    }),
    defineField({
      name: 'pageSectionsStudio',
      title: 'Page Sections: Studio',
      type: 'array',
      of: [
        { type: 'section_blogFeed'},
        { type: 'section_contentBlocks'},
        { type: 'section_form'},
        { type: 'section_imageFullHeight'},
        { type: 'section_mediaCarousel'},
        { type: 'section_mediaFullbleed'},
        { type: 'section_partnersFeed'},
        { type: 'section_practicesFeed'},
        { type: 'section_projectsFeed'},
        { type: 'section_serviceFeature'},
        // { type: 'section_projectsGrid'},
        // { type: 'section_projectsFullBleed'},
        // { type: 'section_servicesFeed'},
        { type: 'section_textClients'},
        { type: 'section_textColumns'},
        { type: 'section_textVideoPlayer'},
        { type: 'section_textHeading'},
        { type: 'section_textLinkCard'},
        { type: 'section_textMedia'},
        { type: 'section_textMediaBlocks'},
        { type: 'section_textMediaTabs'},
        { type: 'section_videoPlayer'},
    ]
    }),
    defineField({
      name: 'formHeading',
      title: 'Form: Heading',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'formText',
      title: 'Form: Text',
      type: 'string',
    }),
    defineField({
      name: 'hubspotFormId',
      title: 'Form: Hubspot ID',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'metafields',
      title: 'Metafields',
      type: 'snippet_SEO-fields',
    }),
    defineField({
      name: 'metafieldsStudio',
      title: 'Metafields: Studio',
      description: 'Used in Services section.',
      type: 'snippet_SEO-fields',
    }),
    orderRankField({ type: 'type_serviceType'}),
  ],

  preview: {
    select: {
      title: 'title',
      brands: 'agencyBrands'
    },
    prepare(selection) {
      return {
        ...selection,
        media: iconServiceTypes,
        subtitle: 'Service'
      }
    }
  },
})
