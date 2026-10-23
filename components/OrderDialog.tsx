"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { contact, SECTION_IDS, site } from "@/content/site";
import { buttonStyle, ButtonLabel } from "./framer/Button";
import { T } from "./framer/tokens";

const { order } = site;
const PREFIX = `#${SECTION_IDS.order}`;

/** Resolve `#order` / `#order/<slug>` to a known product name (unknown slugs are ignored). */
function itemFromHash(hash: string): string | null | undefined {
  if (hash !== PREFIX && !hash.startsWith(`${PREFIX}/`)) return undefined;
  const slug = hash.slice(PREFIX.length + 1);
  return Object.hasOwn(order.items, slug) ? order.items[slug] : null;
}

function OrderLink({ href, label, variant, external }: { href: string; label: string; variant: "dark" | "light"; external?: boolean }) {
  const dark = variant === "dark";
  return (
    <a
      className={`framer-FN12i framer-90xug framer-exxxj9 ${dark ? "framer-v-exxxj9" : "framer-v-j2tj7a"} framer-1p1xp1r cb-order-action`}
      data-border="true"
      data-reset="button"
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={buttonStyle(dark ? T.pink : T.surface, dark ? T.pinkEdge : T.border)}
    >
      <ButtonLabel label={label} color={dark ? T.onPink : T.ink} classes={["framer-kypr4p", "framer-19yycb4", "framer-1lc5t0j", "framer-e6ksm9"]} />
    </a>
  );
}

export function OrderDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [item, setItem] = useState<string | null>(null);

  const open = useCallback((hash: string) => {
    const found = itemFromHash(hash);
    if (found === undefined) return false;
    setItem(found);
    const d = ref.current;
    if (d && !d.open) d.showModal();
    return true;
  }, []);

  useEffect(() => {
    // Deep links such as /#order/vanilla-cupcakes open the dialog after first paint.
    const frame = requestAnimationFrame(() => open(window.location.hash));
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='#']");
      if (a && open(a.getAttribute("href") ?? "")) e.preventDefault();
    };
    const onHash = () => open(window.location.hash);
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHash);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHash);
    };
  }, [open]);

  const onClose = () => {
    if (window.location.hash.startsWith(PREFIX)) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  };

  const message = item
    ? `Hi Cozy Bites! I'd like to order ${item}. Could you tell me about flavours, quantities and availability?`
    : "Hi Cozy Bites! I'd like to place an order. Could you tell me about flavours, quantities and availability?";
  const whatsapp = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
  const mail = `${contact.emailHref}?subject=${encodeURIComponent(item ? `Order enquiry: ${item}` : "Order enquiry")}&body=${encodeURIComponent(message)}`;

  return (
    <dialog
      ref={ref}
      className="cb-order"
      aria-labelledby="order-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
    >
      <div className="cb-order-panel">
        <button type="button" className="cb-order-close" aria-label="Close" onClick={() => ref.current?.close()}>
          <span />
          <span />
        </button>
        <h2 id="order-title" className="framer-text framer-styles-preset-a709wp">
          {order.title}
        </h2>
        {item && <p className="framer-text framer-styles-preset-1iaotnv cb-order-item">{item}</p>}
        <p className="framer-text framer-styles-preset-appsha cb-order-text">{order.text}</p>
        <div className="cb-order-actions">
          <OrderLink href={whatsapp} label={order.whatsappLabel} variant="dark" external />
          <OrderLink href={contact.phoneHref} label={order.callLabel} variant="light" />
          <OrderLink href={mail} label={order.emailLabel} variant="light" />
        </div>
        <p className="framer-text framer-styles-preset-1kx48xn cb-order-location">{contact.location}</p>
      </div>
    </dialog>
  );
}
