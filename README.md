# eerstep

A strategy-based wealth progression web app built with Next.js App Router, TypeScript, Tailwind CSS, shadcn-style UI components, Supabase-ready schema, and Recharts.

## Run locally

```bash
npm install
npm run dev
```

## Validation scripts

```bash
npm run lint
npm run lint:fix
npm run lint:strict
npm run typecheck
```

## Build output

```bash
npm run build
```

`next.config.ts` uses static export, so production web assets are generated into `out/`. `capacitor.config.ts` also points `webDir` to `out`, which means the folder is a generated build artifact for packaging and local native sync, not source to maintain by hand.

## Core pages

- `/` Landing
- `/diagnosis` Net worth input
- `/result` Level and strategy result
- `/dashboard` Main strategy dashboard
- `/strategy` Strategy detail and next level preview
- `/actions` Action checklist and custom actions

## Supabase

Apply schema from `supabase/schema.sql` and set env vars from `.env.example`.
