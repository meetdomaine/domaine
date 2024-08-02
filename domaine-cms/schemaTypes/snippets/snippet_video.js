import {defineField, defineType} from 'sanity'
import { iconLink } from '../variables'
import {ImageIcon} from '@sanity/icons'

export default defineType({
  name: 'snippet_video',
  title: 'Video',
  type: 'document',
  icon: ImageIcon,
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
  preview: {
    select: {
        title: 'image.alt',
        media: 'image'
    },
    prepare(selection) {
        const { title, media } = selection
        return {
            title: title ? title : "Media",
            media: media ? media : ImageIcon
        }
    }
  }
  
})
