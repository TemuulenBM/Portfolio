# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Rules

- **Language**: Communicate with the developer in Mongolian (Монгол хэлээр харилцана).
- **Code comments**: All docblock comments, inline comments, and documentation comments must be written in Mongolian.

## Project Overview

Full-stack portfolio website with a cyberpunk/glassmorphism aesthetic. Monorepo with React frontend, Express backend, and shared code.

## Commands

```bash
npm run dev          # Start dev server (Express + Vite HMR)
npm run build        # Build for production (Vite client + EsBuild server → dist/)
npm run start        # Run production build (NODE_ENV=production)
npm run check        # TypeScript type checking (tsc)
```

CI runs: `npm ci` → `npm run check` → `npm run build` (Node 20, Ubuntu)

## Architecture

### Monorepo Structure

- **`client/`** — React 18 SPA built with Vite. Entry: `index.html` → `src/main.tsx` → `App.tsx`
- **`server/`** — Express backend. Entry: `server/index.ts`
- **`shared/`** — Shared Zod schemas and types (`schema.ts`)
- **`script/`** — Build scripts (EsBuild config in `build.ts`)

### Path Aliases

- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`

Configured in both `tsconfig.json` and `vite.config.ts`.

### Frontend Stack

- **Vite + React + TypeScript** with strict mode
- **Tailwind CSS** with custom cyberpunk theme (neon-cyan, neon-purple, neon-pink)
- **Shadcn/ui** (new-york style) — components in `client/src/components/ui/`
- **Framer Motion** for animations
- **Wouter** for routing (lightweight, not React Router)
- **TanStack React Query** for server state
- **React Hook Form + Zod** for form validation

### Backend Stack

- **Express** with Vite middleware (dev) or static file serving (production)
- **Supabase** for database (PostgreSQL) — conditionally enabled via `SUPABASE_URL` env var
- **Storage abstraction** in `server/storage.ts`: `IStorage` interface with `MemStorage` (dev fallback) and `SupabaseStorage` implementations

### Build Pipeline

1. Vite bundles client → `dist/public/`
2. EsBuild bundles server → `dist/index.cjs` (CommonJS, minified)
3. Most dependencies externalized except whitelisted packages (express, pg, supabase, etc.)

### Design System

Glassmorphism pattern: `bg-white/10 backdrop-blur-lg border border-white/20` on dark background (#0a0a0a). Neon accent colors defined as CSS variables in Tailwind config. Full design spec in `design_guidelines.md`.

### Deployment

Configured for Vercel (`vercel.json`): builds with `npm run build`, serves from `dist/public/`.
