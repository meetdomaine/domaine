import {defineField, defineType} from 'sanity'
import { iconAward, iconClientStages, iconProjects, iconStat } from '../variables'
import { orderRankField } from '@sanity/orderable-document-list'

// DEPRECATED
export default defineType({
  name: 'type_clientStage',
  title: 'Stage',
  type: 'document',
  icon: iconClientStages,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    orderRankField({ type: 'type_clientStage'}),
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title,
        subtitle: "Client Stage",
        media: iconClientStages
      }
    }
  },
})
