/**
 * All site copy and imagery lives here. Components only handle layout,
 * so editing this file is enough for content updates.
 */

export type SiteImage = {
  /** Path prefix in /public; files are `${base}-${width}.webp`. */
  base: string;
  widths: number[];
  width: number;
  height: number;
  alt: string;
};

export type Link = { label: string; href: string; external?: boolean };

export const SECTION_IDS = {
  treats: "our-treats",
  story: "our-story",
  baking: "our-baking",
  order: "order",
} as const;

const phoneDisplay = "+263 713 162 871";
const phoneE164 = "+263713162871";
const email = "sanelisiweandrea@gmail.com";

export const contact = {
  location: "Bulawayo, Zimbabwe",
  phoneDisplay,
  phoneHref: `tel:${phoneE164}`,
  whatsappNumber: phoneE164.replace("+", ""),
  email,
  emailHref: `mailto:${email}`,
};

export const site = {
  name: "Cozy Bites",
  url: "https://www.cozybites.online",
  seo: {
    title: "Cozy Bites Bulawayo | Cupcakes, Brownies & Custom Cakes",
    description:
      "Discover handcrafted cupcakes, brownies, doughnuts and custom cakes at Cozy Bites in Bulawayo. Explore our treats and enquire about your next order.",
    socialTitle: "Cozy Bites — Sweet Treats in Bulawayo",
    socialDescription:
      "Explore handcrafted cupcakes, brownies, doughnuts and cakes for everyday treats, gifts and celebrations in Bulawayo, Zimbabwe.",
  },

  marquee: "Freshly baked treats • Cupcakes, brownies & cakes • Made with love in Bulawayo •",

  nav: {
    links: [
      { label: "Our Treats", href: `#${SECTION_IDS.treats}`, appearId: "zdylcs" },
      { label: "Our Story", href: `#${SECTION_IDS.story}`, appearId: "71pp3f" },
      { label: "Our Baking", href: `#${SECTION_IDS.baking}`, appearId: "3aubzz" },
    ],
    cta: { label: "Order Now", href: `#${SECTION_IDS.order}` },
  },

  hero: {
    eyebrow: "Cozy Bites · Bulawayo, Zimbabwe",
    title: ["Handcrafted cakes.", "Happier moments."] as [string, string],
    text: "Discover cupcakes, brownies, doughnuts and custom cakes in Bulawayo. From a little treat for yourself to something special for a celebration, Cozy Bites brings comfort and sweetness to every occasion.",
    cta: { label: "Explore Our Treats", href: `#${SECTION_IDS.treats}` },
    background: {
      base: "/images/hero-sky",
      widths: [512, 1024, 1672],
      width: 1672,
      height: 941,
      alt: "",
    } satisfies SiteImage,
    treats: [
      {
        base: "/images/hero-biscoff-cupcake",
        widths: [512, 1024, 1254],
        width: 1254,
        height: 1254,
        alt: "Biscoff cupcake with piped cream frosting and cookie crumbs",
      },
      {
        base: "/images/hero-vanilla-cupcake",
        widths: [512, 1024, 1254],
        width: 1254,
        height: 1254,
        alt: "Vanilla cupcake with swirled frosting and colourful sprinkles",
      },
    ] satisfies [SiteImage, SiteImage],
  },

  treats: {
    title: ["Your next favourite treat,", "baked with love."] as [string, string],
    text: "Explore our handcrafted bakery treats for birthdays, thoughtful gifts, celebrations and everyday cravings.",
    cta: { label: "View Full Menu", href: "/images/menu-1414.webp", external: true } satisfies Link,
    items: [
      {
        name: "Lotus Biscoff Cupcakes",
        description:
          "Cupcakes topped with Lotus Biscoff cream and cookie crumbles. A sweet choice for Biscoff lovers, birthday celebrations or a box worth sharing.",
        cta: { label: "Order Cupcakes", href: `#${SECTION_IDS.order}/lotus-biscoff-cupcakes` },
        image: {
          base: "/images/lotus-biscoff-cupcake",
          widths: [300, 600, 1254],
          width: 1254,
          height: 1254,
          alt: "Lotus Biscoff cupcake topped with cream and cookie crumbles from Cozy Bites in Bulawayo.",
        },
      },
      {
        name: "Vanilla Cupcakes",
        description:
          "Classic vanilla cupcakes finished with sweet frosting and colourful sprinkles. Simple, cheerful treats for gifting, parties and a little everyday indulgence.",
        cta: { label: "Order Cupcakes", href: `#${SECTION_IDS.order}/vanilla-cupcakes` },
        image: {
          base: "/images/vanilla-cupcake",
          widths: [300, 600, 1254],
          width: 1254,
          height: 1254,
          alt: "Cozy Bites vanilla cupcake with frosting and colourful sprinkles.",
        },
      },
      {
        name: "S’mores Brownies",
        description:
          "Fudgy chocolate brownies topped with marshmallows and cookie crumbs. A rich, chocolatey treat to enjoy yourself or share with someone special.",
        cta: { label: "Order Brownies", href: `#${SECTION_IDS.order}/smores-brownies` },
        image: {
          base: "/images/smores-brownie",
          widths: [300, 600, 1254],
          width: 1254,
          height: 1254,
          alt: "Fudgy chocolate brownie topped with cookie crumbs from Cozy Bites bakery.",
        },
      },
      {
        name: "Custom Celebration Cakes",
        description:
          "Make your celebration personal with a custom cake from Cozy Bites. Tell us about your occasion and preferred design, and ask about the options available for your date.",
        cta: { label: "Enquire About a Cake", href: `#${SECTION_IDS.order}/custom-celebration-cakes` },
        image: {
          base: "/images/celebration-cake",
          widths: [450, 900, 1536],
          width: 1536,
          height: 1024,
          alt: "Custom celebration sheet cake with pink piped flowers and butterflies, decorated by Cozy Bites in Bulawayo.",
        },
      },
    ] satisfies { name: string; description: string; cta: Link; image: SiteImage }[],
  },

  story: {
    eyebrow: "Our story",
    title: ["A little comfort,", "in every bite."] as [string, string],
    body: [
      "Cozy Bites began with a simple idea: to bake treats that bring people comfort and joy. Based in Bulawayo, Zimbabwe, we create handcrafted desserts for everyday enjoyment and life’s special occasions.",
      "From cupcakes and brownies to doughnuts and celebration cakes, our baking is about giving you something worth slowing down for. A thoughtful gift, a shared box or a cake at the centre of a celebration—there is a Cozy Bite for the moment.",
    ],
    highlights: [
      { value: "Handcrafted", label: "Treats made with care" },
      { value: "Bulawayo", label: "Our home in Zimbabwe" },
      { value: "Your occasion", label: "Custom cake enquiries" },
    ],
    cta: { label: "Discover Our Baking", href: `#${SECTION_IDS.baking}` },
    watermark: "cozy",
    background: {
      base: "/images/story-sky",
      widths: [512, 847, 1122],
      width: 1122,
      height: 1402,
      alt: "",
    } satisfies SiteImage,
    feature: {
      base: "/images/story-biscoff-cupcake",
      widths: [616, 1036, 1254],
      width: 1254,
      height: 1254,
      alt: "Biscoff cupcake with cookie crumbs floating against a blue sky",
    } satisfies SiteImage,
  },

  baking: {
    eyebrow: "Our baking",
    title: ["Made with care.", "Chosen for your moment."] as [string, string],
    body: [
      "Find something for your sweet tooth, a gift for someone you love or a treat to share. Explore our cupcakes, brownies, doughnuts and cakes, then contact Cozy Bites to confirm flavours, quantities and availability.",
      "Planning a celebration? Share your preferred design and date when you enquire about a custom order. Ask about collection and delivery options in Bulawayo.",
    ],
    cta: { label: "Order from Cozy Bites", href: `#${SECTION_IDS.order}` },
    background: {
      base: "/images/sharing-cupcakes",
      widths: [512, 1024, 1448],
      width: 1448,
      height: 1086,
      alt: "Two hands sharing Cozy Bites cupcakes across a sunlit outdoor table",
    } satisfies SiteImage,
  },

  footer: {
    tagline: "Handcrafted cupcakes, brownies, doughnuts and cakes in Bulawayo, Zimbabwe.",
    taglineDetail: "Sweet treats for everyday comfort, thoughtful gifts and special celebrations.",
    newsletter: {
      heading: "A little sweetness in your inbox.",
      description: "Sign up for Cozy Bites news, menu updates and special offers.",
      placeholder: "Your email address",
      button: "Sign Me Up",
    },
    columns: [
      {
        title: "Our Treats",
        links: [
          { label: "Cupcakes", href: `#${SECTION_IDS.treats}` },
          { label: "Brownies", href: `#${SECTION_IDS.treats}` },
          { label: "Doughnuts", href: `#${SECTION_IDS.order}/doughnuts` },
          { label: "Custom Cakes", href: `#${SECTION_IDS.order}/custom-celebration-cakes` },
        ],
      },
      {
        title: "Cozy Bites",
        links: [
          { label: "Our Story", href: `#${SECTION_IDS.story}` },
          { label: "Our Baking", href: `#${SECTION_IDS.baking}` },
          { label: "Order Now", href: `#${SECTION_IDS.order}` },
          { label: "Contact Us", href: contact.emailHref },
        ],
      },
    ] satisfies { title: string; links: Link[] }[],
    contactLabel: "Contact",
    contactLines: [
      { label: contact.location },
      { label: contact.phoneDisplay, href: contact.phoneHref },
      { label: contact.email, href: contact.emailHref },
    ] as { label: string; href?: string }[],
    wordmark: "Cozy Bites",
    copyright: "© 2026 Cozy Bites. All rights reserved.",
    credit: "Made with love in Bulawayo",
  },

  order: {
    title: "Order from Cozy Bites",
    text: "Message us to confirm flavours, quantities, your date and collection or delivery in Bulawayo.",
    whatsappLabel: "Order on WhatsApp",
    callLabel: `Call ${phoneDisplay}`,
    emailLabel: "Email us",
    /** Items selectable from `#order/<slug>` links. */
    items: {
      "lotus-biscoff-cupcakes": "Lotus Biscoff Cupcakes",
      "vanilla-cupcakes": "Vanilla Cupcakes",
      "smores-brownies": "S’mores Brownies",
      "custom-celebration-cakes": "Custom Celebration Cakes",
      doughnuts: "Doughnuts",
    } as Record<string, string>,
  },
};
