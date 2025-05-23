import {defineField, defineType} from 'sanity'
import { ToggleArrowRightIcon } from '@sanity/icons' 

export default defineType({
  name: 'section_videoPlayer',
  title: 'Video Player',
  type: 'document',
  icon: ToggleArrowRightIcon,
  fields: [
    defineField({
      name: 'showSection',
      title: 'Show Section',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'mux.video',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      options: {
        list: [
          { 
            value: 'dark',
            title: 'Dark'
          },
          { 
            value: 'light',
            title: 'Light'
          }
        ],
        layout: 'radio',
      },
      initialValue: 'dark'
    }),
  ],
  preview: {
    select: {
      title: 'heading.text', 
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
