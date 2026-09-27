# Git / GitHub Field Guide

> A polished editorial explainer for the difference between Git and GitHub — and the deeper engineering systems that appear when software teams scale.

[Open the live field guide](https://github.com/) · Built with React, TypeScript, Tailwind CSS, and Vite

## What this is

The Git / GitHub Field Guide is a long-form learning experience for developers who know the basic “commit and push” workflow and want to understand the larger system around it.

The central mental model is simple:

- **Git is the version-control engine.** It records project history as snapshots and enables branching, merging, rebasing, recovery, and offline work.
- **GitHub is the developer platform around that engine.** It adds collaboration, code review, automation, security, releases, project management, and governance.

The site turns that distinction into a visual, scrollable guide that moves from local commands to production engineering.

## Sections covered

- **The mental model** — Git as a distributed snapshot/history system
- **Git vs GitHub** — a practical capability comparison
- **The delivery loop** — how a push can trigger testing, linting, scanning, packaging, and deployment
- **Security and governance** — branch protection, CODEOWNERS, secret scanning, and CodeQL
- **The learning path** — five levels from Git basics to large-scale engineering
- **The money angle** — how command knowledge grows into higher-value automation, delivery, and security services

## Experience details

- Sticky chapter navigation with active-section tracking
- Filterable chapter list
- Copyable terminal example
- Save-guide interaction
- Responsive desktop and mobile layouts
- Custom repository graph visual in the hero
- Editorial typography pairing: Fraunces, DM Sans, and DM Mono
- Dark ink canvas with coral signal accents and paper-toned type
- Reduced-motion support for accessibility

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Wouter
- Lucide React
- Shadcn-style UI primitives
- Vercel-compatible static build

## Run locally

```bash
pnpm install
pnpm dev
```

The development server runs on `http://localhost:3000` by default.

## Production build

```bash
pnpm check
pnpm build
pnpm start
```

`pnpm check` runs TypeScript validation. `pnpm build` creates the Vite client bundle and production server bundle.

## Project structure

```text
client/
  index.html
  src/
    App.tsx
    index.css
    main.tsx
    pages/
      Home.tsx
    components/
    contexts/
    hooks/
    lib/
server/
  index.ts
shared/
  const.ts
```

## Design direction

The visual language is intentionally closer to an independent print journal or technical field manual than a generic developer landing page:

- **Fraunces** gives the guide a confident editorial voice.
- **DM Mono** turns metadata, commands, and system labels into interface texture.
- **Coral** marks action, risk, and the moment a workflow moves forward.
- **Near-black ink** lets long-form reading stay calm while preserving technical contrast.
- **Grid lines and graph nodes** echo repositories, branches, and the systems view of software delivery.

## Content sources

The guide is based on the supplied explainer content and links outward to primary references from:

- [Git documentation](https://git-scm.com/book/en/v2)
- [GitHub Features](https://github.com/features)
- [GitHub Actions documentation](https://docs.github.com/en/actions)
- [GitHub code security documentation](https://docs.github.com/en/code-security)

## License

This repository contains the website implementation and its original presentation layer. Add a project-specific license before redistributing or adapting it for commercial use.
