import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page_home-studio',
  title: 'Studio Home',
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
      name: 'aboutEyebrow',
      title: 'About: Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'aboutHeading',
      title: 'About: Heading',
      type: 'string',
    }),
    defineField({
      name: 'aboutSubheading',
      title: 'About: Subheading',
      type: 'string',
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
