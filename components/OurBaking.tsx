import { SECTION_IDS, site } from "@/content/site";
import { Button } from "./framer/Button";
import { FramerImage } from "./framer/FramerImage";
import { reveal } from "./framer/motion";
import { T } from "./framer/tokens";

const { baking } = site;

export function OurBaking() {
  return (
    <section className="framer-lsedg4 cb-section" data-framer-name="Our Baking" id={SECTION_IDS.baking} aria-labelledby="baking-title">
      <FramerImage image={baking.background} sizes="100vw" />
      <div className="framer-zlmj5f" data-framer-name="Text Readability Overlay" />
      <div className="framer-hkfl6s" data-framer-name="Container">
        <div className="cb-baking-copy">
          <div className="cb-eyebrow" data-framer-component-type="RichTextContainer" {...reveal(60)}>
            <p className="framer-text framer-styles-preset-1iaotnv" data-styles-preset="UzCysHCcG" dir="auto" style={{ ["--framer-text-alignment" as string]: "start", ["--framer-text-color" as string]: T.white }}>
              {baking.eyebrow}
            </p>
          </div>
          <div className="framer-18suuv9" data-framer-name="Heading" data-framer-component-type="RichTextContainer" {...reveal(80)}>
            <h2 id="baking-title" className="framer-text framer-styles-preset-11a7u2k" data-styles-preset="iwdVF3KiJ" dir="auto" style={{ ["--framer-text-alignment" as string]: "start", ["--framer-text-color" as string]: T.white }}>
              {baking.title[0]}
              <br className="framer-text" />
              {baking.title[1]}
            </h2>
          </div>
          <div className="cb-baking-body" data-framer-component-type="RichTextContainer" {...reveal(60)}>
            {baking.body.map((p) => (
              <p key={p.slice(0, 24)} className="framer-text framer-styles-preset-ai9ovg" data-styles-preset="D9KZGcc5M" dir="auto" style={{ ["--framer-text-alignment" as string]: "start", ["--framer-text-color" as string]: T.white }}>
                {p}
              </p>
            ))}
          </div>
        </div>
        <div className="framer-3pq9m8-container" data-framer-name="Order Button" {...reveal(60)}>
          <Button label={baking.cta.label} href={baking.cta.href} variant="primaryFixed" />
        </div>
      </div>
    </section>
  );
}
