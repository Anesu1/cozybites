"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { appear } from "./framer/motion";
import { T } from "./framer/tokens";

/**
 * Phone navigation: Framer's "Phone" / "Phone Open" variants.
 * Logo, links and CTA are passed in as server-rendered children.
 */
export function PhoneNavigation({ logo, links, cta }: { logo: ReactNode; links: ReactNode; cta: ReactNode }) {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const icon = appear({ y: -30, delay: 0.2 });

  // Links sit in the clipped part of the closed bar; keep them out of the tab order.
  useEffect(() => {
    navRef.current
      ?.querySelectorAll<HTMLElement>(".framer-1et8a1q, .framer-nloonb-container")
      .forEach((el) => (el.inert = !open));
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const nav = navRef.current;
    const close = (e: Event) => {
      if (e.type === "keydown" && (e as KeyboardEvent).key !== "Escape") return;
      if (e.type === "click" && !(e.target as HTMLElement).closest("a")) return;
      setOpen(false);
    };
    nav?.addEventListener("click", close);
    window.addEventListener("keydown", close);
    window.addEventListener("hashchange", close);
    return () => {
      nav?.removeEventListener("click", close);
      window.removeEventListener("keydown", close);
      window.removeEventListener("hashchange", close);
    };
  }, [open]);

  const line = (rotate: number): React.CSSProperties => ({
    backgroundColor: T.white,
    borderRadius: 10,
    transform: open ? `rotate(${rotate}deg)` : "none",
    transition: "transform 0.35s cubic-bezier(0.44, 0, 0.56, 1), top 0.35s cubic-bezier(0.44, 0, 0.56, 1)",
  });

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className={`framer-8pKTs framer-r0wxg framer-Jagek framer-fd5r3 framer-hnwfpl ${open ? "framer-v-kpj05s" : "framer-v-1szg55s"}`}
      data-framer-name={open ? "Phone Open" : "Phone"}
      data-open={open || undefined}
      style={{
        backgroundColor: open ? T.inkFixed : "rgba(0, 0, 0, 0)",
        width: "100%",
        transition: "background-color 0.35s cubic-bezier(0.44, 0, 0.56, 1)",
      }}
    >
      <div className="framer-1hunuqo" data-framer-name="Logo, Menu">
        {logo}
        <button
          type="button"
          className="framer-v605y5"
          data-framer-name="Menu Icon"
          data-highlight="true"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          {...icon}
        >
          <span className="framer-15otuqk" data-framer-name="Top" style={line(45)} />
          <span className="framer-rorthz" data-framer-name="Bottom" style={line(-45)} />
        </button>
      </div>
      {links}
      {cta}
    </nav>
  );
}
