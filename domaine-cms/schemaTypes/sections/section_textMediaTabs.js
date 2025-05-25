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
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'snippet_locale-string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'snippet_locale-button',
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
            type: 'snippet_locale-string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'subtitle',
            title: 'Subtitle',
            description: 'Formerly called Text',
            type: 'snippet_locale-text',
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
        ],
        preview: {
          select: {
            title: 'title.text',
            subtitle: 'subheading.text'
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
      title: 'heading.text', 
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
