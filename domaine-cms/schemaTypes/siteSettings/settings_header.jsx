import {defineField, defineType} from 'sanity'
import {EnvelopeIcon, RobotIcon, EarthAmericasIcon} from '@sanity/icons'

export default defineType({
  name: 'settings_header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'navigationLinks',
      title: 'Navigation Links',
      type: 'snippet_link-list',
    }),
    defineField({
      name: 'contactForms',
      title: 'Contact Forms',
      description: 'Note: These forms fields are not managed by Hubspot and can be adjusted in the frontend code.',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string'
          },
          {
            name: 'hubspotFormId',
            title: 'Hubspot Form ID',
            description: 'Form will send POST request to Hubspot API with this form ID.',
            type: 'string'
          }
        ],
        preview: {
          select: {
            title: 'title'
          },
          prepare(selection) {
            const { title } = selection
            return {
              title: title,
              icon: EnvelopeIcon
            }
          }
        }
      }]
    }),
    defineField({
      name: 'brandMenuHeading',
      title: 'Brand Menu: Heading',
      type: 'string',
    }),
    defineField({
      name: 'brandMenuSubheading',
      title: 'Brand Menu: Subheading',
      type: 'string',
    }),
    defineField({
      name: 'showPromoMessage',
      title: 'Show Promo Message',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'promoMessage',
      title: 'Promo Message: Text',
      type: 'string',
      description: 'Optional promo message bar in Notification menu.',
      hidden: ({document}) => !document?.showPromoMessage
    }),
    defineField({
      name: 'promoMessageUrl',
      title: 'Promo Message: URL',
      type: 'url',
      description: 'Optional link for promo message.',
      validation: Rule => Rule.uri({
        allowRelative: true,
        scheme: ['http', 'https']
      }),
      hidden: ({document}) => !document?.showPromoMessage
    }),
    defineField({
      name: 'promoMessageIcon',
      title: 'Promo Message: Icon',
      type: 'string',
      description: 'Optional icon for promo message.',
      hidden: ({document}) => !document?.showPromoMessage,
    }),
    defineField({
      name: 'locationClocks',
      title: 'Clocks',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'type_location'}]
      }],
      validation: Rule => Rule.max(3)
    }),
    defineField({
      name: 'showLinkCard',
      title: 'Show Link Card',
      type: 'boolean',
    }),
    defineField({
      name: 'linkCardTitle',
      title: 'Link Card: Title',
      type: 'string',
      hidden: ({document}) => !document?.showLinkCard,
    }),
    defineField({
      name: 'linkCardText',
      title: 'Link Card: Text',
      type: 'string',
      hidden: ({document}) => !document?.showLinkCard,
    }),
    defineField({
      name: 'linkCardImage',
      title: 'Link Card: Image',
      type: 'snippet_image',
      hidden: ({document}) => !document?.showLinkCard,
    }),
    defineField({
      name: 'linkCardUrl',
      title: 'Link Card: URL',
      type: 'url',
      validation: Rule => Rule.uri({
        allowRelative: true,
        scheme: ['http', 'https']
      }),
      hidden: ({document}) => !document?.showLinkCard,
    }),
    defineField({
      name: 'linkCardNewTab',
      title: 'Link Card: New Tab',
      type: 'boolean',
      hidden: ({document}) => !document?.showLinkCard,
    }),
    defineField({
      name: 'showCareers',
      title: 'Show Careers',
      type: 'boolean',
    }),
    defineField({
      name: 'careersHeading',
      title: 'Careers: Heading',
      type: 'string',
      hidden: ({document}) => !document?.showCareers,
    }),
    defineField({
      name: 'careersSubheading',
      title: 'Careers: Subheading',
      type: 'string',
      hidden: ({document}) => !document?.showCareers,
    }),
    defineField({
      name: 'careersUrl',
      title: 'Careers: URL',
      type: 'url',
      validation: Rule => Rule.uri({
        allowRelative: true,
        scheme: ['http', 'https']
      }),
      hidden: ({document}) => !document?.showCareers,
    }),
    defineField({
      name: 'careersNewTab',
      title: 'Careers: New Tab',
      type: 'boolean',
      hidden: ({document}) => !document?.showCareers,
    }),
    defineField({
      name: 'showBlog',
      title: 'Show Blog',
      type: 'boolean',
    }),
  ],
})
