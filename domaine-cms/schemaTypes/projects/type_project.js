import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'type_project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'reference',
      to: [{ type: 'type_client'}]
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{ type: 'type_agencyBrand'}]
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'reference',
      to: [{ type: 'type_industry'}]
    }),
  ],

  preview: {
    select: {
      title: 'title', 
      subtitle: 'brand.name'
    },
  },
  prepare(selection) {
    return {
      ...selection
    }
  }
})
