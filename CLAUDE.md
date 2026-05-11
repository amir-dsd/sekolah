# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (port 3000)
npm run build     # Production build
npm run lint      # ESLint
```

## Architecture

**Stack**: Next.js (App Router) + TypeScript + Tailwind CSS v4 + Supabase

**Route groups**:
- `src/app/(public)/` — public-facing pages with Navbar + Footer layout
- `src/app/(admin)/` — admin panel at `/admin/*`, no public layout

**Auth**: Middleware at `src/middleware.ts` checks `admin_session` cookie for all `/admin/*` routes except `/admin/login`. Password is `dsd54321`, set via `src/app/api/admin/login/route.ts` which issues an httpOnly cookie (8h).

**Supabase clients** — three separate clients in `src/lib/supabase/`:
- `client.ts` — browser client (`createBrowserClient`)
- `server.ts` — RSC server client (`createServerClient` with cookies)
- `admin.ts` — service-role client (bypasses RLS), used only in server-side admin routes

**Dark mode**: Class-based (`.dark` on `<html>`). Anti-flicker inline script in `src/app/layout.tsx` reads localStorage before paint. `ThemeProvider` context in `src/components/theme-provider.tsx` manages toggling. Tailwind v4 requires `@custom-variant dark (&:where(.dark, .dark *));` in `globals.css` instead of config.

**PPDB flow**:
1. Multi-step registration form at `/ppdb/daftar` — 5 steps via `react-hook-form` + `zod`
2. Status checker at `/ppdb/status` — queries by `nomor_pendaftaran`
3. Admin approves/rejects at `/admin/pendaftar` via modal (`update-status-form.tsx`)
4. Status values: `menunggu | diverifikasi | diterima | ditolak`

**Database**: Tables `pendaftaran`, `pengaturan_ppdb`, `dokumen_pendaftaran`, `berita`. RLS enabled with public read access. Schema in `supabase-schema.sql`, mock data in `supabase-mock-data.sql` (starts with TRUNCATE to avoid duplicates).

**Env vars** required: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
