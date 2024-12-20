import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings_footer',
  title: 'Footer',
  type: 'document',
  fields: [

    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'snippet_button',
    }),
    defineField({
      name: 'showIcon',
      title: 'Show Dot Illustration',
      type: 'boolean',
      initialValue: false,
    }),
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
    defineField({
      name: 'agencyBrandsHeading',
      title: 'Agency Brands: Heading',
      type: 'string',
    }),
    defineField({
      name: 'practicesHeading',
      title: 'Practices: Heading',
      type: 'string',
    }),
    defineField({
      name: 'newsletterHeading',
      title: 'Newsletter: Heading',
      type: 'string',
    }),
    defineField({
      name: 'newsletterHubspotFormId',
      title: 'Newsletter: Hubspot Form ID',
      type: 'string',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Social Link: Instagram',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel'],
        allowRelative: false
      }),
    }),
    defineField({
      name: 'twitterUrl',
      title: 'Social Link: Twitter',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel'],
        allowRelative: false
      }),
    }),
    defineField({
      name: 'linkedInUrl',
      title: 'Social Link: LinkedIn',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel'],
        allowRelative: false
      }),
    }),
    defineField({
      name: 'emailAddress',
      title: 'Contact Email',
      type: 'email',
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal Links',
      type: 'snippet_link-list',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
    }),
    // defineField({
    //     name: 'seoDescription',
    //     title: 'SEO Description',
    //     type: 'text',
    // }),
  ],
})
