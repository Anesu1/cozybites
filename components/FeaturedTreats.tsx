import { SECTION_IDS, site } from "@/content/site";
import { Button } from "./framer/Button";
import { FramerImage } from "./framer/FramerImage";
import { reveal } from "./framer/motion";
import { HIDE, T } from "./framer/tokens";

const { treats } = site;

// Per-card Framer class names (layout + colour of each card come from framer.css).
const CARDS = [
  { card: "framer-czgqts", text: "framer-1b24bt6", title: "framer-14tipo0", desc: "framer-9iz3jz", btn: "framer-1e2k47q-container", wrap: "framer-1tgf1sd", img: "framer-7og43p" },
  { card: "framer-17rz4kq", text: "framer-1ost2mt", title: "framer-hchdlb", desc: "framer-n9n9p4", btn: "framer-fl39aa-container", wrap: "framer-15klhri", img: "framer-1gkejpc" },
  { card: "framer-1055yda", text: "framer-buacjz", title: "framer-16iwtzy", desc: "framer-g6d256", btn: "framer-rwgknb-container", wrap: "framer-oq7nr7", img: "framer-103ij1j" },
  { card: "framer-5a6e6c", text: "framer-5ondnv", title: "framer-fs84ht", desc: "framer-whifwx", btn: "framer-cu9d8s-container", wrap: "framer-kd5vm", img: "framer-1uavy1i" },
];

const PRODUCT_IMAGE_VARIANTS = [
  { hide: `${HIDE.phone} ${HIDE.tablet}`, y: 140 },
  { hide: `${HIDE.tablet} ${HIDE.desktop}`, y: 100 },
  { hide: `${HIDE.phone} ${HIDE.desktop}`, y: 120 },
];

export function FeaturedTreats() {
  return (
    <section className="framer-g3zstr cb-section" data-framer-name="Our Treats" id={SECTION_IDS.treats} aria-labelledby="treats-title">
      <div className="framer-1nj6yd8" data-framer-name="Container">
        <div className="framer-16nkrzx" data-framer-name="Header">
          <div className="cb-section-intro">
            <div className="framer-12v1mml" data-framer-name="Heading" data-framer-component-type="RichTextContainer" {...reveal(80)}>
              <h2 id="treats-title" className="framer-text framer-styles-preset-1ij80xw" data-styles-preset="bsqAIcvps" dir="auto" style={{ ["--framer-text-alignment" as string]: "start" }}>
                {treats.title[0]}
                <br className="framer-text" />
                {treats.title[1]}
              </h2>
            </div>
            <div className="cb-section-text" data-framer-component-type="RichTextContainer" {...reveal(60)}>
              <p className="framer-text framer-styles-preset-ai9ovg" data-styles-preset="D9KZGcc5M" dir="auto" style={{ ["--framer-text-alignment" as string]: "start" }}>
                {treats.text}
              </p>
            </div>
          </div>
          <div className="framer-dvrczh-container" data-framer-name="Menu Button" {...reveal(60)}>
            <Button label={treats.cta.label} href={treats.cta.href} external={treats.cta.external} variant="secondary" />
          </div>
        </div>
        <ul className="framer-cvtq12" data-framer-name="Cards">
          {treats.items.map((item, i) => {
            const c = CARDS[i];
            return (
              <li key={item.name} className={`${c.card} cb-card`} data-framer-name={`Card / ${item.name}`}>
                <div className={c.text} data-framer-name="Card Text" {...reveal(60)}>
                  <div className={c.title} data-framer-name="Title" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                    <h3 className="framer-text framer-styles-preset-a709wp" data-styles-preset="EyENBypc0" dir="auto" style={{ ["--framer-text-alignment" as string]: "start", ["--framer-text-color" as string]: T.inkFixed }}>
                      {item.name}
                    </h3>
                  </div>
                  <div className={c.desc} data-framer-name="Description" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                    <p className="framer-text framer-styles-preset-appsha" data-styles-preset="ubZIQPRPb" dir="auto" style={{ ["--framer-text-alignment" as string]: "start", ["--framer-text-color" as string]: T.inkFixed }}>
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className={c.btn} data-framer-name="Order Button" {...reveal(60)}>
                  <Button label={item.cta.label} href={item.cta.href} variant="secondary" ariaLabel={`${item.cta.label}: ${item.name}`} />
                </div>
                <div className={c.wrap} data-framer-name="Product Image Wrap">
                  {PRODUCT_IMAGE_VARIANTS.map((v, j) => (
                    <div key={j} className={`ssr-variant ${v.hide}`}>
                      <div className={`${c.img} cb-product-image`} data-framer-name="Product Image" {...reveal(v.y)}>
                        <FramerImage
                          image={item.image}
                          sizes="(min-width: 1470px) 300px, (min-width: 810px) 240px, 220px"
                          fit="contain"
                          position="center top"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
