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
        { type: 'section_blogFeed'},
        { type: 'section_textMedia'},
        { type: 'section_videoPlayer'},
        { type: 'section_servicesFeed'},
        { type: 'section_contentBlocks'},
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
