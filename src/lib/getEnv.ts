// getEnv.ts
// Utility function to get environment variables with correct syntax based on adapter

export function getEnv(key: string, astroLocals?: any): string | undefined {
  const visualEditingEnabled = import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === 'true'
  
  // For visual editing (Vercel), use import.meta.env
  if (visualEditingEnabled) {
    return import.meta.env[key]
  }
  
  // For production (Cloudflare), use Astro.locals.runtime.env
  if (astroLocals?.runtime?.env) {
    return astroLocals.runtime.env[key]
  }
  
  // Fallback to import.meta.env if runtime not available
  return import.meta.env[key]
}