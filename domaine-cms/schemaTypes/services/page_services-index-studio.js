import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page_services-index-studio',
  title: 'Services Index',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'snippet_image'}],
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
        { type: 'section_textMediaTabs'},
        { type: 'section_textFeed'},
        { type: 'section_videoPlayer'},
        { type: 'section_contentBlocks'},
        { type: 'section_mediaCarousel'},
        { type: 'section_statsCarousel'},
        { type: 'section_serviceCards'},
        { type: 'section_linkList'},
    ]
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'heading'
    },
  },
})