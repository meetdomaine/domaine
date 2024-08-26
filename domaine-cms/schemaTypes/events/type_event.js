import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'type_event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
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
      options: {
        dateFormat: "MM-DD-YYYY",
        timeFormat: "HH:mm",
        timeStep: 15
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      description: 'Ex. Domaine Office',
      type: 'string',
    }),
    defineField({
      name: 'venueLink',
      title: 'Venue Link',
      type: 'url',
      description: 'Optional URL of Google Map listing, website, etc.',
      validation: Rule => Rule.uri({
        scheme: ['https', 'http']
      })
    }),
    defineField({
      name: 'location',
      title: 'Location',
      description: 'Ex. New York City',
      type: 'string',
    }),
    defineField({
      name: 'inviteOnly',
      title: 'Invite Only',
      description: 'Hides Event from public listing.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'snippet_image',
      validation: Rule => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
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
