import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page_studio-general',
  title: 'Studio Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'globalSections',
      title: 'Sections',
      type: 'section_globalSections',
    }),
    defineField({
      name: 'addHeaderPadding',
      title: 'Add Header Padding',
      type: 'boolean',
      description: 'Add extra padding to account for the global header.',
      initialValue: false,
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
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      description: 'Avoid using this anywhere besides very specific brand pages.',
      type: 'color',
    }),
    defineField({
      name: 'showPreloader',
      title: 'Show Preloader',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'metafields',
      title: 'Metafields',
      type: 'snippet_SEO-fields',
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      // const {author} = selection
      return {...selection}
    },
  },
})
