// sanity.config.ts
import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {media} from 'sanity-plugin-media'


import { structure } from './domaine-cms/schemaTypes/structure'
import { schemaTypes } from './domaine-cms/schemaTypes'

export default defineConfig({
  name: 'domaine-cms',
  title: 'Domaine CMS',
  projectId: 'cxeknc6v',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: structure
    }),
    media(),
    // presentationTool({
    //   previewUrl: 'http://localhost:4321/staging/'
    // }),
  ],
  schema: {
    types: schemaTypes,
  },
})