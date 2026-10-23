import type { CSSProperties } from "react";

/**
 * Animation hooks read by <MotionRuntime />. Elements are server-rendered in
 * their initial (hidden) state, exactly like the Framer export, and the
 * runtime animates them in.
 */

type DataAttrs = { [key: `data-${string}`]: string | number | undefined };
export type MotionProps = DataAttrs & { style: CSSProperties };

/** Exposes the resting transform for the no-JS fallback in app/layout.tsx. */
function baseVar(base?: string): CSSProperties {
  return base ? ({ ["--cb-base" as string]: base } as CSSProperties) : {};
}

/** Page-load animation (Framer "appear" effects in the hero and navigation). */
export function appear(opts: {
  y?: number;
  x?: number;
  rotate?: number;
  delay: number;
  duration?: number;
  bounce?: number;
  fade?: boolean;
  base?: string;
}): MotionProps {
  const { y = 0, x = 0, rotate = 0, delay, duration = 0.8, bounce = 0, fade = true, base } = opts;
  const from = [base, x ? `translateX(${x}px)` : "", y ? `translateY(${y}px)` : ""].filter(Boolean).join(" ");
  return {
    "data-appear": "",
    "data-x": x || undefined,
    "data-y": y || undefined,
    "data-rotate": rotate || undefined,
    "data-delay": delay,
    "data-duration": duration,
    "data-bounce": bounce || undefined,
    "data-base": base,
    style: { willChange: "transform", opacity: fade ? 0.001 : 1, transform: from, ...baseVar(base) },
  };
}

/** Scroll-into-view animation (Framer "while in view" effects). */
export function reveal(y: number, opts: { fade?: boolean; base?: string; bounce?: number; duration?: number } = {}): MotionProps {
  const { fade = true, base, bounce, duration } = opts;
  return {
    "data-reveal": "",
    "data-y": y,
    "data-base": base,
    "data-bounce": bounce,
    "data-duration": duration,
    style: {
      willChange: "transform",
      opacity: fade ? 0 : 1,
      transform: [base, `translateY(${y}px)`].filter(Boolean).join(" "),
      ...baseVar(base),
    },
  };
}
