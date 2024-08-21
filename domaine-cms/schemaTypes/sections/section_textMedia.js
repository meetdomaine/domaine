import {defineField, defineType} from 'sanity'
import { DocumentVideoIcon } from '@sanity/icons' 

export default defineType({
  name: 'section_textMedia',
  title: 'Text + Media',
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
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { 
            value: 'mediaRight',
            title: 'Media Right'
          },
          { 
            value: 'mediaLeft',
            title: 'Media Left'
          }
        ],
        layout: 'radio',
      },
      initialValue: 'mediaRight',
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'snippet_video',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'snippet_button',
    }),
    defineField({
      name: 'bulletPoints',
      title: 'Bullet Points',
      type: 'array',
      of: [{
        name: 'bulletPointText',
        title: 'Bullet Point Text',
        type: 'string'
      }]
    }),
    // defineField({
    //   name: 'buttonSecondary',
    //   title: 'Button: Secondary',
    //   type: 'snippet_button',
    // }),
  ],
  preview: {
    select: {
      title: 'heading', 
    },
    prepare(selection) {
      return {
        ...selection,
        subtitle: 'Text + Media',
        media: DocumentVideoIcon
      }
    }
  },
})
