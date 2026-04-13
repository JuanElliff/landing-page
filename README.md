# landing-page — Juan Cruz Elliff

Personal portfolio and services landing page.

## Stack

- **Framework:** Astro 4 (hybrid SSR + static)
- **Hosting:** Vercel (serverless functions via `@astrojs/vercel`)
- **AI Chat:** Anthropic Claude Haiku — streaming SSE via `/api/chat`
- **Contact form:** Web3Forms proxy via `/api/contact`
- **Styling:** Vanilla CSS with custom properties (no framework)
- **Background:** Canvas API — animated particles + grid

## Structure

```
src/
├── components/       # Section components (Hero, Services, Contact, etc.)
├── layouts/          # Layout.astro — canvas animation, chat widget, scripts
├── pages/
│   ├── index.astro
│   └── api/
│       ├── chat.ts   # Claude streaming endpoint
│       └── contact.ts# Web3Forms email proxy
└── styles/
    └── global.css
```

## Environment variables

```
ANTHROPIC_API_KEY=   # Required for AI chat
WEB3FORMS_KEY=       # Optional — contact form email delivery
```

## Run locally

```bash
npm install
npm run dev   # http://localhost:4321
```
