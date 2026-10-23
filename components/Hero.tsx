import { site } from "@/content/site";
import { Button } from "./framer/Button";
import { FramerImage } from "./framer/FramerImage";
import { appear } from "./framer/motion";
import { HIDE, T } from "./framer/tokens";
import { Navigation, NavCta, NavLinks, NavLogo, PhoneNavigation } from "./Navigation";

const { hero } = site;

function MarqueeTrack({ fontSize }: { fontSize: number }) {
  const text = (cls: string, name: string, hidden?: boolean) => (
    <div className={cls} data-framer-name={name} data-framer-component-type="RichTextContainer" aria-hidden={hidden || undefined} style={{ transform: "none" }}>
      <p
        dir="auto"
        className="framer-text"
        style={{
          ["--font-selector" as string]: "SW50ZXItQm9sZA==",
          ["--framer-font-open-type-features" as string]: "'blwf' on, 'cv03' on, 'cv04' on, 'cv09' on, 'cv11' on",
          ["--framer-font-size" as string]: `${fontSize}px`,
          ["--framer-font-weight" as string]: "700",
          ["--framer-letter-spacing" as string]: "-0.04em",
          ["--framer-line-height" as string]: "1em",
          ["--framer-text-alignment" as string]: "center",
          ["--framer-text-color" as string]: T.ink,
          ["--framer-text-transform" as string]: "uppercase",
        }}
      >
        <span
          data-text-fill="true"
          className="framer-text"
          style={{ backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0) 14.9515%, rgb(0, 0, 0) 100%)" }}
        >
          {site.marquee}
        </span>
      </p>
    </div>
  );
  return (
    <div className="framer-17q4w7b" data-framer-name="Track" data-ticker="" style={{ opacity: 1, transform: "translateY(-50%)" }}>
      {text("framer-1ipnuk", "Marquee Text 1")}
      {text("framer-5xqb3v", "Marquee Text 2", true)}
    </div>
  );
}

function HeroBottom() {
  const eyebrow = appear({ y: 80, delay: 0.3 });
  const title = appear({ y: 80, delay: 0.35 });
  const text = appear({ y: 60, delay: 0.5 });
  const cta = appear({ y: 60, delay: 0.6 });
  return (
    <div className="framer-1h8vgbj" data-framer-name="Hero Bottom">
      <div className="framer-1k3p6pw" data-framer-name="Hero Content">
        <div className="framer-5b4lke" data-framer-name="Hero Copy">
          <div className="cb-hero-eyebrow" data-framer-component-type="RichTextContainer" {...eyebrow}>
            <p
              className="framer-text framer-styles-preset-1iaotnv"
              data-styles-preset="UzCysHCcG"
              dir="auto"
              style={{ ["--framer-text-alignment" as string]: "start", ["--framer-text-color" as string]: T.inkFixed }}
            >
              {hero.eyebrow}
            </p>
          </div>
          <div className="framer-htzpi2" data-framer-component-type="RichTextContainer" {...title}>
            <h1
              className="framer-text framer-styles-preset-1ytaaxo"
              data-styles-preset="BgVEqIBMj"
              dir="auto"
              style={{ ["--framer-text-alignment" as string]: "start", ["--framer-text-color" as string]: T.inkFixed }}
            >
              {hero.title[0]}
              <br className="framer-text" />
              {hero.title[1]}
            </h1>
          </div>
        </div>
      </div>
      <div className="framer-1tdmyqp" data-framer-name="Subtext, Button">
        <div className="framer-3ztcb3" data-framer-name="Hero Subtext" data-framer-component-type="RichTextContainer" {...text}>
          <p
            className="framer-text framer-styles-preset-ai9ovg"
            data-styles-preset="D9KZGcc5M"
            dir="auto"
            style={{ ["--framer-text-alignment" as string]: "start", ["--framer-text-color" as string]: T.inkFixed }}
          >
            {hero.text}
          </p>
        </div>
        <div className="framer-1sg7ne1-container" data-framer-name="Hero Button" {...cta}>
          <Button label={hero.cta.label} href={hero.cta.href} variant="primaryFixed" />
        </div>
      </div>
    </div>
  );
}

const CUP_SIZES = [
  "(min-width: 1470px) calc(min(100vw * 0.48, 1115px) * 0.65)",
  "(min-width: 810px) calc(min(100vw * 0.93, 1115px) * 0.65)",
  "calc(min(100vw * 1.3, 1115px) * 0.65)",
].join(", ");

function Treats() {
  const base = "translate(-50%, -50%)";
  const left = appear({ x: -1000, delay: 0.2, duration: 1.4, bounce: 0.15, fade: false, base });
  const right = appear({ x: 1000, rotate: 5, delay: 0.2, duration: 1.4, bounce: 0.15, fade: false, base });
  return (
    // The stage reserves the space between navigation and copy, so the treats never sit behind text.
    <div className="cb-hero-stage">
      <div className="framer-90omut" data-framer-name="Treats">
        <div className="framer-q6wq5" data-framer-name="Treat Image 1" {...left}>
          <FramerImage image={hero.treats[0]} sizes={CUP_SIZES} fit="contain" priority />
        </div>
        <div className="framer-tmaaa3" data-framer-name="Treat Image 2" {...right}>
          <FramerImage image={hero.treats[1]} sizes={CUP_SIZES} fit="contain" priority />
        </div>
      </div>
    </div>
  );
}

function HeroBackground() {
  return <FramerImage image={hero.background} sizes="100vw" priority />;
}

export function Hero() {
  return (
    <header id="top" className="contents">
      {/* Desktop + tablet */}
      <div className={`ssr-variant ${HIDE.phone}`}>
        <div className="framer-cp79ot" data-framer-name="Hero">
          <HeroBackground />
          <div className="framer-v899qy" data-framer-name="Marquee" aria-hidden="true">
            <div className={`ssr-variant ${HIDE.tablet}`}>
              <MarqueeTrack fontSize={180} />
            </div>
            <div className={`ssr-variant ${HIDE.desktop}`}>
              <MarqueeTrack fontSize={100} />
            </div>
          </div>
          <div className={`framer-4ncakz ${HIDE.desktop} ${HIDE.tablet}`} data-framer-name="Readability Fade" />
          <div className="framer-w6m3b4-container" data-framer-name="Navigation">
            <div className={`ssr-variant ${HIDE.tablet}`}>
              <Navigation variant="desktop" />
            </div>
            <div className={`ssr-variant ${HIDE.desktop}`}>
              <Navigation variant="tablet" />
            </div>
          </div>
          <HeroBottom />
          <Treats />
        </div>
      </div>

      {/* Phone */}
      <div className={`ssr-variant ${HIDE.tablet} ${HIDE.desktop}`}>
        <div className="framer-cp79ot" data-framer-name="Hero">
          <HeroBackground />
          <div className="framer-v899qy" data-framer-name="Marquee" aria-hidden="true">
            <MarqueeTrack fontSize={56} />
          </div>
          <div className={`framer-4ncakz ${HIDE.desktop} ${HIDE.tablet}`} data-framer-name="Readability Fade" />
          <div className="framer-w6m3b4-container" data-framer-name="Navigation">
            <PhoneNavigation logo={<NavLogo />} links={<NavLinks phone />} cta={<NavCta />} />
          </div>
          <HeroBottom />
          <Treats />
        </div>
      </div>
    </header>
  );
}
