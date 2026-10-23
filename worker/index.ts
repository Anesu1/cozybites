/**
 * Cloudflare Worker entry. Static files from the Next.js export (./out) are
 * served by Workers Static Assets; only /api/* reaches this code
 * (see `run_worker_first` in wrangler.jsonc).
 */

import { handleSubscribe } from "./subscribe";

export interface Env {
  ASSETS: Fetcher;
  SUBSCRIBERS: KVNamespace;
}

export default {
  async fetch(request, env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/subscribe") {
      if (request.method !== "POST") {
        return new Response(null, { status: 405, headers: { Allow: "POST" } });
      }
      return handleSubscribe(request, env);
    }

    // Anything else under /api/ is unknown; everything else is a static file.
    if (pathname.startsWith("/api/")) return new Response("Not found", { status: 404 });
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
