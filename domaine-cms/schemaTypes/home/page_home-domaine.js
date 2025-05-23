import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page_home-domaine',
  title: 'Domaine Home',
  type: 'document',
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
    // defineField({
    //   name: 'eyebrow',
    //   title: 'Eyebrow',
    //   type: 'string',
    // }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'snippet_locale-string',
      group: 'hero',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      // type: 'string',
      type: 'snippet_locale-string',
      validation: Rule => Rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'snippet_locale-button',
      group: 'hero',
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'snippet_video',
      group: 'hero',
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
      group: 'hero',
    }),
    defineField({
      name: 'globalSections',
      title: 'Global Sections',
      type: 'section_globalSections',
      group: 'content',
    }),
    defineField({
      name: 'showPreloader',
      title: 'Show Preloader',
      type: 'boolean',
      initialValue: false,
      group: 'content',
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
      title: 'heading.text', 
    },
  },
})
