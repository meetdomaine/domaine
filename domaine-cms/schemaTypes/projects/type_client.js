import {defineField, defineType} from 'sanity'
// import { InlineSvgPreviewItem } from '@focus-reactive/sanity-plugin-inline-svg-input'
import { orderRankField } from '@sanity/orderable-document-list'

import { iconClients } from '../variables'
import { media } from 'sanity-plugin-media'

export default defineType({
  name: 'type_client',
  title: 'Client',
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
      // readOnly: true,
    }),
    
    // defineField({
    //   name: 'logoDark',
    //   title: 'Logo: Dark',
    //   description: 'A transparent PNG of the client logo that works on light backgrounds.',
    //   type: 'snippet_image',
    //   validation: Rule => Rule.required(),
    // }),
    // defineField({
    //   name: 'logoLight',
    //   title: 'Logo: Light',
    //   description: 'A transparent PNG of the client logo that works on dark backgrounds.',
    //   type: 'snippet_image',
    //   validation: Rule => Rule.required(),
    // }),
    // defineField({
    //   name: 'logoDark',
    //   title: 'Logo: Dark',
    //   description: 'A transparent PNG of the client logo that works on light backgrounds.',
    //   type: 'image',
    //   validation: Rule => Rule.required(),
    // }),
    // defineField({
    //   name: 'logoLight',
    //   title: 'Logo: Light',
    //   description: 'A transparent PNG of the client logo that works on dark backgrounds.',
    //   type: 'image',
    //   validation: Rule => Rule.required(),
    // }),
    defineField({
      name: 'productImage',
      title: 'Product Image',
      type: 'image',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      description: "SVG file using viewbox (no width or height). All fills should be set to 'currentColor'.",
      type: 'file',
      validation: Rule => Rule.required(),
    }),
    // defineField({
    //   name: 'logoWidthProjectCard',
    //   title: 'Logo Width: Project Card',
    //   description: "Width (%) of logo in project card. Max 50%.",
    //   initialValue: 50,
    //   type: 'number',
    //   validation: Rule => Rule.integer().greaterThan(0).max(50),
    // }),
    defineField({
      name: 'logoScale',
      title: 'Logo: Scale Offset',
      description: "DONT USE FOR NOW. Width offset (0-100%) for logo.",
      initialValue: 75,
      type: 'number',
      // deprecated: true,
      validation: Rule => Rule.integer().greaterThan(0).max(100),
    }),
    // defineField({
    //   name: 'agencyBrands',
    //   title: 'Agency Brands',
    //   type: 'array',
    //   of: [
    //     {
    //       name: 'agencyBrand',
    //       title: 'Agency Brand',
    //       type: 'reference',
    //       to: [{ type: 'type_agencyBrand'}]
    //     }
    //   ]
    // }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'isEnterprise',
      title: 'Enterprise Brand',
      type: 'boolean',
      initialValue: false,
    }),
    orderRankField({ type: 'type_client'}),
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'title',
      media: 'productImage',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: title,
        subtitle: subtitle,
        media: media ? media : iconClients,
      }
    }
  },
})
