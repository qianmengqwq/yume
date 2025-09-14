# AI Coding Agent Guide for this Repo

This repo is a Next.js 15 App Router site with MDX content powered by Velite, Tailwind v4, Shiki code highlighting, and a custom in-page Table of Contents (TOC) built with Jotai. Follow these conventions to be productive immediately.

## Big picture
- Content source: `content/posts/**/*.mdx` is compiled by Velite into `#site/content` (tsconfig path -> `./.velite`). Posts expose `{ title, slug, createdAt, cover?, code, tocEntry }`.
- Rendering flow: MDX is precompiled (string of JS) by Velite and evaluated client-side in `src/components/mdx/mdx-content.tsx` via a safe runtime shim. Shiki highlighting is applied at build time through rehype.
- Pages: `src/app/blog/page.tsx` lists posts from `#site/content`; `src/app/blog/[slug]/page.tsx` renders a single post, derives a flat TOC from `tocEntry`, and shows a sticky TOC.
- TOC system: Velite provides nested headings (`tocEntry`). We transform to a flat list (`src/types/toc/transform.ts`) and track visibility with Jotai atoms/hooks in `src/atoms/toc/*` and UI in `src/components/mdx/toc-view.tsx`.
- Providers: Global wrappers in `src/providers/*` handle `next-themes`, custom fonts, and Jotai. `src/app/layout.tsx` composes them and runs client hydration helpers for Shiki copy button.

## Dev workflow
- Start dev server (Turbopack) and auto-build Velite:
  - `pnpm dev` (see `package.json` scripts). `next.config.ts` triggers `velite.build({ watch: true })` when dev starts.
- Build for prod: `pnpm build` (Turbopack). Velite runs once with `clean: true`.
- Lint: `pnpm lint` / `pnpm lint:fix` (ESLint with `@antfu/eslint-config`).
- Content changes: editing files under `content/` regenerates `.velite` outputs; import types/data via `#site/content`.

## Key conventions & patterns
- Path aliases: `@/*` -> `src/*`, `#site/content` -> `.velite` (generated). Don’t import from `.velite` directly—use `#site/content`.
- MDX execution: Use `MDXContent` with `code` from Velite. Example:
  - `<MDXContent code={post.code} />` inside article layout.
- Shiki options live in `src/config/rehype-shiki.ts`. A custom transformer adds a copy button; hydration registers click handlers in `src/providers/hydrations.tsx`.
- TOC transform helpers: `flatten(entries)` and `getMinDepth(flat)` unify nesting and indent base.
- TOC atoms/hooks: use `sectionsAtom`, `visibleIdsAtom`, `registerHeadingAtom`, and hooks `useRegisterHeading`, `useVisibleSections`, `useRegisterOutline` to keep UI in sync with scroll.
- UI components: `OutlineItem` renders each TOC entry with smooth scroll and URL hash update; `TocView` computes a continuous highlight bar using Framer Motion.
- Styling: Tailwind v4 with custom palettes and typography. Class merging via `cn()` in `src/lib/utils.ts`.

## Typical additions
- New post: add `content/posts/xxx.mdx` with frontmatter matching Velite schema in `velite.config.ts`. Rehype plugins (slug/autolink/Shiki) are applied automatically.
- New MDX-aware page: query `posts` from `#site/content`, pick one `post`, then:
  - `const flat = flatten(post.tocEntry || [])`
  - `const minDepth = getMinDepth(flat)`
  - Render `<MDXContent code={post.code} />` and `<TocView flat={flat} minDepth={minDepth} />`.
- Custom MDX components: extend `sharedComponents` in `src/components/mdx/mdx-content.tsx` or pass `components` prop to `MDXContent`.

## SSR/CSR boundaries
- Files marked `'use client'` include TOC UI, theme provider wrapper, and hydration helpers. Server components should not use browser APIs directly.
- The MDX `code` string is evaluated client-side using `new Function`; keep injected components SSR-safe unless explicitly client.

## Integration points
- Velite: `velite.config.ts` defines collection schema and mdx rehype pipeline.
- Shiki/rehype: configure themes/transformers in `src/config/rehype-shiki.ts`.
- Themes: `next-themes` configured in `src/providers/theme-provider.tsx` and used in `src/providers/providers.tsx`.

## Footguns & tips
- Ensure tsconfig `paths` remain intact; breaking `#site/content` alias will fail imports.
- When adding TOC logic, update atoms via provided setters to avoid unnecessary renders; don’t mutate Maps in-place—create new Maps as done in atoms.
- Copy button relies on hydration; keep `<Hydrations />` in `layout.tsx` body.
- When computing slug routes, note posts use nested slugs; we use `post.slug.split('/').pop()` to map to `[slug]`.

## Files to study first
- `velite.config.ts`, `src/config/rehype-shiki.ts`
- `src/app/blog/[slug]/page.tsx`, `src/components/mdx/mdx-content.tsx`
- `src/components/mdx/toc-view.tsx`, `src/atoms/toc/*`, `src/types/toc/*`
- `src/providers/*`, `src/app/layout.tsx`
