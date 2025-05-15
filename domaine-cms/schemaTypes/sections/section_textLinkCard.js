import {defineField, defineType} from 'sanity'
import {InfoOutlineIcon} from '@sanity/icons'
import { iconStat } from '../variables'


export default defineType({
  name: 'section_textLinkCard',
  title: 'Text + Link Card',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'showSection',
      title: 'Show Section',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'snippet_locale-string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'snippet_locale-text',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'number',
            title: 'Number',
            type: 'snippet_locale-string',
            validation: Rule => Rule.required()
          },
          {
            name: 'label',
            title: 'Label',
            type: 'snippet_locale-string',
            validation: Rule => Rule.required()
          }
        ],
        preview: {
          select: {
            title: 'number.text',
            subtitle: 'label.text'
          },
          prepare(selection){
            return {
              ...selection,
              icon: iconStat
            }
          }
        }
      }]
    }),
    defineField({
      name: 'linkCardHeading',
      title: 'Link Card: Heading',
      type: 'snippet_locale-string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'linkCardImage',
      title: 'Link Card: Image',
      type: 'snippet_image',
      // validation: Rule => Rule.required()
    }),
    defineField({
      name: 'linkCardURL',
      title: 'Link Card: URL',
      type: 'url',
      validation: Rule => Rule.required().uri({
        scheme: ['http', 'https'],
        allowRelative: true,
      })
    }),
    defineField({
      name: 'linkCardIsJumplink',
      title: 'Link Card: Jumplink',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'linkCardColor',
      title: 'Link Card: Color',
      type: 'color',
      // validation: Rule => Rule.required()
    }),
    defineField({
      name: 'linkCardTextColor',
      title: 'Link Card: Text Color',
      type: 'string',
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
      name: 'orientation',
      title: 'Orientation',
      type: 'string',
      options: {
        list: [
          { title: "Horizontal", value: "horizontal" },
          { title: "Vertical", value: "vertical" },
        ],
        layout: 'radio'
      },
      initialValue: "horizontal",
    }),
    defineField({
      name: 'imageWidth',
      title: 'Image Width',
      description: 'Width of image in container (%).',
      type: 'number',
      initialValue: 25,
    }),
  ],

  preview: {
    select: {
      title: 'heading.text', 
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title,
        subtitle: 'Text + Link Card',
        icon: InfoOutlineIcon
      }
    }
  },
})
