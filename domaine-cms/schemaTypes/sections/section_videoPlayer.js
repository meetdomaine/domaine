import {defineField, defineType} from 'sanity'
import { ToggleArrowRightIcon } from '@sanity/icons' 

export default defineType({
  name: 'section_videoPlayer',
  title: 'Video Player',
  type: 'document',
  icon: ToggleArrowRightIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title', 
    },
    prepare(selection) {
      return {
        ...selection,
        subtitle: 'Video Player',
        media: ToggleArrowRightIcon
      }
    }
  },
})
