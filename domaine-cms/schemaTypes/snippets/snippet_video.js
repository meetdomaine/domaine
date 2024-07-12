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
        type: 'mux.video',
    }),
    defineField({
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
            hotspot: true
        },
        description: 'If video is added, this is used as the poster image.',
        validation: (Rule) => Rule.custom((value, { document: { video } }) => {
            return !video
        }),
        fields: [{
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
            validation: (Rule) => Rule.required()
        }]
    }),
    // defineField({
    //     name: 'alt',
    //     title: 'Alt Text',
    //     type: 'string',
    //     validation: (Rule) => Rule.required()
    // }),
  ],

  
})
