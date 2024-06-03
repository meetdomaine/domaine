import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings_footer-domaine',
  title: 'Domaine Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      type: 'snippet_link-list',
    }),
  ],
})
