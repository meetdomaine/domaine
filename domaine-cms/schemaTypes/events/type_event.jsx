import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'type_event',
  title: 'Event',
  type: 'document',
  groups: [
    {
      name: 'info',
      title: 'Info',
    },
    {
      name: 'partners',
      title: 'Partners',
    },
    {
      name: 'speakers',
      title: 'Speakers',
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
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'info',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'snippet_locale-string',
      group: 'info',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'info',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'dateTime',
      title: 'Date & Time',
      type: 'datetime',
      group: 'info',
      options: {
        dateFormat: "MM-DD-YYYY",
        timeFormat: "HH:mm",
        timeStep: 15
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'timezone',
      title: 'Timezone',
      type: 'string',
      group: 'info',
      description: (() => (
        <p>Identifier from the <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones" target="_blank">TZ Database</a>. If none added, will assume <em>America/New_York</em></p>
      ))(),
      // validation: Rule => Rule.required()
    }),
    defineField({
      name: 'use24hourFormat',
      title: '24 Hour Format',
      type: 'boolean',
      group: 'info',
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'snippet_button',
      group: 'info',
    }),
    defineField({
      name: 'isVirtual',
      title: 'Virtual Event',
      type: 'boolean',
      group: 'info',
      initialValue: false,
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      description: 'Ex. Domaine Office',
      type: 'string',
      group: 'info',
      hidden: ({document}) => document?.isVirtual
    }),
    defineField({
      name: 'location',
      title: 'Location',
      description: 'Ex. New York City',
      type: 'string',
      group: 'info',
      hidden: ({document}) => document?.isVirtual,
    }),
    defineField({
      name: 'venueUrl',
      title: 'Venue URL',
      type: 'url',
      group: 'info',
      description: 'Optional URL of Google Map listing, website, etc.',
      validation: Rule => Rule.uri({
        scheme: ['https', 'http']
      })
    }),
    defineField({
      name: 'isPrivate',
      title: 'Private Event',
      description: 'Hides Event from public listing.',
      type: 'boolean',
      group: 'info',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'snippet_rich-content',
      group: 'info',
      // validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'snippet_image',
      group: 'info',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'partnersHeading',
      title: 'Partners: Heading',
      type: 'string',
      group: 'partners',
    }),
    defineField({
      name: 'partnersSubheading',
      title: 'Partners: Subheading',
      type: 'string',
      group: 'partners',
    }),
    defineField({
      name: 'partnerLogos',
      title: 'Partners: Logos',
      type: 'array',
      group: 'partners',
      of: [{ type: 'snippet_image'}]
    }),
    defineField({
      name: 'speakersHeading',
      title: 'Speakers: Heading',
      type: 'string',
      group: 'speakers',
    }),
    defineField({
      name: 'speakersSubheading',
      title: 'Speakers: Subheading',
      type: 'string',
      group: 'speakers',
    }),
    defineField({
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      group: 'speakers',
      of: [{ 
        type: 'object',
        fields: [
          {
            name: 'speakerImage',
            title: 'Headshot',
            type: 'snippet_image',
            validation: Rule => Rule.required()
          },
          {
            name: 'speakerName',
            title: 'Name',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'speakerRole',
            title: 'Role',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'speakerLogo',
            title: 'Logo',
            type: 'snippet_image',
          }
        ],
        preview: {
          select: {
            title: 'speakerName',
            subtitle: 'speakerRole',
            media: 'speakerImage.image'
          }
        }
      }]
    }),
    defineField({
      name: 'globalSections',
      title: 'Sections',
      group: 'content',
      type: 'section_globalSections',
    }),
    defineField({
      name: 'metafields',
      title: 'Metafields',
      type: 'snippet_SEO-fields',
      group: 'seo',
    }),
  ],

  preview: {
    select: {
      title: 'title.text',
      subtitle: 'venue',
      media: 'thumbnailImage.image'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: title,
        subtitle: subtitle,
        media: media
      }
    }
  },
})
