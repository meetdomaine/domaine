// load-query.ts
import {type QueryParams} from 'sanity'
import {sanityClient} from 'sanity:client'
import { getEnv } from './getEnv'

const visualEditingEnabled = getEnv('PUBLIC_SANITY_VISUAL_EDITING_ENABLED') === 'true'
const token = getEnv('PUBLIC_SANITY_API_READ_TOKEN')

export async function loadQuery<QueryResponse>({
  query,
  params,
}: {
  query: string
  params?: QueryParams
}) {
  if (visualEditingEnabled && !token) {
    throw new Error(
      'The `SANITY_API_READ_TOKEN` environment variable is required during Visual Editing.',
    )
  }

  const perspective = visualEditingEnabled ? 'drafts' : 'published'

  const {result, resultSourceMap} = await sanityClient.fetch(query, params ?? {}, {
    filterResponse: false,
    perspective,
    resultSourceMap: visualEditingEnabled ? 'withKeyArraySelector' : false,
    stega: visualEditingEnabled,
    useCdn: !visualEditingEnabled,
    ...(visualEditingEnabled ? {token} : {}),
  })

  return {
    data: result,
    sourceMap: resultSourceMap,
    perspective,
  }
}