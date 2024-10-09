import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page_partners-index',
  title: 'Partners Index',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroMedia',
      title: 'Hero Media',
      type: 'snippet_video',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
    }),
    defineField({
      name: 'formHeading',
      title: 'Form: Heading',
      type: 'string',
    }),
    defineField({
      name: 'formText',
      title: 'Form: Text',
      type: 'string',
    }),
    defineField({
      name: 'hubspotFormId',
      title: 'Form: Hubspot Form ID',
      type: 'string',
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
