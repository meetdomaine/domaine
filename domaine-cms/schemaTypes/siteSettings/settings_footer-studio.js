import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings_footer-studio',
  title: 'Studio Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      type: 'snippet_link-list',
    }),
  ],
})
