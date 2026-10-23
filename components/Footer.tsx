import { site } from "@/content/site";
import { reveal } from "./framer/motion";
import { HIDE, T } from "./framer/tokens";
import { NewsletterForm } from "./NewsletterForm";

const { footer } = site;

// Framer class names for the link rows of each column.
const COLUMN_CLASSES = [
  { col: "framer-c8lhyt", title: "framer-8oxj08", list: "framer-1jrzk9k", items: ["framer-1yoj9sf", "framer-1pwfoeo", "framer-199og0n", "framer-le2mxn"] },
  { col: "framer-1gytkzx", title: "framer-197edl3", list: "framer-1i3qlz0", items: ["framer-1gdt44", "framer-v6tls6", "framer-wxdczv", "framer-wxdczv"] },
];

const VARIANTS = {
  desktop: { cls: "framer-v-n4v55f", name: "Desktop" },
  tablet: { cls: "framer-v-10gx6vu", name: "Tablet" },
  phone: { cls: "framer-v-1dmqb4m", name: "Phone" },
};

/** Measured width of the wordmark at 16px (Inter Bold, -0.05em), used as the SVG viewBox. */
const WORDMARK_VIEWBOX = "0 0 81.2 16";

const textVars = {
  ["--extracted-r6o4lv" as string]: T.ink,
};
const pStyle = {
  ["--framer-text-alignment" as string]: "start",
  ["--framer-text-color" as string]: `var(--extracted-r6o4lv, ${T.ink})`,
};

function FooterLink({ cls, label, href }: { cls: string; label: string; href?: string }) {
  const r = reveal(40);
  const external = href?.startsWith("http");
  return (
    <li className={cls} data-framer-name={label} data-framer-component-type="RichTextContainer" {...r} style={{ ...textVars, ...r.style }}>
      <p className="framer-text framer-styles-preset-appsha" data-styles-preset="ubZIQPRPb" dir="auto" style={pStyle}>
        {href ? (
          <a
            className="framer-text framer-styles-preset-1dm14vt"
            data-styles-preset="eI5HH6uBM"
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
          >
            {label}
          </a>
        ) : (
          label
        )}
      </p>
    </li>
  );
}

function FooterVariant({ variant }: { variant: keyof typeof VARIANTS }) {
  const v = VARIANTS[variant];
  const small = (y: number) => {
    const r = reveal(y);
    return { ...r, style: { ...textVars, ...r.style } };
  };
  return (
    <footer className={`framer-eli3k framer-iCbkG framer-5SdxE framer-kRWhb framer-UDGyn framer-n4v55f ${v.cls}`} data-framer-name={v.name} style={{ backgroundColor: T.surface, width: "100%" }}>
      <div className="framer-14pi1jj" data-framer-name="Top">
        <div className="framer-1blzx63" data-framer-name="Brand">
          <div className="framer-18x2fvg" data-framer-name="Tagline" data-framer-component-type="RichTextContainer" {...reveal(60)}>
            <p className="framer-text framer-styles-preset-a709wp cb-footer-tagline" data-styles-preset="EyENBypc0" dir="auto" style={{ ["--framer-text-alignment" as string]: "start" }}>
              {footer.tagline}
            </p>
            <p className="framer-text framer-styles-preset-appsha cb-footer-detail" data-styles-preset="ubZIQPRPb" dir="auto" style={{ ["--framer-text-alignment" as string]: "start" }}>
              {footer.taglineDetail}
            </p>
          </div>
          <div className="framer-198lhdi" data-framer-name="Newsletter">
            <div className="framer-1spomj3" data-framer-name="Label" data-framer-component-type="RichTextContainer" {...small(40)}>
              <h2 className="framer-text framer-styles-preset-1kx48xn cb-newsletter-heading" data-styles-preset="XlI5Vu_OU" dir="auto" style={pStyle}>
                {footer.newsletter.heading}
              </h2>
              <p className="framer-text framer-styles-preset-1kx48xn cb-newsletter-text" data-styles-preset="XlI5Vu_OU" dir="auto" style={pStyle}>
                {footer.newsletter.description}
              </p>
            </div>
            <NewsletterForm motion={reveal(40)} />
          </div>
        </div>
        {footer.columns.map((column, ci) => {
          const c = COLUMN_CLASSES[ci];
          return (
            <nav key={column.title} className={c.col} data-framer-name={column.title} aria-label={column.title}>
              <div className={c.title} data-framer-name="Title" data-framer-component-type="RichTextContainer" {...reveal(50)}>
                <h2 className="framer-text framer-styles-preset-a709wp" data-styles-preset="EyENBypc0" dir="auto" style={{ ["--framer-text-alignment" as string]: "start" }}>
                  {column.title}
                </h2>
              </div>
              <ul className={c.list} data-framer-name="Links">
                {column.links.map((link, li) => (
                  <FooterLink key={link.label} cls={c.items[li]} label={link.label} href={link.href} />
                ))}
              </ul>
              {ci === 1 && (
                <div className="framer-6r7bla" data-framer-name="Contact">
                  <div className="framer-x2yxig" data-framer-name="Label" data-framer-component-type="RichTextContainer" {...small(40)}>
                    <h3 className="framer-text framer-styles-preset-1kx48xn" data-styles-preset="XlI5Vu_OU" dir="auto" style={pStyle}>
                      {footer.contactLabel}
                    </h3>
                  </div>
                  <address className="cb-contact">
                    <ul className="framer-1i3qlz0" data-framer-name="Contact Details">
                      {footer.contactLines.map((line) => (
                        <FooterLink key={line.label} cls="framer-wxdczv" label={line.label} href={line.href} />
                      ))}
                    </ul>
                  </address>
                </div>
              )}
            </nav>
          );
        })}
      </div>
      <svg className="framer-1jld8y9" data-framer-name="Wordmark" data-fit-text="" viewBox={WORDMARK_VIEWBOX} aria-hidden="true" {...small(120)}>
        <foreignObject width="100%" height="100%" className="framer-fit-text" style={{ overflow: "visible", transformOrigin: "center center" }}>
          <p
            dir="auto"
            className="framer-text"
            style={{
              ["--font-selector" as string]: "SW50ZXItQm9sZA==",
              ["--framer-font-weight" as string]: "700",
              ["--framer-letter-spacing" as string]: "-0.05em",
              ["--framer-line-height" as string]: "1em",
              ["--framer-text-color" as string]: `var(--extracted-r6o4lv, ${T.ink})`,
            }}
          >
            {footer.wordmark}
          </p>
        </foreignObject>
      </svg>
      <div className="framer-15h78b9" data-framer-name="Bottom">
        <div className="framer-v6d638" data-framer-name="Copyright" data-framer-component-type="RichTextContainer" {...small(20)}>
          <p className="framer-text framer-styles-preset-1kx48xn" data-styles-preset="XlI5Vu_OU" dir="auto" style={pStyle}>
            {footer.copyright}
          </p>
        </div>
        <div className="framer-1g8c7vx" data-framer-name="Credit" data-framer-component-type="RichTextContainer" {...small(20)}>
          <p className="framer-text framer-styles-preset-1kx48xn" data-styles-preset="XlI5Vu_OU" dir="auto" style={pStyle}>
            {footer.credit}
          </p>
        </div>
      </div>
    </footer>
  );
}

export function Footer() {
  return (
    <>
      <div className={`ssr-variant ${HIDE.phone}`}>
        <div className="framer-10t1bwp-container" data-framer-name="Footer">
          <div className={`ssr-variant ${HIDE.tablet}`}>
            <FooterVariant variant="desktop" />
          </div>
          <div className={`ssr-variant ${HIDE.desktop}`}>
            <FooterVariant variant="tablet" />
          </div>
        </div>
      </div>
      <div className={`ssr-variant ${HIDE.tablet} ${HIDE.desktop}`}>
        <div className="framer-10t1bwp-container" data-framer-name="Footer">
          <FooterVariant variant="phone" />
        </div>
      </div>
    </>
  );
}
