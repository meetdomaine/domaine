// load-query.ts
import {type QueryParams} from 'sanity'
import {sanityClient} from 'sanity:client'
const { env } = Astro.locals.runtime;

const visualEditingEnabled = env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === 'true'
const token = env.SANITY_API_READ_TOKEN

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
    perspective: visualEditingEnabled ? "previewDrafts" : "published",
    resultSourceMap: visualEditingEnabled ? 'withKeyArraySelector' : false,
    stega: visualEditingEnabled,
    ...(visualEditingEnabled ? {token} : {}),
    useCdn: !visualEditingEnabled,
  })

  return {
    data: result,
    sourceMap: resultSourceMap,
    perspective,
  }
}