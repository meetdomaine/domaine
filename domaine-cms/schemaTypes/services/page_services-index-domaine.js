import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page_services-index-domaine',
  title: 'Services Index',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'snippet_locale-string',
      description: 'Will be followed by a list of services in sentence form.'
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
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
        { type: 'section_textMediaBlocks'},
        { type: 'section_textMediaTabs'},
        { type: 'section_textLinkCard'},
        { type: 'section_videoPlayer'},
        { type: 'section_contentBlocks'},
        { type: 'section_mediaCarousel'},
        { type: 'section_statsCarousel'},
        { type: 'section_linkList'},
    ]
    }),
    defineField({
      name: 'formHeading',
      title: 'Form: Heading',
      type: 'snippet_locale-string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'formText',
      title: 'Form: Text',
      type: 'snippet_locale-string',
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
      type: 'snippet_locale-SEO-fields',
    }),
  ],

  preview: {
    select: {
      title: 'title.text',
      subtitle: 'heading.text'
    },
  },
})
