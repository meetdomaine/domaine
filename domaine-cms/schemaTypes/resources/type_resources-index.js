import {defineField, defineType} from 'sanity'
import { iconResourceIndex } from '../variables'

export default defineType({
  name: 'type_resources-index',
  title: 'Resources Index',
  type: 'document',
  icon: iconResourceIndex,
  groups: [
    {
      name: 'hero',
      title: 'Hero',
    },
    {
      name: 'media',
      title: 'Media',
    },
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'snippet_locale-string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.text',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'snippet_locale-string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'snippet_locale-text',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'snippet_locale-text',
      group: 'hero'
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'snippet_locale-button',
      group: 'hero',
    }),    
    defineField({
      name: 'colorScheme',
      title: 'Color Scheme',
      type: 'string',
      description: 'Avoid using this anywhere besides very specific brand pages.',
      options: {
        list: [
          { 
            value: 'default',
            title: 'Default'
          },
          { 
            value: 'invert',
            title: 'Inverted'
          },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
      group: 'content'
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      description: 'Avoid using this anywhere besides very specific brand pages.',
      type: 'color',
      group: 'content'
    }),
    // defineField({
    //   name: 'heading',
    //   title: 'Heading',
    //   type: 'snippet_locale-string',
    // }),
    defineField({
      name: 'contentPagesEyebrow',
      title: 'Content Pages Eyebrow',
      type: 'snippet_locale-string',
      description: 'This is the Eyebrow for the content pages section.',
      group: 'content',
    }),
    defineField({
      name: 'contentPagesHeading',
      title: 'Content Pages Heading',
      type: 'snippet_locale-string',
      description: 'This is the heading for the content pages section.',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'globalSections',
      title: 'Content Sections',
      type: 'section_globalSections',
    }),
    defineField({
      name: 'metafields',
      title: 'Metafields',
      type: 'snippet_locale-SEO-fields',
      group: 'seo',
    }),
  ],

  preview: {
    select: {
      title: 'title.text',
    },
  },
})
