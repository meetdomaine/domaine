// load-query.ts
import {type QueryParams} from 'sanity'
import {sanityClient} from 'sanity:client'

const visualEditingEnabled = import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === 'true'
const token = import.meta.env.PUBLIC_SANITY_API_READ_TOKEN

// Debug logging (remove after fixing)
if (visualEditingEnabled) {
  console.log('Visual editing enabled, token present:', !!token)
} else {
  console.log('NO VIZ ED')
}

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
    resultSourceMap: visualEditingEnabled ? "withKeyArraySelector" : false,
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