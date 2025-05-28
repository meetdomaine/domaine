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
      type: 'snippet_locale-text',
    }),
    defineField({
      name: 'largeText',
      title: 'Large Text',
      type: 'boolean',
      initialValue: false,
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
      name: 'colorScheme',
      title: 'Color Scheme',
      type: 'string',
      options: {
        list: [
          { 
            value: 'default',
            title: 'Default'
          },
          { 
            value: 'secondary',
            title: 'Secondary'
          },
          { 
            value: 'invert',
            title: 'Inverted'
          },
          { 
            value: 'brand',
            title: 'Brand'
          }
        ],
        layout: 'radio',
      },
      initialValue: 'default',
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
      type: 'snippet_locale-button',
    }),
    defineField({
      name: 'bulletPoints',
      title: 'Bullet Points',
      type: 'array',
      of: [{
        name: 'bulletPointText',
        title: 'Bullet Point Text',
        type: 'snippet_locale-string'
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
      title: 'heading.text', 
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
