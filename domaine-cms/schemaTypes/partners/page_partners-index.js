import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page_partners-index',
  title: 'Partners Index',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'snippet_locale-string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'snippet_locale-string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroMedia',
      title: 'Hero Media',
      type: 'snippet_video',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      description: 'Formerly called Text',
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'formHeading',
      title: 'Form: Heading',
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'formText',
      title: 'Form: Text',
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'hubspotFormId',
      title: 'Form: Hubspot Form ID',
      type: 'string',
    }),
    defineField({
      name: 'metafields',
      title: 'Metafields',
      type: 'snippet_locale-SEO-fields',
    }),
    defineField({
      name: 'globalSections',
      title: 'Sections',
      type: 'section_globalSections',
    })
  ],

  preview: {
    select: {
      title: 'title.text', 
    },
  },
})
