import {defineField, defineType} from 'sanity'
import { FolderIcon } from '@sanity/icons' 

export default defineType({
  name: 'section_textMediaTabs',
  title: 'Text + Media Tabs',
  type: 'document',
  icon: FolderIcon,
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
      name: 'button',
      title: 'Button',
      type: 'snippet_button',
    }),
    defineField({
      name: 'insetMedia',
      title: 'Inset Media',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      of: [{
        name: 'tab',
        title: 'Tab',
        type: 'object',
        fields: [
          defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'text',
            title: 'Text',
            type: 'text',
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
        ],
        preview: {
          select: {
            title: 'title',
            subtitle: 'text'
          },
          prepare(selection) {
            const { title, subtitle} = selection
            return {
              title: title,
              subtitle: subtitle,
              media: FolderIcon
            }
          }
        }
      }]
    }),
  ],
  
  preview: {
    select: {
      title: 'heading', 
    },
    prepare(selection) {
      return {
        ...selection,
        subtitle: 'Text + Media Tabs',
        media: FolderIcon
      }
    }
  },
})
