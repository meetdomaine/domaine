import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings_header-domaine',
  title: 'Domaine Header',
  type: 'document',
  fields: [
    defineField({
      name: 'navigationLinks',
      title: 'Navigation Links',
      type: 'snippet_link-list',
    }),
  ],
})
