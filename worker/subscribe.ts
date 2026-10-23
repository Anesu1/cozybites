/**
 * POST /api/subscribe — newsletter sign-up.
 * Stores subscribers in the SUBSCRIBERS KV namespace (see wrangler.jsonc).
 *
 * List subscribers: npm run subscribers
 */

import type { Env } from "./index";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_BODY_BYTES = 1024;
const RATE_LIMIT = 5; // sign-ups per IP
const RATE_WINDOW_SECONDS = 600;

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

function log(event: string, detail: Record<string, unknown>) {
  console.log(JSON.stringify({ event, ...detail, at: new Date().toISOString() }));
}

function sameOrigin(origin: string | null, requestUrl: string) {
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(requestUrl).host;
  } catch {
    return false; // e.g. "null" from sandboxed frames
  }
}

export async function handleSubscribe(request: Request, env: Env): Promise<Response> {
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";

  // Only accept requests from this site's own pages.
  const origin = request.headers.get("Origin");
  if (!sameOrigin(origin, request.url)) {
    log("subscribe_rejected_origin", { ip, origin });
    return json(403, { ok: false });
  }
  if (!request.headers.get("Content-Type")?.includes("application/json")) {
    return json(415, { ok: false });
  }
  if (Number(request.headers.get("Content-Length") ?? 0) > MAX_BODY_BYTES) {
    return json(413, { ok: false });
  }

  let payload: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return json(413, { ok: false });
    payload = JSON.parse(text);
  } catch {
    return json(400, { ok: false });
  }

  const { email, website } = (payload ?? {}) as { email?: unknown; website?: unknown };

  // Honeypot filled: pretend success so bots learn nothing.
  if (typeof website === "string" && website.length > 0) {
    log("subscribe_honeypot", { ip });
    return json(200, { ok: true });
  }

  if (typeof email !== "string") return json(400, { ok: false });
  const normalised = email.trim().toLowerCase();
  if (normalised.length > 254 || !EMAIL_RE.test(normalised)) {
    return json(400, { ok: false });
  }

  if (!env.SUBSCRIBERS) {
    log("subscribe_misconfigured", { reason: "SUBSCRIBERS binding missing" });
    return json(503, { ok: false });
  }

  const rateKey = `rate:${ip}`;
  const attempts = Number((await env.SUBSCRIBERS.get(rateKey)) ?? 0);
  if (attempts >= RATE_LIMIT) {
    log("subscribe_rate_limited", { ip });
    return json(429, { ok: false });
  }
  await env.SUBSCRIBERS.put(rateKey, String(attempts + 1), { expirationTtl: RATE_WINDOW_SECONDS });

  const key = `email:${normalised}`;
  if (!(await env.SUBSCRIBERS.get(key))) {
    await env.SUBSCRIBERS.put(key, JSON.stringify({ subscribedAt: new Date().toISOString() }));
    log("subscribe_ok", { ip });
  }
  // Same response for new and existing emails, so the endpoint can't be used to check who subscribed.
  return json(200, { ok: true });
}
