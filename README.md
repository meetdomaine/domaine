# Domaine Agency Site

Domaine is the world's largest independent Shopify design & development partner. Our agency site is built for performance, scalability, and ease-of-use.

[View Live Site](https://meetdomaine.com/)

## 🚀 Astro

Domaine uses [Astro](https://astro.build) as a lightweight framework for SSR and SSG. Astro ships zero javascript by default, allowing for many of the conveniences of Next.js but without the bulk and performance concerns of React. If needed, components can opt-in to a reactivity framework like React, but so far this has not been needed.

We use hybrid rendering throughout this project, but in reality this results in all pages being fully static, leading to great performance and SEO optimization. We fetch all CMS content on the server at build time, so no client-side rendering is needed. More on CMS data-fetching below.

Astro also comes with some nice quality-of-life features like performance auditing, viewport transitions, single-file components, scoped CSS, and much more.

[Learn more about Astro](https://astro.build)

## 🗂️ Sanity

We use Sanity as the CMS for our site, for its extensibility, flexibility, and optimizations. The site is built modularly using a set of reusable sections, giving editors a high level of control over page building outside of the core site pages. Once content changes have been published, they can be deployed directly from Sanity to either Staging or Production.

## ✨ Deployment

We use [Vercel](https://www.vercel.com) to manage deployments of the site via their GitHub integration. Pushes to the `staging` or `master` branch will trigger a build in Vercel and deploy to [staging.meetdomaine.com](https://staging.meetdomaine.com/) or [meetdomaine.com](https://meetdomaine.com/) respectively.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Questions, feedback, bugs?

Reach out to [trey@meetdomaine.com](trey@meetdomaine.com)!

## Set up

1. ensure you're using a recent node version
2. fill in .env variables
