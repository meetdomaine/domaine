import {defineField, defineType} from 'sanity'
import { iconServiceGroups } from '../variables'
import { orderRankField } from '@sanity/orderable-document-list'

export default defineType({
  name: 'type_serviceGroup',
  title: 'Service Group',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'snippet_locale-string',
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
      name: 'isHidden',
      title: 'Hidden',
      description: 'Removes internal links to the Service Group page, but keeps the page live.',
      type: 'boolean',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'serviceType',
      title: 'Service Type',
      type: 'reference',
      to: [{ type: 'type_serviceType' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'agencyBrands',
      title: 'Agency Brands',
      type: 'array',
      of: [{
        name: 'agencyBrand',
        title: 'Brand',
        type: 'reference',
        to: [{ type: 'type_agencyBrand'}]
      }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      description: 'Used in Services section.',
      type: 'array',
      of: [{ type: 'snippet_image' }],
    }),
    defineField({
      name: 'pageSectionsDomaine',
      title: 'Page Sections: Domaine',
      type: 'section_globalSections',
      // of: [ {type: 'section_globalSections'} ]
    }),
    defineField({
      name: 'pageSectionsStudio',
      title: 'Page Sections: Studio',
      type: 'section_globalSections',
    }),
    defineField({
      name: 'metafields',
      title: 'Metafields',
      type: 'snippet_SEO-fields',
    }),
    // defineField({
    //   name: 'formHeading',
    //   title: 'Form: Heading',
    //   type: 'string',
    //   validation: Rule => Rule.required()
    // }),
    // defineField({
    //   name: 'formText',
    //   title: 'Form: Text',
    //   type: 'string',
    // }),
    // defineField({
    //   name: 'hubspotFormId',
    //   title: 'Form: Hubspot ID',
    //   type: 'string',
    //   validation: Rule => Rule.required()
    // }),
    orderRankField({ type: 'type_serviceGroup'}),
  ],

  preview: {
    select: {
      title: 'title.text',
      type: 'serviceType.title.text'
    },
    prepare(selection) {
      return {
        ...selection, 
        subtitle: selection.type,
        media: iconServiceGroups
      }
    }
  },
})
