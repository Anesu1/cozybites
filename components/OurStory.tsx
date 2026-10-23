import { SECTION_IDS, site } from "@/content/site";
import { Button } from "./framer/Button";
import { FramerImage } from "./framer/FramerImage";
import { reveal } from "./framer/motion";
import { HIDE, T } from "./framer/tokens";

const { story } = site;

// Framer renders the story image once per breakpoint with different offsets.
const IMAGE_VARIANTS = [
  { hide: `${HIDE.phone} ${HIDE.tablet}`, base: "translate(-50%, -50%)", drop: -420, watermarkSize: 211 },
  { hide: `${HIDE.tablet} ${HIDE.desktop}`, base: "translateX(-50%)", drop: -220, watermarkSize: 122 },
  { hide: `${HIDE.phone} ${HIDE.desktop}`, base: "translateX(-50%)", drop: -320, watermarkSize: 243 },
];

const STATS = [
  { cls: "framer-1ag6d9n", num: "framer-1acimrl-container", label: "framer-njeavr" },
  { cls: "framer-1bkm7a0", num: "framer-19ffyjl-container", label: "framer-jr0vl3" },
  { cls: "framer-jqoyo2", num: "framer-1vtubsz-container", label: "framer-35naeg" },
];

function StoryImage({ hide, base, drop, watermarkSize }: (typeof IMAGE_VARIANTS)[number]) {
  return (
    <div className={`ssr-variant ${hide}`}>
      <div className="framer-1ocvej1" data-framer-name="Story Image" {...reveal(40)}>
        <FramerImage
          image={story.background}
          sizes="(min-width: 1470px) max((min(100vw - 120px, 1350px) - 96px) / 2, 1px), (min-width: 810px) min(100vw - 80px, 1350px), min(100vw - 40px, 1350px)"
        />
        <div className="framer-7w26ks" data-framer-name="Story Image Wrapper" {...reveal(drop, { fade: false, base, bounce: 0.2, duration: 1.2 })}>
          <FramerImage image={story.feature} sizes="(min-width: 1470px) 518px, (min-width: 810px) 482px, 308px" fit="contain" />
        </div>
        <div className="framer-ci194z" data-framer-component-type="RichTextContainer" aria-hidden="true" style={{ transform: "translateX(-50%)" }}>
          <p
            dir="auto"
            className="framer-text"
            style={{
              ["--font-selector" as string]: "SW50ZXItQm9sZA==",
              ["--framer-font-open-type-features" as string]: "'blwf' on, 'cv03' on, 'cv04' on, 'cv09' on, 'cv11' on",
              ["--framer-font-size" as string]: `${watermarkSize}px`,
              ["--framer-font-weight" as string]: "700",
              ["--framer-letter-spacing" as string]: "-0.04em",
              ["--framer-line-height" as string]: "1em",
              ["--framer-text-alignment" as string]: "center",
              ["--framer-text-color" as string]: T.ink,
            }}
          >
            <span data-text-fill="true" className="framer-text" style={{ backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)" }}>
              {story.watermark}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export function OurStory() {
  return (
    <section className="framer-1e27i55 cb-section" data-framer-name="Our Story" id={SECTION_IDS.story} aria-labelledby="story-title">
      <div className="framer-mpfb5x" data-framer-name="Container">
        {IMAGE_VARIANTS.map((v) => (
          <StoryImage key={v.drop} {...v} />
        ))}
        <div className="framer-2lfhyu" data-framer-name="Content">
          <div className="framer-7wth41" data-framer-name="Copy">
            <div className="framer-1ob52tz" data-framer-name="Eyebrow" data-framer-component-type="RichTextContainer" {...reveal(60)}>
              <p className="framer-text framer-styles-preset-1iaotnv" data-styles-preset="UzCysHCcG" dir="auto" style={{ ["--framer-text-alignment" as string]: "start", ["--framer-text-color" as string]: T.accent }}>
                {story.eyebrow}
              </p>
            </div>
            <div className="framer-umvoxf" data-framer-name="Heading" data-framer-component-type="RichTextContainer" {...reveal(80)}>
              <h2 id="story-title" className="framer-text framer-styles-preset-1ij80xw" data-styles-preset="bsqAIcvps" dir="auto" style={{ ["--framer-text-alignment" as string]: "start" }}>
                {story.title[0]}
                <br className="framer-text" />
                {story.title[1]}
              </h2>
            </div>
            <div className="framer-1ebso5u" data-framer-name="Body" data-framer-component-type="RichTextContainer" {...reveal(60)}>
              {story.body.map((p) => (
                <p key={p.slice(0, 24)} className="framer-text framer-styles-preset-ai9ovg" data-styles-preset="D9KZGcc5M" dir="auto" style={{ ["--framer-text-alignment" as string]: "start" }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
          <ul className="framer-28s881" data-border="true" data-framer-name="Highlights" {...reveal(60)}>
            {story.highlights.map((h, i) => (
              <li key={h.value} className={STATS[i].cls} data-framer-name={`Highlight / ${h.value}`}>
                <div className={STATS[i].num} data-framer-name="Value">
                  <span className="cb-stat-value">{h.value}</span>
                </div>
                <div className={STATS[i].label} data-framer-name="Label" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                  <p className="framer-text framer-styles-preset-1kx48xn" data-styles-preset="XlI5Vu_OU" dir="auto">
                    {h.label}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="framer-eqvp3y-container" data-framer-name="Story Button" {...reveal(60)}>
            <Button label={story.cta.label} href={story.cta.href} variant="primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
