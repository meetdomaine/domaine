import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page_home-domaine',
  title: 'Domaine Home',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'snippet_button',
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'snippet_video',
    }),
    defineField({
      name: 'heroTextColor',
      title: 'Hero Text Color',
      type: 'string',
      options: {
        list: [
          { title: "Light", value: "light" },
          { title: "Dark", value: "dark" },
        ],
        layout: 'radio'
      },
      initialValue: "light",
    }),
    defineField({
      name: 'globalSections',
      title: 'Global Sections',
      type: 'section_globalSections',
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
  },
})
