import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings_footer',
  title: 'Footer',
  type: 'document',
  fields: [

    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'snippet_locale-button',
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
                    type: 'snippet_locale-string',
                },
                {
                    name: 'links',
                    title: 'Links',
                    type: 'snippet_locale-link-list',
                }
            ],
            preview: {
              select: {
                title: 'title.text'
              }
            }
        }],
        validation: Rule => Rule.max(3),
    }),
    defineField({
      name: 'agencyBrandsHeading',
      title: 'Agency Brands: Heading',
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'practicesHeading',
      title: 'Practices: Heading',
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'newsletterHeading',
      title: 'Newsletter: Heading',
      type: 'snippet_locale-string',
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
      name: 'emailLabel',
      title: 'Email Label',
      description: 'If none added, will use the email address.',
      type: 'string',
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      description: 'No country code needed.',
      type: 'number',
    }),
    defineField({
      name: 'phoneNumberLabel',
      title: 'Phone Number Label',
      description: 'If none added, will use the phone number.',
      type: 'string',
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal Links',
      type: 'snippet_locale-link-list',
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
