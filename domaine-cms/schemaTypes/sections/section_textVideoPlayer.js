import {defineField, defineType} from 'sanity'
import { DocumentVideoIcon } from '@sanity/icons' 

export default defineType({
  name: 'section_textVideoPlayer',
  title: 'Text + Video Player',
  type: 'document',
  icon: DocumentVideoIcon,
  fields: [
    defineField({
      name: 'showSection',
      title: 'Show Section',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'snippet_locale-string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'snippet_locale-text',
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'snippet_locale-button',
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'snippet_video',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'mediaTitle',
      title: 'Media Title',
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'mediaSubtitle',
      title: 'Media Subtitle',
      type: 'snippet_locale-string',
    }),
  ],
  preview: {
    select: {
      title: 'heading.text', 
    },
    prepare(selection) {
      return {
        ...selection,
        subtitle: 'Text + Video Player',
        media: DocumentVideoIcon
      }
    }
  },
})
