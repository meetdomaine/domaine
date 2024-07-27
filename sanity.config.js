// sanity.config.ts
import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {media} from 'sanity-plugin-media'
import {muxInput} from 'sanity-plugin-mux-input'
import {colorInput} from '@sanity/color-input'
import { inlineSvgInput } from '@focus-reactive/sanity-plugin-inline-svg-input'


// import React from 'react'


import { structure } from './domaine-cms/schemaTypes/structure'
import { schemaTypes } from './domaine-cms/schemaTypes'
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'


export default defineConfig({
  name: 'domaine-cms',
  title: 'Domaine CMS',
  projectId: 'cxeknc6v',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: structure
    }),
    muxInput(),
    presentationTool({
      previewUrl: 'http://localhost:4321/'
    }),
    vercelDeployTool(),
    colorInput(),
    media(),
    inlineSvgInput(),
  ],
  schema: {
    types: schemaTypes,
  },
})