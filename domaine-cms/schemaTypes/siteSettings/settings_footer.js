import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings_footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
        name: 'linkColumns',
        title: 'Links Columns',
        type: 'array',
        of: [{
            type: 'object',
            fields: [
                {
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                },
                {
                    name: 'links',
                    title: 'Links',
                    type: 'snippet_link-list',
                }
            ]
        }],
        validation: Rule => Rule.max(3),
    }),
    // defineField({
    //   name: 'footerLinks',
    //   title: 'Footer Links',
    //   type: 'snippet_link-list',
    // }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'snippet_link-list',
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal Links',
      type: 'snippet_link-list',
    }),
    defineField({
        name: 'seoDescription',
        title: 'SEO Description',
        type: 'text',
    }),
  ],
})
