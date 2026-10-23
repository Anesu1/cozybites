"use client";

import { useEffect } from "react";

/**
 * Small replacement for the Framer runtime. Reads the data attributes written by
 * components/framer/motion.ts and plays the same effects:
 *  - [data-appear]  page-load springs (hero + navigation)
 *  - [data-reveal]  spring in when scrolled into view
 *  - [data-ticker]  infinite marquee at 60px/s
 *  - [data-fit-text] footer wordmark sized to the container width
 */

const TICKER_SPEED = 60; // px per second, measured from the original site

/** Duration-based spring (Framer "spring" with bounce + duration) as a CSS linear() easing. */
function springEasing(bounce: number, duration: number): string {
  const zeta = Math.max(0.05, 1 - bounce);
  const omega = 6.9 / (zeta * duration);
  const samples = 60;
  const points: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = (i / samples) * duration;
    let x: number;
    if (zeta >= 1) {
      x = 1 - Math.exp(-omega * t) * (1 + omega * t);
    } else {
      const wd = omega * Math.sqrt(1 - zeta * zeta);
      x = 1 - Math.exp(-zeta * omega * t) * (Math.cos(wd * t) + (zeta / Math.sqrt(1 - zeta * zeta)) * Math.sin(wd * t));
    }
    points.push(i === samples ? "1" : x.toFixed(4));
  }
  return `linear(${points.join(", ")})`;
}

const supportsLinear = typeof CSS !== "undefined" && CSS.supports("animation-timing-function", "linear(0, 1)");
const FALLBACK_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function num(el: HTMLElement, key: string, fallback = 0) {
  const v = el.dataset[key];
  return v === undefined || v === "" ? fallback : Number(v);
}

function transformOf(base: string | undefined, x: number, y: number, rotate: number) {
  const parts = [base, x ? `translateX(${x}px)` : "", y ? `translateY(${y}px)` : "", rotate ? `rotate(${rotate}deg)` : ""];
  return parts.filter(Boolean).join(" ") || "none";
}

/** Final resting style: keep any base transform, otherwise hand control back to CSS (hover effects). */
function settle(el: HTMLElement) {
  const base = el.dataset.base;
  const rotate = num(el, "rotate");
  el.style.transform = base || rotate ? transformOf(base, 0, 0, rotate) : "";
  el.style.opacity = "1";
  el.style.willChange = "auto";
  el.dataset.settled = "";
}

function play(el: HTMLElement, delay: number) {
  const x = num(el, "x");
  const y = num(el, "y");
  const rotate = num(el, "rotate");
  const duration = num(el, "duration", 0.8);
  const bounce = num(el, "bounce", 0);
  const base = el.dataset.base;
  const startOpacity = Number(getComputedStyle(el).opacity);
  const ms = duration * 1000;

  const move = el.animate(
    [{ transform: transformOf(base, x, y, 0) }, { transform: transformOf(base, 0, 0, rotate) }],
    { duration: ms, delay: delay * 1000, easing: supportsLinear ? springEasing(bounce, duration) : FALLBACK_EASE, fill: "both" },
  );
  const fade =
    startOpacity < 1
      ? el.animate([{ opacity: startOpacity }, { opacity: 1 }], { duration: ms * 0.6, delay: delay * 1000, easing: "ease-out", fill: "both" })
      : null;
  move.finished
    .then(() => {
      settle(el);
      move.cancel();
      fade?.cancel();
    })
    .catch(() => {});
}

function startTickers(): () => void {
  const running = new Map<HTMLElement, Animation>();
  const measure = () => {
    document.querySelectorAll<HTMLElement>("[data-ticker]").forEach((track) => {
      const first = track.firstElementChild as HTMLElement | null;
      const width = first?.offsetWidth ?? 0;
      const prev = running.get(track);
      if (!width) return; // hidden breakpoint variant
      if (prev && Number(track.dataset.tickerWidth) === width) return;
      const progress = prev ? ((prev.currentTime as number) ?? 0) / (Number(prev.effect?.getTiming().duration) || 1) : 0;
      prev?.cancel();
      const anim = track.animate(
        [{ transform: "translateY(-50%) translateX(0px)" }, { transform: `translateY(-50%) translateX(${-width}px)` }],
        { duration: (width / TICKER_SPEED) * 1000, iterations: Infinity, easing: "linear" },
      );
      anim.currentTime = (progress % 1) * (width / TICKER_SPEED) * 1000;
      track.dataset.tickerWidth = String(width);
      running.set(track, anim);
    });
  };
  measure();
  const ro = new ResizeObserver(measure);
  ro.observe(document.documentElement);
  document.fonts?.ready.then(measure).catch(() => {});
  return () => {
    ro.disconnect();
    running.forEach((a) => a.cancel());
  };
}

function fitText(): () => void {
  const fit = () => {
    document.querySelectorAll<SVGSVGElement>("svg[data-fit-text]").forEach((svg) => {
      const p = svg.querySelector("p");
      if (!p || !svg.getBoundingClientRect().width) return;
      const probe = document.createElement("span");
      const cs = getComputedStyle(p);
      probe.textContent = p.textContent;
      Object.assign(probe.style, {
        position: "absolute",
        visibility: "hidden",
        whiteSpace: "pre",
        fontFamily: cs.fontFamily,
        fontWeight: cs.fontWeight,
        fontSize: "16px",
        letterSpacing: "-0.05em",
        fontFeatureSettings: cs.fontFeatureSettings,
      });
      document.body.appendChild(probe);
      const w = probe.getBoundingClientRect().width;
      probe.remove();
      if (w) svg.setAttribute("viewBox", `0 0 ${w.toFixed(2)} 16`);
    });
  };
  document.fonts?.ready.then(fit).catch(() => {});
  const mq = ["(min-width: 1470px)", "(min-width: 810px)"].map((q) => window.matchMedia(q));
  mq.forEach((m) => m.addEventListener("change", fit));
  return () => mq.forEach((m) => m.removeEventListener("change", fit));
}

export function MotionRuntime() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [fitText()];

    const appearing = document.querySelectorAll<HTMLElement>("[data-appear]");
    const revealing = document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (reduced) {
      appearing.forEach(settle);
      revealing.forEach(settle);
      return () => cleanups.forEach((c) => c());
    }

    appearing.forEach((el) => play(el, num(el, "delay")));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          play(entry.target as HTMLElement, 0);
        });
      },
      { threshold: 0 },
    );
    revealing.forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect(), startTickers());

    return () => cleanups.forEach((c) => c());
  }, []);

  return null;
}
