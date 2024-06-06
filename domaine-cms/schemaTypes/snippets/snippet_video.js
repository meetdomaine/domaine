import {defineField, defineType} from 'sanity'
import { iconLink } from '../variables'

export default defineType({
  name: 'snippet_video',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({
        name: 'video',
        title: 'Video',
        type: 'file',
        options: {
            accept: 'video/mp4'
        },
        description: 'Optional video. Must be MP4 format. Try to keep it under 2MB.'
    }),
    defineField({
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
            hotspot: true
        },
        description: 'If video is added, this is used as the poster image.',
        validation: (Rule) => Rule.required()
    }),
    defineField({
        name: 'alt',
        title: 'Alt Text',
        type: 'string',
        validation: (Rule) => Rule.required()
    }),
  ],

  
})
