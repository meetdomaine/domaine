# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is a dual-brand Astro website for Domaine Agency that serves both "Domaine" and "Studio" brands through a shared codebase. The site uses Astro for static site generation with hybrid rendering, Sanity as the headless CMS, and is deployed on Cloudflare Pages with Vercel as backup.

### Dual-Brand System
- **Domaine**: Main agency brand (`Brands.DOMAINE`)
- **Studio**: Creative services brand (`Brands.STUDIO`)
- Brand switching handled through layout files (`Layout-Domaine.astro`, `Layout-Studio.astro`)
- Content filtering by brand using `agencyBrand` references in CMS

### Key Directories
- `src/`: Main Astro application
- `domaine-cms/`: Sanity CMS configuration and schemas
- `src/layouts/`: Brand-specific layout components
- `src/components/`: Reusable UI components
- `domaine-cms/schemaTypes/`: Sanity schema definitions organized by content type

## Development Commands

```bash
# Main development
npm run dev              # Start dev server at localhost:4321 with host access
npm run build            # Production build with search indexing (uses 4GB memory)
npm run preview          # Preview production build via Wrangler
npm run astro            # Run Astro CLI commands

# CMS development (from domaine-cms/)
cd domaine-cms
npm run dev              # Start Sanity Studio at localhost:3333
npm run build            # Build Sanity Studio
npm run deploy           # Deploy Studio to Sanity
```

## Code Quality & Standards

### Performance & CPU Optimization
- **CRITICAL**: Never use `setInterval()` without proper cleanup - use `clearInterval()` in cleanup handlers
- **CRITICAL**: Always avoid spread operators (`...`) in Sanity queries - use explicit field selection
- Use `Promise.all()` for parallel database queries instead of sequential `await` calls
- Prefer server-side filtering in Sanity queries over client-side JavaScript filtering
- Use lightweight field queries (like `blogCardFields`) for list views instead of full content queries

### CMS Code Quality
The CMS has linting and formatting configured:
- ESLint with Sanity Studio config (`@sanity/eslint-config-studio`)
- Prettier with specific formatting rules (no semicolons, single quotes, 100 char width)
- No project-level linting/testing setup for main Astro app

## CMS Architecture

### Cached Content System
All CMS data is cached via `src/lib/cached-content.js` functions:
- `getServiceTypes()`, `getServiceGroups()`, `getServices()`: Service hierarchy
- `getProjects()`, `getProjectFeatures()`, `getProjectIndustries()`: Project/case study data
- `getBlogPosts()`, `getBlogCategories()`: Blog content with brand filtering
- `getPartners()`: Partner ecosystem data
- `getEvents()`, `getCareers()`: Event and career listings
- `getBrandSettings()`: Brand-specific configurations

### Schema Organization
Sanity schemas in `domaine-cms/schemaTypes/` are organized by:
- `sections/`: Reusable page sections for modular page building
- `pages/`: Page-specific schemas (home, about, services, etc.)
- `siteSettings/`: Global settings (header, footer, brands)
- `snippets/`: Reusable field groups with internationalization support

### Content Queries
- CMS queries defined in `src/lib/cms-queries.js` with optimized field selections
- Build-time data fetching via `src/lib/sanity-load-query.ts`
- Image optimization through `astro-sanity-picture`
- **Performance**: Use specific field queries (e.g., `blogCardFields`, `projectGridFields`) instead of full content for list views

## Rendering Strategy

The site uses conditional rendering modes:
- **Static** (default): All pages pre-rendered at build time
- **Server**: Dynamic rendering when visual editing is enabled (`PUBLIC_SANITY_VISUAL_EDITING_ENABLED=true`)
- Mode automatically switches between Cloudflare (static) and Vercel (server) adapters
- Visual editing requires server-side rendering for draft content access

## Environment Variables

Key environment variables:
- `PUBLIC_SANITY_API_READ_TOKEN`: Sanity API access token
- `PUBLIC_SANITY_VISUAL_EDITING_ENABLED`: Enable/disable visual editing mode
- `HUBSPOT_*`: Form integration credentials
- `GREENSOCK_AUTH_TOKEN`: GSAP licensing token

## Deployment

- **Primary**: Cloudflare Pages (automatic deploys from `staging`/`master` branches)
- **Secondary**: Vercel (GitHub integration as backup)
- Content deploys can be triggered directly from Sanity Studio
- Build process includes search indexing and asset optimization

## Animation & Interactions

- **GSAP**: Complex animations (`src/lib/gsap.js`) - requires auth token
- **Lenis**: Smooth scrolling (`src/lib/lenis.js`) - managed cleanup required
- **ViewportAnimation**: Component-based animations (`src/animation/ViewportAnimation.astro`)
- **Timer Functions**: Local time displays (`src/lib/get-local-time.ts`) - **CRITICAL**: Always use cleanup functions

## Search

- **Pagefind**: Static site search with build-time indexing
- Search index built during `npm run build` via `prebuild` script
- Brand-specific filtering integrated into search results

## Internationalization

- Multi-locale support: English (default), German (`de`), Dutch (`nl`)
- Configured in `astro.config.mjs` with locale routing
- Translation utilities in `src/lib/translations.js`
- Locale-specific content snippets in CMS schemas

## Technical Requirements

- **Node.js**: >= 22.13.1 (specified in package.json engines)
- **Framework**: Astro 5.8.0 with hybrid rendering and i18n
- **Adapters**: Cloudflare Pages (primary), Vercel (secondary)
- **UI Libraries**: 
  - SolidJS for interactive client components (`src/**/*`)
  - React for CMS admin interface (`domaine-cms/**/*`)
- **TypeScript**: Full TypeScript support with JSX preserve mode
- **CMS**: Sanity with Visual Editing, CDN caching, and build webhooks
- **Icons**: Astro Icon with custom icon set
- **Image Processing**: Astro Sanity Picture for optimization