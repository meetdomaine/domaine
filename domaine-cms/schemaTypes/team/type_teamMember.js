import { orderRankField } from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'
import { iconTeamMembers } from '../variables'

export default defineType({
  name: 'type_teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'snippet_locale-string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'snippet_locale-text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'snippet_image',
    }),
    // defineField({
    //   name: 'image',
    //   title: 'Image',
    //   type: 'image',
    //   options: {
    //     hotspot: true
    //   },
    //   validation: Rule => Rule.required(),
    // }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'reference',
      to: { type: 'type_teamDepartment'},
      validation: Rule => Rule.required()
    }),
    orderRankField({ type: 'type_teamMember'}),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'role.text',
      image: 'image.image'
    },
    prepare(selection) {
      return {
        ...selection,
        media: selection.image ? selection.image : iconTeamMembers,
      }
    }
  },
})
