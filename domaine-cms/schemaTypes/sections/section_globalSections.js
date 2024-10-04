import {defineField, defineType} from 'sanity'
import { iconIndustries } from '../variables'

export default defineType({
  name: 'section_globalSections',
  title: 'Global Sections',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        { type: 'section_blogFeed'},
        { type: 'section_contentBlocks'},
        { type: 'section_form'},
        { type: 'section_imageFullHeight'},
        { type: 'section_locationsFeed'},
        { type: 'section_linkList'},
        { type: 'section_mediaCarousel'},
        { type: 'section_projectsFeed'},
        { type: 'section_projectsGrid'},
        { type: 'section_projectsFullBleed'},
        { type: 'section_partnersFeed'},
        { type: 'section_practicesFeed'},
        { type: 'section_quote'},
        { type: 'section_richContent'},
        { type: 'section_servicesFeed'},
        { type: 'section_statsCarousel'},
        { type: 'section_textClients'},
        { type: 'section_textColumns'},
        { type: 'section_textHeading'},
        { type: 'section_textMedia'},
        { type: 'section_textVideoPlayer'},
        { type: 'section_textMediaBlocks'},
        { type: 'section_textMediaTabs'},
        { type: 'section_textLinkCard'},
        { type: 'section_videoPlayer'},
    ]
    }),
  ],
//   preview: {
//     select: {
//       title: 'title', 
//     },
//     prepare(selection) {
//       return {
//         ...selection,
//         media: iconIndustries
//       }
//     }
//   },
})
