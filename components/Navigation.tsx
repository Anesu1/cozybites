import { site } from "@/content/site";
import { Button } from "./framer/Button";
import { appear } from "./framer/motion";
import { T } from "./framer/tokens";
import { PhoneNavigation } from "./PhoneNavigation";

const NAV_DELAYS = [0.18, 0.24, 0.3];

export function NavLogo() {
  const a = appear({ y: -30, delay: 0.1 });
  return (
    <div
      className="framer-12oiloh"
      data-framer-name="Logo"
      data-framer-component-type="RichTextContainer"
      {...a}
      style={{ ["--extracted-r6o4lv" as string]: T.white, ...a.style }}
    >
      <p
        dir="auto"
        className="framer-text"
        style={{
          ["--font-selector" as string]: "SW50ZXItQm9sZA==",
          ["--framer-font-size" as string]: "30px",
          ["--framer-font-weight" as string]: "700",
          ["--framer-text-color" as string]: `var(--extracted-r6o4lv, ${T.white})`,
        }}
      >
        <a className="framer-text framer-styles-preset-1tau0gs" data-styles-preset="iURMpxrm8" href="#top" data-framer-page-link-current="true">
          {site.name}
        </a>
      </p>
    </div>
  );
}

export function NavLinks({ phone = false }: { phone?: boolean }) {
  return (
    <div className="framer-1et8a1q" data-framer-name="Links">
      {site.nav.links.map((link, i) => {
        const a = appear({ y: -30, delay: NAV_DELAYS[i] });
        const Tag = phone ? "h4" : "p";
        return (
          <div
            key={link.href}
            className={`framer-${link.appearId}`}
            data-framer-name={link.label}
            data-framer-component-type="RichTextContainer"
            {...a}
            style={{
              ["--extracted-r6o4lv" as string]: T.white,
              ...(phone ? { ["--extracted-1eung3n" as string]: T.white } : {}),
              ...a.style,
            }}
          >
            <Tag
              className={`framer-text ${phone ? "framer-styles-preset-yf00jp" : "framer-styles-preset-9qpcrl"}`}
              data-styles-preset={phone ? "RVzKU1VHU" : "MPt8OVbUz"}
              dir="auto"
              style={{
                ["--framer-text-alignment" as string]: "start",
                ["--framer-text-color" as string]: `var(${phone ? "--extracted-1eung3n" : "--extracted-r6o4lv"}, ${T.white})`,
              }}
            >
              <a className="framer-text framer-styles-preset-1tau0gs" data-styles-preset="iURMpxrm8" href={link.href}>
                {link.label}
              </a>
            </Tag>
          </div>
        );
      })}
    </div>
  );
}

export function NavCta() {
  const a = appear({ y: -30, delay: 0.42 });
  return (
    <div className="framer-nloonb-container" data-framer-name="Order Button" {...a}>
      <Button label={site.nav.cta.label} href={site.nav.cta.href} variant="primaryFixed" />
    </div>
  );
}

/** Desktop and tablet navigation share markup; only the variant class differs. */
export function Navigation({ variant }: { variant: "desktop" | "tablet" }) {
  return (
    <nav
      aria-label="Main"
      className={`framer-8pKTs framer-r0wxg framer-Jagek framer-fd5r3 framer-hnwfpl ${variant === "desktop" ? "framer-v-hnwfpl" : "framer-v-1tdgx31"}`}
      data-framer-name={variant === "desktop" ? "Desktop" : "Tablet"}
      style={{ backgroundColor: "rgba(0, 0, 0, 0)", width: "100%" }}
    >
      <div className="framer-1hunuqo" data-framer-name="Logo, Menu">
        <NavLogo />
      </div>
      <NavLinks />
      <NavCta />
    </nav>
  );
}

export { PhoneNavigation };
