# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server at localhost:4321
npm run build     # production build (outputs to dist/)
npm run preview   # preview production build locally
```

No test suite — verify changes visually with `npm run dev`.

## Architecture

**Astro 4 + Vercel serverless** single-page portfolio. Output mode is `hybrid` — all pages are statically prerendered except the two API routes.

### Page composition

`src/pages/index.astro` imports and stacks every section component in order. There is no routing beyond the single page. The HTML shell, global styles, and **all client-side JavaScript** live in `src/layouts/Layout.astro` as a single `<script is:inline>` block. That script handles: animated canvas background, scroll-reveal (`[data-reveal]`), counter animation (`[data-count]`), 3D card tilt (`.srv-card`, `.proc-step`), contact form submission, and the full chat widget logic.

### Styling system

`src/styles/global.css` defines the design tokens as CSS custom properties on `:root` (light theme: `--a1: #2563EB`, `--a2: #7C3AED`). Components use these variables directly in `<style>` blocks. There is a legacy `index.html` in the repo root with a dark theme — it is not used by the Astro build.

### API routes

Both require `export const prerender = false`.

- **`src/pages/api/chat.ts`** — Claude AI assistant. Streams SSE (`text/event-stream`) from `claude-haiku-4-5-20251001`, keeping the last 10 messages of history. Falls back to a plain JSON response when `ANTHROPIC_API_KEY` is not set. System prompt persona and contact details are hardcoded in this file.
- **`src/pages/api/contact.ts`** — Contact form. Posts to Web3Forms when `WEB3FORMS_KEY` is set; silently logs and succeeds when it is not (useful in dev).

### Environment variables

Copy `.env.example` to `.env` for local development:

```
ANTHROPIC_API_KEY=   # Claude API — powers the chat widget
WEB3FORMS_KEY=       # Web3Forms — powers the contact form
```

Both are optional locally; their respective features degrade gracefully without them.

## Language

All UI copy and the Claude system prompt are in Argentine Spanish (vos/te register). Keep new content consistent with this voice.
