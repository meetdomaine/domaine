import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page_general',
  title: 'Domaine Pages',
  type: 'document',
  groups: [
    {
      name: 'info',
      title: 'Info',
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
      group: 'info'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.text',
        maxLength: 96,
      },
      group: 'info'
    }),
    defineField({
      name: 'isMarketingPage',
      title: 'Marketing Page',
      type: 'boolean',
      initialValue: false,
      description: 'Removes navigation and adds form section.',
      group: 'info'
    }),
    defineField({
      name: 'heroColorScheme',
      title: 'Hero Color Scheme',
      type: 'string',
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Invert", value: "invert" },
        ],
        layout: "radio",
        direction: "horizontal"
      },
      initialValue: "default",
      hidden: ({document}) => !document?.isMarketingPage,
      group: 'info'
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'snippet_locale-string',
      hidden: ({document}) => !document?.isMarketingPage,
      group: 'info'
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'snippet_locale-string',
      validation: Rule => 
        Rule.custom((string, context) => {
          if (context.document.isMarketingPage && !string) return 'Marketing pages must have a form id.'
          return true
        }
      ),
      hidden: ({document}) => !document?.isMarketingPage,
      group: 'info'
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'snippet_locale-text',
      hidden: ({document}) => !document?.isMarketingPage,
      group: 'info'
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'snippet_locale-string',
      description: 'If added, will show a sticky button linking to the Hubspot form.',
      hidden: ({document}) => !document?.isMarketingPage,
      group: 'info'
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'snippet_locale-button',
      hidden: ({document}) => !document?.isMarketingPage,
      group: 'info'
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'snippet_video',
      hidden: ({document}) => !document?.isMarketingPage,
      group: 'info'
    }),
    defineField({
      name: 'formTitle',
      title: 'Form Title',
      type: 'snippet_locale-string',
      hidden: ({document}) => !document?.isMarketingPage,
      group: 'info'
    }),
    defineField({
      name: 'hubspotFormId',
      title: 'Hubpost Form ID',
      type: 'string',
      validation: Rule => 
        Rule.custom((id, context) => {
          if (context.document.isMarketingPage && !id) return 'Marketing pages must have a form id.'
          return true
        }
      ),
      hidden: ({document}) => !document?.isMarketingPage,
      group: 'info'
    }),
    defineField({
      name: 'globalSections',
      title: 'Sections',
      type: 'section_globalSections',
      group: 'content'
    }),
    defineField({
      name: 'addHeaderPadding',
      title: 'Add Header Padding',
      type: 'boolean',
      description: 'Add extra padding to account for the global header.',
      initialValue: false,
      group: 'content'
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
          // { 
          //   value: 'secondary',
          //   title: 'Secondary'
          // },
          { 
            value: 'invert',
            title: 'Inverted'
          },
          // { 
          //   value: 'brand',
          //   title: 'Brand'
          // }
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
    defineField({
      name: 'showPreloader',
      title: 'Show Preloader',
      type: 'boolean',
      initialValue: false,
      group: 'content'
    }),
    defineField({
      name: 'metafields',
      title: 'Metafields',
      type: 'snippet_locale-SEO-fields',
      group: 'seo'
    }),
  ],

  preview: {
    select: {
      title: 'title.text',
      subtitle: 'slug.current'
    },
    prepare(selection) {
      // const {author} = selection
      return {...selection}
    },
  },
})
