import {defineField, defineType} from 'sanity'
import { iconPractices } from '../variables'
import {UlistIcon, LinkIcon, BlockquoteIcon} from '@sanity/icons'


export default defineType({
  name: 'section_quote',
  title: 'Quote',
  type: 'document',
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: 'showSection',
      title: 'Show Section',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'snippet_locale-text',
      description: "Don't include the quotation marks.",
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'snippet_locale-string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'authorInfo',
      title: 'Author Info',
      type: 'snippet_locale-string',
    }),
    defineField({
      name: 'quoteImage',
      title: 'Quote Image',
      type: 'snippet_image',
      // validation: Rule => Rule.required()
    }),
  ],
  preview: {
    select: {
      title: 'quote.text',
      subtitle: 'author.text',
      media: 'quoteImage.image'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: title,
        subtitle: 'Quote',
        media: BlockquoteIcon,
      }
    }
  },
})
