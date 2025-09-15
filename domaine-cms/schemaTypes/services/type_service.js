import {defineField, defineType} from 'sanity'
import { iconServices } from '../variables'
import { orderRankField } from '@sanity/orderable-document-list'

export default defineType({
  name: 'type_service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'snippet_locale-string',
      validation: Rule => Rule.required(),
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
      description: 'Removes internal links to the Service page, but keeps the page live.',
      type: 'boolean',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'snippet_locale-string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'snippet_locale-text',
      // validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'serviceGroup',
      title: 'Service Group',
      type: 'reference',
      to: [{ type: 'type_serviceGroup' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'agencyBrands',
      title: 'Agency Brands',
      type: 'array',
      of: [{
        name: 'agencyBrand',
        title: 'Agency Brand',
        type: 'reference',
        to: [{ type: 'type_agencyBrand'}]
      }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'pageSectionsDomaine',
      title: 'Page Sections: Domaine',
      type: 'array',
      of: [
        { type: 'section_serviceFeature'},
        { type: 'section_form'},
        { type: 'section_projectsFeed'},
        // { type: 'section_projectsGrid'},
        // { type: 'section_projectsFullBleed'},
        { type: 'section_blogFeed'},
        // { type: 'section_servicesFeed'},
        { type: 'section_partnersFeed'},
        { type: 'section_practicesFeed'},
        { type: 'section_textMedia'},
        { type: 'section_textVideoPlayer'},
        { type: 'section_textClients'},
        { type: 'section_textColumns'},
        { type: 'section_textMediaTabs'},
        { type: 'section_textLinkCard'},
        { type: 'section_videoPlayer'},
        { type: 'section_contentBlocks'},
        { type: 'section_mediaCarousel'},
    ]
    }),
    defineField({
      name: 'pageSectionsStudio',
      title: 'Page Sections: Studio',
      type: 'array',
      of: [
        { type: 'section_serviceFeature'},
        { type: 'section_form'},
        { type: 'section_projectsFeed'},
        // { type: 'section_projectsGrid'},
        // { type: 'section_projectsFullBleed'},
        { type: 'section_blogFeed'},
        // { type: 'section_servicesFeed'},
        { type: 'section_partnersFeed'},
        { type: 'section_practicesFeed'},
        { type: 'section_textMedia'},
        { type: 'section_textVideoPlayer'},
        { type: 'section_textClients'},
        { type: 'section_textColumns'},
        { type: 'section_textMediaTabs'},
        { type: 'section_textLinkCard'},
        { type: 'section_videoPlayer'},
        { type: 'section_contentBlocks'},
        { type: 'section_mediaCarousel'},
      ]
    }),
    defineField({
      name: 'globalSectionsDomaine',
      title: 'Global Sections: Domaine',
      type: 'section_globalSections',
    }),
    defineField({
      name: 'globalSectionsStudio',
      title: 'Global Sections: Studio',
      type: 'section_globalSections',
    }),
    defineField({
      name: 'formHeading',
      title: 'Form: Heading',
      type: 'snippet_locale-string',
      description: 'If none is added, will pull from Service Group/Type.'
    }),
    defineField({
      name: 'formText',
      title: 'Form: Text',
      type: 'snippet_locale-string',
      description: 'If none is added, will pull from Service Group/Type.'
    }),
    defineField({
      name: 'hubspotFormId',
      title: 'Form: Hubspot ID',
      type: 'string',
      description: 'If none is added, will pull from Service Group/Type.'
    }),
    defineField({
      name: 'metafields',
      title: 'Metafields',
      type: 'snippet_locale-SEO-fields',
    }),
    // defineField({
    //   name: 'formHeading',
    //   title: 'Form: Heading',
    //   type: 'string',
    //   validation: Rule => Rule.required()
    // }),
    // defineField({
    //   name: 'formText',
    //   title: 'Form: Text',
    //   type: 'string',
    // }),
    // defineField({
    //   name: 'hubspotFormId',
    //   title: 'Form: Hubspot ID',
    //   type: 'string',
    //   validation: Rule => Rule.required()
    // }),
    orderRankField({ type: 'type_service'}),
  ],

  preview: {
    select: {
      title: 'title.text',
      group: 'serviceGroup.title.text'
    },
    prepare(selection) {
      return {
        ...selection,
        subtitle: selection.group,
        media: iconServices,
      }
    }
  },
})
