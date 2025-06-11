// load-query.ts
import {type QueryParams} from 'sanity'
import {sanityClient} from 'sanity:client'

const visualEditingEnabled = import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === 'true'
const token = import.meta.env.PUBLIC_SANITY_API_READ_TOKEN

// Debug logging (remove after fixing)
if (visualEditingEnabled) {
  console.log('Visual editing enabled, token present:', !!token)
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

  // For build-time content collections, optimize performance even in visual editing mode
  const isBuildTime = typeof window === 'undefined'
  const optimizeForBuild = visualEditingEnabled && isBuildTime

  const {result, resultSourceMap} = await sanityClient.fetch(query, params ?? {}, {
    filterResponse: false,
    perspective: visualEditingEnabled ? "drafts" : "published",
    // Reduce overhead during build time by disabling source maps and stega
    resultSourceMap: optimizeForBuild ? false : (visualEditingEnabled ? 'withKeyArraySelector' : false),
    stega: optimizeForBuild ? false : visualEditingEnabled,
    ...(visualEditingEnabled ? {token} : {}),
    // Use CDN for build performance, direct API for runtime visual editing
    useCdn: optimizeForBuild ? true : !visualEditingEnabled,
  })

  return {
    data: result,
    sourceMap: resultSourceMap,
    perspective,
  }
}