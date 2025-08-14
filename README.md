# Domaine Agency Website

> The world's largest independent Shopify design & development partner

A high-performance, dual-brand website built with Astro and Sanity CMS, serving both **Domaine** (main agency) and **Studio** (creative services) brands through a unified codebase.

**Live Sites:**
- [meetdomaine.com](https://meetdomaine.com/) (Production)
- [staging.meetdomaine.com](https://staging.meetdomaine.com/) (Staging)

## 🏗️ Architecture

### Tech Stack
- **Framework**: [Astro 5.8.0](https://astro.build) with hybrid rendering & i18n
- **CMS**: [Sanity](https://sanity.io) with Visual Editing & CDN caching
- **UI Libraries**: SolidJS (client components), React (CMS admin)
- **Styling**: Scoped CSS with GSAP animations & Lenis smooth scrolling
- **Search**: Pagefind for static site search with brand filtering
- **Deployment**: Cloudflare Pages (primary), Vercel (secondary)

### Dual-Brand System
The site serves two distinct brands from a single codebase:
- **Domaine**: Full-service agency focusing on enterprise Shopify solutions
- **Studio**: Creative services for design and development

Brand switching is handled through:
- Dedicated layout components (`Layout-Domaine.astro`, `Layout-Studio.astro`)
- CMS content filtering via `agencyBrand` references
- Brand-specific styling and navigation

## 🚀 Getting Started

### Prerequisites
- Node.js >= 22.13.1
- npm or yarn

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:4321

# Start Sanity Studio (in separate terminal)
cd domaine-cms
npm run dev
# → http://localhost:3333/admin
```

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with host access |
| `npm run build` | Production build with search indexing (4GB memory) |
| `npm run preview` | Preview production build via Wrangler |
| `npm run astro` | Run Astro CLI commands |

### CMS Development

```bash
cd domaine-cms

# Development
npm run dev          # Start Sanity Studio
npm run build        # Build Studio for production
npm run deploy       # Deploy Studio to Sanity hosting
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── layouts/            # Brand-specific layout templates  
├── pages/              # Route pages with server/static rendering
├── lib/                # Utilities, CMS queries, cached content, animations
├── enums/              # TypeScript enums (brands, locales)
├── animation/          # GSAP and viewport animation components
└── content.config.js   # Content collections configuration

domaine-cms/
├── schemaTypes/        # Sanity schema definitions
│   ├── sections/       # Modular page sections
│   ├── pages/          # Page-specific schemas
│   ├── siteSettings/   # Global settings
│   └── snippets/       # Reusable field groups
└── sanity.config.js    # CMS configuration
```

## 🎨 Content Management

### Modular Page Building
The CMS provides a flexible page building system using reusable sections:
- **Content Blocks**: Rich text with media
- **Media Carousels**: Image/video galleries
- **Service Feeds**: Dynamic service listings
- **Project Grids**: Case study showcases
- **Form Sections**: Contact and lead capture

### Content Types
- **Projects**: Case studies with client details, services, and metrics
- **Services**: Service offerings organized by groups and types
- **Blog Posts**: Articles with categorization and author attribution
- **Partners**: Partner ecosystem with tier-based organization
- **Team Members**: Staff profiles with department grouping
- **Events**: Webinars, conferences, and speaking engagements

## 🌍 Internationalization

Multi-locale support for:
- **English** (default)
- **German** (`de`)
- **Dutch** (`nl`)

Content localization handled through:
- Locale-specific content fields in CMS
- URL routing with locale prefixes
- Fallback content for missing translations

## 🔍 Search & Performance

### Search
- **Pagefind** for client-side search
- Brand-filtered results  
- Automatic indexing during build process via `prebuild` script

### Performance Optimizations
- **Static site generation** by default with hybrid rendering
- **Optimized CMS queries** with explicit field selection (no spread operators)
- **Parallel database queries** using `Promise.all()` 
- **Cached content system** via `src/lib/cached-content.js`
- **Image optimization** via Sanity CDN and `astro-sanity-picture`
- **Timer cleanup** for client-side intervals (prevents CPU spikes)
- **Code splitting** and lazy loading
- **GSAP animations** with proper licensing
- **Lenis smooth scrolling** with managed cleanup

## 🚀 Deployment

### Automatic Deployments
- **Production**: `master` branch → [meetdomaine.com](https://meetdomaine.com/)
- **Staging**: `staging` branch → [staging.meetdomaine.com](https://staging.meetdomaine.com/)

### Manual Deployments
Content editors can deploy directly from Sanity Studio using the Vercel Deploy plugin.

### Environment Variables
Key variables for deployment:
- `PUBLIC_SANITY_API_READ_TOKEN`: Sanity API access token
- `PUBLIC_SANITY_VISUAL_EDITING_ENABLED`: Enable/disable visual editing mode
- `HUBSPOT_*`: Form integration credentials
- `GREENSOCK_AUTH_TOKEN`: GSAP licensing token

## 📧 Contact & Support

**Technical Questions**: [trey@meetdomaine.com](mailto:trey@meetdomaine.com)

**Agency Inquiries**: [hello@meetdomaine.com](mailto:hello@meetdomaine.com)

---

Built with ⚡ by the Domaine team