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
        { type: 'section_form'},
        { type: 'section_projectsFeed'},
        { type: 'section_projectsFullBleed'},
        { type: 'section_projectsGrid'},
        { type: 'section_blogFeed'},
        { type: 'section_textColumns'},
        { type: 'section_textMedia'},
        { type: 'section_textClients'},
        { type: 'section_videoPlayer'},
        { type: 'section_servicesFeed'},
        { type: 'section_contentBlocks'},
        { type: 'section_partnersFeed'},
        { type: 'section_domaine-about'},
        { type: 'section_masonryContent'},
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
