import {defineType, defineArrayMember} from 'sanity'
import {PlayIcon, ImageIcon, BellIcon, EnvelopeIcon, JsonIcon, ImagesIcon, ErrorOutlineIcon, StackCompactIcon } from '@sanity/icons'


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
        type: 'snippet_image',
        icon: ImageIcon,
        validation: Rule => Rule.required(),
        preview: {
          select: {
            title: 'inlineImage.alt',
            subtitle: 'Image',
            media: 'inlineImage.image'
          },
        }
    }),
    defineArrayMember({
      name: 'imageGallery',
      title: 'Image Gallery',
      type: 'object',
      icon: ImagesIcon,
      fields: [{
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [{ type: 'snippet_image' }],
        validation: Rule => Rule.required()
      }],
      preview: {
        select: {
          media: 'images.0.image'
        },
        prepare(selection) {
          const { media } = selection
          return {
            title: 'Image Gallery',
            media: media
          }
        }
      }
    }),
    defineArrayMember({
      name: 'callToAction',
      title: 'Call to Action',
      icon: ErrorOutlineIcon,
      type: 'object',
      fields: [
          {
            name: 'heading',
            title: 'Heading',
            type: 'string',
            validation: Rule => Rule.required()
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
            validation: Rule => Rule.required()
          },
      ],
      preview: {
        select: {
          title: 'heading'
        },
        prepare(selection) {
          const { title } = selection
          return {
            title: title,
            subtitle: 'Call to Action',
            media: BellIcon
          }
        }
      }
    }),
    defineArrayMember({
      name: 'form',
      title: 'Form',
      icon: EnvelopeIcon,
      type: 'object',
      fields: [
          {
            name: 'heading',
            title: 'Heading',
            type: 'string',
            validation: Rule => Rule.required(),
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
            validation: Rule => Rule.required(),
          },
      ],
      preview: {
        select: {
          title: 'heading'
        },
        prepare(selection) {
          const { title } = selection
          return {
            title: title,
            subtitle: 'Form',
            media: EnvelopeIcon
          }
        }
      }
    }),
    defineArrayMember({
      name: 'table',
      title: 'Table',
      icon: StackCompactIcon,
      type: 'object',
      fields: [
        {
          // Include the table as a field
          // Giving it a semantic title
          name: 'table',
          title: 'Table',
          type: 'table',
        },
        {
          // Include the table as a field
          // Giving it a semantic title
          name: 'enableHeaderRow',
          title: 'Header Row',
          description: 'Highlight the top row of the table.',
          type: 'boolean',
        },
        {
          // Include the table as a field
          // Giving it a semantic title
          name: 'enableHeaderColumn',
          title: 'Header Column',
          description: 'Highlight the first column of the table.',
          type: 'boolean',
        },
      ],
      // preview: {
      //   select: {
      //     subtitle: 'videoId'
      //   },
      //   prepare(selection) {
      //     const { subtitle } = selection
      //     return {
      //       title: 'YouTube Embed',
      //       subtitle: subtitle,
      //       icon: PlayIcon
      //     }
      //   }
      // }
    }),
    defineArrayMember({
      name: 'youTubeEmbed',
      title: 'YouTube Embed',
      icon: PlayIcon,
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
      icon: JsonIcon,
      fields: [
        {
          name: 'markup',
          title: 'Markup',
          type: 'text',
          validation: Rule => Rule.required(),
        }
      ],
      preview: {
        prepare() {
          return {
            title: 'Schema Markup',
            subtitle: 'For SEO purposes',
            icon: JsonIcon
          }
        }
      }
    }),
  ],
})
