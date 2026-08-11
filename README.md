# Nilushan Silva — Professional Portfolio

Personal portfolio and technical blog for Nilushan Silva, built with Astro, React, TypeScript, Tailwind CSS, and DaisyUI.

## Features

- Static portfolio pages with interactive React islands
- Type-safe blog and project content collections
- Multi-theme DaisyUI interface with persisted theme selection
- Mermaid diagrams in MDX content
- RSS feed, sitemap, canonical URLs, Open Graph metadata, and structured data
- Context-aware Gemini chatbot with a client-side fallback
- Firebase Hosting and Cloud Functions deployment

## Technology

- Astro 5 in server mode with static page prerendering
- React 19 for interactive components
- TypeScript with strict checking and the `@/*` path alias
- Tailwind CSS 4 and DaisyUI 5
- MDX content collections
- Firebase Hosting and Cloud Functions (Node.js 22)
- pnpm 10

## Requirements

- Node.js 22 recommended (CI and Firebase Functions use Node.js 22)
- pnpm 10.11 or newer
- Firebase CLI only when deploying manually

## Local development

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

The development server is available at `http://localhost:4321` by default.

The chatbot uses built-in portfolio answers when its API is unavailable. To enable Gemini responses locally, set `GEMINI_API_KEY` in `.env.local`.

## Commands

```bash
pnpm dev       # Start the development server
pnpm build     # Create the production build
pnpm preview   # Preview the production build
pnpm astro     # Run Astro CLI commands
```

There is currently no dedicated test or lint script. Use `pnpm build` as the baseline validation command.

## Project structure

```text
src/
├── assets/             # Source images and other optimized assets
├── components/         # Astro and interactive React components
├── content/
│   ├── blog/           # Blog posts (MDX)
│   └── projects/       # Project case studies (MDX)
├── data/               # Central portfolio data
├── layouts/            # Shared page layouts
├── lib/                # Utilities, theme management, chatbot context
├── pages/              # Site routes and /api/chat
├── styles/             # Global styles
└── types/              # Shared TypeScript types

functions/              # Firebase Cloud Function wrapper for Astro SSR
docs/                   # Project documentation
public/                 # Assets copied without processing
```

## Content updates

- Personal details, skills, and experience: `src/data/portfolio.ts`
- Blog posts: `src/content/blog/*.mdx`
- Project case studies: `src/content/projects/*.mdx`
- Collection schemas: `src/content.config.ts`

## Deployment

Production deploys to Firebase when changes are pushed to `master`. Pull requests from branches in this repository receive a Hosting preview deployment. The `/api/**` path is routed to the `api` Cloud Function in Sydney (`australia-southeast1`).

See [Firebase deployment](docs/deployment/firebase.md) for setup, secrets, manual deployment, and troubleshooting.

## Documentation

Start with the [documentation index](docs/README.md):

- [Firebase deployment](docs/deployment/firebase.md)
- [Chatbot](docs/features/chatbot.md)
- [Mermaid](docs/features/mermaid.md)
- [SEO and indexing](docs/operations/seo.md)
- [Design system](docs/design-system.md)

## Contact

- [LinkedIn](https://www.linkedin.com/in/nilushan-silva-27235310/)
- [GitHub](https://github.com/nilushan)
- [nilushansilva.info](https://www.nilushansilva.info)

## License

This repository is a personal portfolio. You may use it for inspiration, but do not copy personal content directly.
