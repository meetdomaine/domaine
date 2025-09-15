import {defineField, defineType} from 'sanity'
import { iconAward, iconProjects, iconStat } from '../variables'
import { orderRankField } from '@sanity/orderable-document-list'

export default defineType({
  name: 'type_project',
  title: 'Project',
  type: 'document',
  icon: iconProjects,
  groups: [
    {
      name: 'info',
      title: 'Info',
    },
    {
      name: 'media',
      title: 'Media',
    },
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'info',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'info',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isHidden',
      title: 'Hidden',
      type: 'boolean',
      group: 'info',
      initialValue: false,
      description: 'Hides the project from listing on site. Hidden projects can still be accessed directly via their url.'
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'snippet_locale-string',
      group: 'info',
      description: 'Description on project cards.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'snippet_locale-string',
      group: 'info',
      description: 'Project page heading.'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'snippet_locale-text',
      group: 'info',
      description: 'Project page main description.'
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
      group: 'info',
      description: 'Project page background color.',
      options: {
        disableAlpha: true
      },
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'color',
      group: 'info',
      description: 'Optional accent color.',
      options: {
        disableAlpha: true
      },
    }),
    defineField({
      name: 'foregroundColor',
      title: 'Foreground Color',
      type: 'string',
      group: 'info',
      description: 'Project page foreground color.',
      options: {
        list: [
          { title: "Light", value: "light" },
          { title: "Dark", value: "dark" },
        ],
        layout: 'radio'
      },
      initialValue: "dark",
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      group: 'info',
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https']
      })
    }),
    defineField({
      name: 'heroMedia',
      title: 'Hero Media',
      type: 'snippet_video',
      group: 'media',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnailMedia',
      title: 'Thumbnail Media',
      type: 'snippet_video',
      group: 'media',
      description: "Media for project card. Image is mandatory, video is optional. If you don't add an image the whole site will break :)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnailImageSecondary',
      title: 'Thumbnail Hover Image',
      type: 'snippet_image',
      group: 'media',
      description: 'Mobile screenshot taken at iPhone SE resolution.',
      // validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'reference',
      group: 'info',
      to: [{ type: 'type_client'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logoColor',
      title: 'Logo Color',
      type: 'string',
      group: 'media',
      description: 'Project card logo color.',
      options: {
        list: [
          { title: "Light", value: "light" },
          { title: "Dark", value: "dark" },
        ],
        layout: 'radio'
      },
      initialValue: "light",
    }),
    defineField({
      name: 'agencyBrand',
      title: 'Agency Brand',
      type: 'reference',
      to: [{ type: 'type_agencyBrand'}],
      group: 'info',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      description: 'Only allows for selection of services offered by the agency brand(s) selected.',
      of: [{
        title: 'Service',
        type: 'reference',
        to: [{ type: 'type_service'}],
        options: {
          filter: ({ document }) => {
            const agencyId = document?.agencyBrand?._ref;
            return {
              filter: '_type == "type_service" && references($agencyId)',
              params: { agencyId }
            };
          }
        }
      }],
      group: 'info',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{
        title: 'Feature',
        type: 'reference',
        to: [{ type: 'type_projectFeature'}],
      }],
      group: 'info',
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'reference',
      to: [{ type: 'type_industry'}],
      group: 'info',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'array',
      of: [{
        name: 'partner',
        title: 'Partner',
        type: 'reference',
        to: [{ type: 'type_partner'}],
      }],
      group: 'info',
    }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [{
        name: 'metric',
        title: 'Metric',
        type: 'object',
        fields: [
          {
            name: 'number',
            title: 'Number',
            type: 'snippet_locale-string',
          },
          {
            name: 'label',
            title: 'Label',
            type: 'snippet_locale-string',
          },
        ],
        preview: {
          select: {
            title: 'number.text',
            subtitle: 'label.text',
          },
          prepare(selection) {
            return {
              ...selection,
              media: iconStat,
            }
          }
        }
      }],
      group: 'info',
    }),
    defineField({
      name: 'awards',
      title: 'Awards',
      type: 'array',
      of: [{
        name: 'award',
        title: 'Award',
        type: 'object',
        fields: [
          {
            name: 'awardTitle',
            title: 'Award Title',
            type: 'snippet_locale-string',
          },
          {
            name: 'publication',
            title: 'Publication',
            type: 'snippet_locale-string',
          },
        ],
        preview: {
          select: {
            title: 'awardTitle.text',
            subtitle: 'publication.text',
          },
          prepare(selection) {
            return {
              ...selection,
              media: iconAward,
            }
          }
        }
      }],
      group: 'info',
    }),
    defineField({
      name: 'sections',
      title: 'Content Sections',
      type: 'array',
      of: [
        { type: 'section_contentBlocks'},
        { type: 'section_imageFullHeight'},
        { type: 'section_textColumns'},
        { type: 'section_textMediaBlocks'},
        { type: 'section_mediaCarousel'},
        { type: 'section_mediaFullbleed'},
        { type: 'section_quote'},
      ],
      group: 'content',
    }),
    defineField({
      name: 'globalSections',
      title: 'Global Sections',
      type: 'section_globalSections',
      group: 'content',
    }),
    defineField({
      name: 'metafields',
      title: 'Metafields',
      type: 'snippet_locale-SEO-fields',
      group: 'seo',
    }),
    orderRankField({ type: 'type_project', newItemPosition: "before"}),
  ],

  preview: {
    select: {
      title: 'title', 
      subtitle: 'agencyBrand.name',
      thumbnail: 'thumbnailMedia.image',
      hero: 'heroMedia.image',
    },
    prepare(selection) {
      const { title, subtitle, thumbnail } = selection
      return {
        title: title,
        subtitle: subtitle,
        media: thumbnail
      }
    }
  },
})
