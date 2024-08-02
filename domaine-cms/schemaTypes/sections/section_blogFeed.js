import {defineField, defineType} from 'sanity'
import { iconBlog } from '../variables'

export default defineType({
  name: 'section_blogFeed',
  title: 'Blog Feed',
  type: 'document',
  icon: iconBlog,
  fields: [
    defineField({
      name: 'showSection',
      title: 'Show Section',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'showHero',
      title: 'Show Section Hero',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featuredPost',
      title: 'Featured Post',
      type: 'reference',
      description: 'Main post in section. If none is added, will pull the most recent.',
      hidden: ({parent}) => !parent?.showHero,
      to: [{ type: 'type_blog'}],
    }),
    defineField({
      name: 'featuredCategory',
      title: 'Featured Category',
      type: 'reference',
      description: 'Defines sidebar posts. If none is added, will be hidden.',
      hidden: ({parent}) => !parent?.showHero,
      to: [{ type: 'type_blogCategory'}],
    }),
  ],
  preview: {
    select: {
      title: 'heading', 
    },
    prepare(selection) {
      return {
        ...selection,
        subtitle: 'Blog Feed',
        media: iconBlog
      }
    }
  },
})
