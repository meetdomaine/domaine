import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings_header-studio',
  title: 'Studio Header',
  type: 'document',
  fields: [
    defineField({
      name: 'navigationLinks',
      title: 'Navigation Links',
      type: 'snippet_link-list',
    }),
  ],
})
