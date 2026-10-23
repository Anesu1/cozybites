import type { CSSProperties } from "react";
import { T } from "./tokens";

export type ButtonVariant = "primary" | "primaryFixed" | "secondary";

// Mirrors the Framer "Button" component variants (hover states live in globals.css).
const VARIANTS: Record<ButtonVariant, { cls: string; name: string; bg: string; border: string; label: string }> = {
  primary: { cls: "framer-v-exxxj9", name: "Primary", bg: T.pink, border: T.pink, label: T.onPink },
  primaryFixed: { cls: "framer-v-1bu3nfh", name: "Primary Fixed", bg: T.pink, border: T.pink, label: T.onPink },
  secondary: { cls: "framer-v-j2tj7a", name: "Secondary", bg: T.surface, border: T.border, label: T.ink },
};

export function buttonStyle(bg: string, border: string): CSSProperties {
  return {
    ["--border-bottom-width" as string]: "1px",
    ["--border-color" as string]: border,
    ["--border-left-width" as string]: "1px",
    ["--border-right-width" as string]: "1px",
    ["--border-style" as string]: "solid",
    ["--border-top-width" as string]: "1px",
    backgroundColor: bg,
    borderRadius: 99,
  };
}

export function ButtonLabel({ label, color, classes }: { label: string; color: string; classes: [string, string, string, string] }) {
  const [clip, track, main, hover] = classes;
  const text = (cls: string, name: string, hidden?: boolean) => (
    <div
      className={cls}
      data-framer-name={name}
      data-framer-component-type="RichTextContainer"
      aria-hidden={hidden || undefined}
      style={{ ["--extracted-r6o4lv" as string]: color, transform: "none" }}
    >
      <p
        className="framer-text framer-styles-preset-1g6ft0q"
        data-styles-preset="yI1x4DlHF"
        dir="auto"
        style={{
          ["--framer-text-alignment" as string]: "center",
          ["--framer-text-color" as string]: `var(--extracted-r6o4lv, ${color})`,
        }}
      >
        {label}
      </p>
    </div>
  );
  return (
    <div className={clip} data-framer-name="Label Clip">
      <div className={track} data-framer-name="Label Track">
        {text(main, "Label")}
        {text(hover, "Label Hover", true)}
      </div>
    </div>
  );
}

export function Button({
  label,
  href,
  variant,
  external = false,
  ariaLabel,
}: {
  label: string;
  href: string;
  variant: ButtonVariant;
  external?: boolean;
  ariaLabel?: string;
}) {
  const v = VARIANTS[variant];
  return (
    <a
      className={`framer-FN12i framer-90xug framer-exxxj9 ${v.cls} framer-1p1xp1r`}
      data-border="true"
      data-framer-name={v.name}
      data-reset="button"
      href={href}
      aria-label={ariaLabel}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={buttonStyle(v.bg, v.border)}
    >
      <ButtonLabel label={label} color={v.label} classes={["framer-kypr4p", "framer-19yycb4", "framer-1lc5t0j", "framer-e6ksm9"]} />
    </a>
  );
}
