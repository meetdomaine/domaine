import { createClient } from '@sanity/client';

export const GET = async ( context ) => {

  const { env } = context.locals.runtime;

  const sanityClient = createClient({
    projectId: env.SANITY_PROJECT_ID,
    dataset: 'production',
    useCdn: false, // set to `false` to bypass the edge cache
    apiVersion: '2025-09-05',
    token: env.SANITY_API_DEVELOPER_TOKEN,
  })

  return sanityClient
    .action({
      actionType: 'sanity.action.release.create',
      releaseId: 'staging',
      metadata: {
        title: 'Staging',
        releaseType: 'undecided',
      },
    })
    .then(() => {
      console.log('`staging` created')
      return new Response(
        JSON.stringify({
            status: 200,
            data: {
              message: 'Release created'
            }
        })
    )
    })
    .catch((err) => {
      console.error('Create release failed: ', err.message)
      return new Response(
        JSON.stringify({
            status: 500,
            data: {
              message: err.message
            }
        })
      )
    })

  // const test =

  // const sanityClient = createClient({
  //   projectId: 'cxeknc6v',
  //   dataset: 'production',
  //   token: getEnv('PUBLIC_SANITY_API_READ_TOKEN', context.locals)
  // })

  
}