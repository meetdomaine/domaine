import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page_home-domaine',
  title: 'Domaine Home',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
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
  ],

  preview: {
    select: {
      title: 'title', 
    },
  },
})
