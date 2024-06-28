import {defineField, defineType} from 'sanity'
import { InlineSvgPreviewItem } from '@focus-reactive/sanity-plugin-inline-svg-input'

import { media } from 'sanity-plugin-media'

export default defineType({
  name: 'type_agencyBrand',
  title: 'Agency Brand',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Resolution: 64x64px.',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'inlineSvg',
    }),
    defineField({
      name: 'url',
      title: 'Root URL',
      type: 'url',
      validation: Rule => Rule.uri({
        allowRelative: true
      })
    }),
  ],
  preview: {
    select: {
      title: 'name',
      icon: 'logo',
    },
  },
  components: {
    preview: ({ icon, title }) => {
      return <InlineSvgPreviewItem icon={icon} title={title} subtitle={'test'} />
    },
  },
})
