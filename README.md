# hasib.tech — Portfolio

Personal portfolio of **Hasib Ahmad Bhuyan** — Senior Software Engineer, AI Platforms.
Dark, liquid-metal, type-driven design with a performance-first WebGL layer.

## Stack

- **Next.js 16** (App Router, Turbopack) · React 19 · TypeScript
- **Tailwind CSS 4** (CSS-first `@theme` tokens)
- **Keystatic** CMS — local storage in dev, GitHub mode via env switch
- **React Three Fiber 9 + drei 10** — single persistent canvas, per-section `View`s
- **next-mdx-remote** for MDX case studies
- Fonts: **General Sans** (display, Fontshare FFL) + **Geist Mono** (OFL), self-hosted

## 3D / performance architecture

- One fixed, pointer-transparent `<canvas>` mounted in the root layout; drei `View`s
  scissor-render each section's scene into server-rendered placeholder containers
  (zero CLS, one WebGL context, shared HDRI).
- WebGL loads only after **window load → first user interaction → idle slot →
  intersection**. Crawlers, bots, and Lighthouse get the pure-HTML site with
  static AVIF posters; the hero poster is a blurred low-entropy glow so the H1
  stays the LCP element.
- Quality tiers (`components/three/quality.ts`): HIGH (PBR + studio HDRI),
  LOW (matcap, reduced budgets, no HDRI download), STATIC (no canvas at all).
  `PerformanceMonitor` steps DPR down under load; two WebGL context losses
  drop the session to STATIC.
- Frameloop runs only while a scene is on screen and the tab is visible;
  `prefers-reduced-motion` renders a single static frame.

Lighthouse (this build): mobile 99 perf / 100 a11y / 100 SEO, desktop 100 perf, CLS 0.

## SEO / GEO

- Per-route metadata + canonical, dynamic `ImageResponse` OG cards, sitemap,
  robots (AI crawlers explicitly allowed), Atom feed, PWA manifest.
- JSON-LD `@graph`: Person, WebSite, ProfilePage, CollectionPage + ItemList,
  CreativeWork, FAQPage, BreadcrumbList.
- **GEO surface**: [`/llms.txt`](https://hasib.tech/llms.txt),
  [`/llms-full.txt`](https://hasib.tech/llms-full.txt), and markdown
  alternates for every content page (`/index.md`, `/work/<slug>.md`) served as
  `text/markdown` with canonical `Link` headers and declared via
  `<link rel="alternate" type="text/markdown">`.

## Development

```bash
pnpm install
pnpm dev          # http://localhost:3000  (/keystatic for the CMS)
pnpm build        # validates content (zod) then builds
pnpm start
```

## Content

- `content/work/*.mdx` — case studies (Keystatic `work` collection)
- `content/blog/*.mdx` — posts (routes exist; section appears once published)
- `content/settings/*.json` — site, profile, navigation, home, capabilities,
  experience, skills, resume singletons

### Keystatic GitHub mode (production editing)

Set in Vercel only — never commit secrets:

```
NEXT_PUBLIC_KEYSTATIC_STORAGE_KIND=github
NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=<app-slug>
KEYSTATIC_GITHUB_CLIENT_ID=<id>
KEYSTATIC_GITHUB_CLIENT_SECRET=<secret>
KEYSTATIC_SECRET=<random>
```

## Assets

- `public/3d/` — 512px studio HDRI (Poly Haven, CC0), silver matcap, grain tile
- `public/fallbacks/` — static AVIF posters for every 3D scene
- `public/images/work/` — generated abstract thumbnails (one accent per project)
- `fonts/` — variable woff2 + OTF/TTF statics for OG rendering (licenses included)
