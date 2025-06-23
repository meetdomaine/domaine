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
npm run dev              # Start dev server at localhost:4321
npm run build            # Production build with pagefind indexing
npm run preview          # Preview production build
npm run index            # Rebuild pagefind search index

# Content preview with server-side rendering
npm run dev:content      # Build + serve via Wrangler for testing SSR

# CMS development (from domaine-cms/)
cd domaine-cms
npm run dev              # Start Sanity Studio at localhost:3333
npm run build            # Build Sanity Studio
npm run deploy           # Deploy Studio to Sanity
```

## Code Quality & Standards

### CMS Code Quality
The CMS has linting and formatting configured:
- ESLint with Sanity Studio config (`@sanity/eslint-config-studio`)
- Prettier with specific formatting rules (no semicolons, single quotes, 100 char width)
- No project-level linting/testing setup for main Astro app

## CMS Architecture

### Content Collections
The site fetches all CMS data at build time via Sanity client integration. Key content types:
- `services`, `serviceGroups`, `serviceTypes`: Service hierarchy
- `projects`: Case studies with brand filtering
- `blogPosts`, `blogCategories`: Blog content
- `partners`, `partnerTiers`: Partner ecosystem
- `pages`: General/marketing pages
- `brandSettings`: Brand-specific configurations

### Schema Organization
Sanity schemas in `domaine-cms/schemaTypes/` are organized by:
- `sections/`: Reusable page sections for modular page building
- `pages/`: Page-specific schemas (home, about, services, etc.)
- `siteSettings/`: Global settings (header, footer, brands)
- `snippets/`: Reusable field groups with internationalization support

### Content Queries
- CMS queries defined in `src/lib/cms-queries.js`
- Build-time data fetching via `src/lib/sanity-load-query.ts`
- Image optimization through `astro-sanity-picture`

## Rendering Strategy

The site uses conditional rendering modes:
- **Static** (default): All pages pre-rendered at build time
- **Server**: Dynamic rendering when visual editing is enabled (`PUBLIC_SANITY_VISUAL_EDITING_ENABLED=true`)
- Mode automatically switches between Cloudflare (static) and Vercel (server) adapters
- Visual editing requires server-side rendering for draft content access

## Environment Variables

Key environment variables (see `.env`):
- `PUBLIC_SANITY_API_READ_TOKEN`: Sanity API access
- `PUBLIC_SANITY_VISUAL_EDITING_ENABLED`: Enable/disable visual editing
- `SERVER_RENDERING_ENABLED`: Toggle between static/server rendering
- `HUBSPOT_*`: Form integration credentials
- `GREENSOCK_AUTH_TOKEN`: GSAP licensing

## Deployment

- **Primary**: Cloudflare Pages (automatic deploys from `staging`/`master` branches)
- **Secondary**: Vercel (GitHub integration for `staging.meetdomaine.com` and `meetdomaine.com`)
- Content deploys can be triggered directly from Sanity Studio

## Animation & Interactions

- GSAP for complex animations (`src/lib/gsap.js`)
- Lenis for smooth scrolling (`src/lib/lenis.js`)
- View animations via `src/animation/ViewportAnimation.astro`

## Search

- Pagefind for static site search
- Indexes built during production build process
- Search components reference collections via brand filtering

## Internationalization

- Multi-locale support: English (default), German (`de`), Dutch (`nl`)
- Locale-specific content snippets in CMS schemas
- Translation utilities in `src/lib/translations.js`

## Technical Requirements

- **Node.js**: >= 22.13.1 (specified in package.json engines)
- **Framework**: Astro 5.8.0 with hybrid rendering
- **UI Libraries**: SolidJS for interactive components, React for CMS
- **TypeScript**: Full TypeScript support with JSX preserve mode