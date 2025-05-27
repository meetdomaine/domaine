// sanity.config.ts
import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {media} from 'sanity-plugin-media'
import {muxInput} from 'sanity-plugin-mux-input'
import {colorInput} from '@sanity/color-input'
import { table } from '@sanity/table';
// import { inlineSvgInput } from '@focus-reactive/sanity-plugin-inline-svg-input'
import { structure } from './domaine-cms/schemaTypes/structure'
import { schemaTypes } from './domaine-cms/schemaTypes'
// import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'
import { webhooksTrigger } from 'sanity-plugin-webhooks-trigger'
import { resolve } from './src/lib/sanity-resolver'


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
    table({
      rowType: 'my-custom-row-type',
    }),
    // presentationTool({
    //   previewUrl: 'http://localhost:4322/'
    // }),
    // vercelDeployTool(),
    // inlineSvgInput(),
    colorInput(),
    media(),
    webhooksTrigger({
      title: 'Deploy',
      text: 'I am buggy, so you can ignore my error messages :)',
    }),
    presentationTool({
      previewUrl: location.origin
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})