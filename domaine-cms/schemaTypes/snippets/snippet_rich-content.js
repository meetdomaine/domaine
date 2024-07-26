import {defineType, defineArrayMember} from 'sanity'
import {PlayIcon, ImageIcon} from '@sanity/icons'

export default defineType({
  title: 'Content',
  name: 'snippet_rich-content',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'H5', value: 'h5'},
        {title: 'H6', value: 'h6'},
        {title: 'Normal', value: 'normal'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'}
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: Rule => Rule.uri({
                  scheme: ['http', 'https', 'mailto', 'tel'],
                  allowRelative: true,
                })
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      name: 'inlineImage',
      title: 'Image',
      type: 'image',
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required(),
      preview: {
        select: {
          title: 'inlineImage.alt',
          media: 'inlineImage'
        },
      }
    }),
    defineArrayMember({
      name: 'imageGallery',
      title: 'Image Gallery',
      type: 'object',
      fields: [{
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [{
          name: 'image',
          title: 'Image',
          type: 'image',
          fields: [{
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: Rule => Rule.required()
          }]
        }]
      }]
    }),
    defineArrayMember({
      name: 'callToAction',
      title: 'Call to Action',
      type: 'object',
      fields: [
          {
            name: 'heading',
            title: 'Heading',
            type: 'string',
          },
          {
            name: 'subheading',
            title: 'Subeading',
            type: 'string',
          },
          {
            name: 'button',
            title: 'Button',
            type: 'snippet_button',
          },
      ]
    }),
    defineArrayMember({
      name: 'form',
      title: 'Form',
      type: 'object',
      fields: [
          {
            name: 'heading',
            title: 'Heading',
            type: 'string',
          },
          {
            name: 'subheading',
            title: 'Subeading',
            type: 'string',
          },
          {
            name: 'hubspotFormId',
            title: 'Hubspot Form ID',
            type: 'string',
          },
      ]
    }),
    defineArrayMember({
      name: 'youTubeEmbed',
      title: 'YouTube Embed',
      type: 'object',
      fields: [
        {
          name: 'videoId',
          title: 'Video ID',
          type: 'string',
          validation: Rule => Rule.required(),
        },
      ],
      preview: {
        select: {
          subtitle: 'videoId'
        },
        prepare(selection) {
          const { subtitle } = selection
          return {
            title: 'YouTube Embed',
            subtitle: subtitle,
            icon: PlayIcon
          }
        }
      }
    }),
    defineArrayMember({
      name: 'schema',
      title: 'Schema',
      type: 'object',
      fields: [
        {
          name: 'markup',
          title: 'Markup',
          type: 'text',
        }
      ]
    }),
  ],
})
