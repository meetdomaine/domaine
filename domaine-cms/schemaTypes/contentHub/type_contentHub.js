import { orderRankField } from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'
import { iconContentHubPage } from '../variables'

export default defineType({
  name: 'type_contentHub',
  title: 'Content Hub',
  type: 'document',
  icon: iconContentHubPage,
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
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.text',
      },
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contentHubIndex',
      title: 'Content Hub',
      type: 'reference',
      to: [{type: 'type_contentHub-index'}],
      validation: (Rule) => Rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'snippet_locale-string',
      group: 'hero',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'snippet_video',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'snippet_locale-text',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'snippet_locale-string',
      group: 'content',
      description: 'Label for the button on the content hub index. Usually "Learn More" or similar.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'globalSections',
      title: 'Content Sections',
      type: 'section_globalSections',
      group: 'content',
    }),
    defineField({
      name: 'metafields',
      title: 'Metafields',
      type: 'snippet_locale-SEO-fields',
      group: 'seo',
    }),
    orderRankField({ type: 'type_contentHub', newItemPosition: "before"}),
  ],
  preview: {
    select: {
      title: 'title.text', 
      // subtitle: 'contentHubIndex->title.text',
    }
  },
})
