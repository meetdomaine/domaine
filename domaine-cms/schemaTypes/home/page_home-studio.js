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
      name: 'projects',
      title: 'Projects',
      description: 'Hero project cards.',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { 
            name: 'project',
            type: 'reference',
            to: [{type: 'type_project'}],
            validation: Rule => Rule.required()
          },
          {
            name: 'image',
            title: 'Image',
            type: 'snippet_image',
          }
        ],
        preview: {
          select: {
            title: 'project.title',
            media: 'image.image',
            fallbackMedia: 'project.thumbnailMedia.image'
          },
          prepare(selection) {
            const { title, media, fallbackMedia } = selection
            return {
              title: title,
              subtitle: 'Hero Project',
              media: media ? media : fallbackMedia,
            }
          }
        }
      }],
      validation: Rule => Rule.max(10),
    }),
    // defineField({
    //   name: 'heroTextColor',
    //   title: 'Hero Text Color',
    //   type: 'string',
    //   options: {
    //     list: [
    //       { title: "Light", value: "light" },
    //       { title: "Dark", value: "dark" },
    //     ],
    //     layout: 'radio'
    //   },
    //   initialValue: "light",
    // }),
    // defineField({
    //   name: 'aboutEyebrow',
    //   title: 'About: Eyebrow',
    //   type: 'string',
    // }),
    // defineField({
    //   name: 'aboutHeading',
    //   title: 'About: Heading',
    //   type: 'string',
    // }),
    // defineField({
    //   name: 'aboutSubheading',
    //   title: 'About: Subheading',
    //   type: 'string',
    // }),
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
