import {defineField, defineType} from 'sanity'
import {EnvelopeIcon, RobotIcon} from '@sanity/icons'

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
    // defineField({
    //   name: 'hubspotFormId',
    //   title: 'Hubspot Form ID',
    //   type: 'string',
    // }),
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
    // defineField({
    //   name: 'brandMenuLabel',
    //   title: 'Brand Menu: Label',
    //   type: 'string',
    // }),
    defineField({
      name: 'brandMenuBrands',
      title: 'Brand Menu: Brands',
      type: 'array',
      of: [{
        name: 'brand',
        title: 'Brand',
        type: 'object',
        fields: [
          {
            name: 'label',
            title: 'Label',
            type: 'string'
          },
          {
            name: 'title',
            title: 'Brand Title',
            type: 'string'
          },
          {
            name: 'logo',
            title: 'Logo',
            type: 'inlineSvg',
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title',
            }
          },
          {
            name: 'heading',
            title: 'Heading',
            type: 'string'
          },
          // {
          //   name: 'brandImage',
          //   title: 'Brand Image',
          //   type: 'snippet_image'
          // },
          {
            name: 'media',
            title: 'Media',
            type: 'snippet_video'
          },
          {
            name: 'isPrimaryBrand',
            title: 'Primary Brand',
            type: 'boolean',
            initialValue: false
          }
        ],
        preview: {
          select: {
            title: 'title',
            heading: 'heading'
          },
          prepare(selection) {
            const { title, heading } = selection
            return {
              title: title,
              subtitle: heading,
              media: RobotIcon
            }
          }
        }
      }]
    }),
    // defineField({
    //   name: 'processConsentMessage',
    //   title: 'Checkbox Text: Consent to Process',
    //   type: 'string',
    // }),
    // defineField({
    //   name: 'marketingConsentMessage',
    //   title: 'Checkbox Text: Marketing Consent',
    //   type: 'string',
    // }),
  ],
})
