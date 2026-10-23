# Cozy Bites

Website for Cozy Bites, a bakery in Bulawayo, Zimbabwe. Built with Next.js (App Router, TypeScript) as a static export and hosted on Cloudflare Workers (static assets plus a small Worker for the newsletter API).

The design is a 1:1 port of a Framer template. The original export is kept locally in `design-reference/` for comparison and is git-ignored. Framer's CSS lives unchanged in `app/framer.css`. The pieces of Framer's runtime the page used (intro and scroll animations, ticker, hover states, phone menu) are reimplemented in `components/MotionRuntime.tsx`, `components/PhoneNavigation.tsx` and `app/globals.css`.

## Editing content

All text, links, contact details and image references are in `content/site.ts`. Images live in `public/images` as WebP files in several widths. The full-size originals are in `design-reference/source-images`.

## Commands

```bash
npm run dev          # local dev server at http://localhost:3000
npm run build        # static export to ./out
npm run lint
npm run typecheck    # site + Cloudflare Worker
npm run deploy       # build and deploy the cozy-bites Worker
npm run subscribers  # list newsletter sign-ups stored in Workers KV
```

## How the pieces fit

- `app/page.tsx` composes the seven sections: announcement ticker, navigation and hero, featured treats, our story, our baking, footer, plus the order dialog.
- Framer renders desktop (≥1470px), tablet (810–1469px) and phone (<810px) variants side by side and hides the inactive ones with the `hidden-*` classes. The components follow the same pattern.
- **Ordering:** any link to `#order` or `#order/<item>` opens `components/OrderDialog.tsx`, with WhatsApp, call and email options. The item names are in `site.order.items`.
- **Newsletter:** `components/NewsletterForm.tsx` posts to `/api/subscribe`, handled by the Worker in `worker/` (`index.ts` routes it, `subscribe.ts` handles it). It validates the email again on the server, applies an origin check, a honeypot and per-IP rate limiting, then stores the address in the `SUBSCRIBERS` KV namespace (see `wrangler.jsonc`). All other requests are served from `out/` as static assets.
- **Security headers and caching** are set in `public/_headers`, which Workers static assets also applies.
