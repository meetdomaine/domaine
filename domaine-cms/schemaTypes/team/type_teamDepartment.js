import { orderRankField } from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'
import { iconTeamDepartments } from '../variables'

export default defineType({
  name: 'type_teamDepartment',
  title: 'Department',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    orderRankField({ type: 'type_teamDepartment'})
  ],

  preview: {
    select: {
      title: 'title', 
    },
    prepare(selection) {
        return {
            ...selection,
            subtitle: 'Department',
            media: iconTeamDepartments,
        }
    }
  },
})
