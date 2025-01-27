import type { Loader, LoaderContext } from "astro/loaders";
import { z } from "astro:content";
import { sanityClient } from "sanity:client";

export function sanityLoader( options: { query: string } ): Loader {
  return {
    name: "sanity-loader",
    load: async (context: LoaderContext): Promise<void> => {
      const response = await sanityClient.fetch(options.query)

      context.logger.info('Loading Sanity content.')

      context.store.clear()
      for (const entry of response) {
        try {
          const data = await context.parseData({
            id: entry.id,
            data: entry,
          });

          if (!data) return context.logger.error('Sanity query error.')

          context.store.set({
            id: data.id,
            data: entry
          })

        } catch {
          context.logger.error('Error fetching Sanity content.')
        }
      }
    }
  }
}