import type { Metadata, Viewport } from "next";
import { contact, site } from "@/content/site";
import "./framer.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.seo.title,
  description: site.seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.seo.socialTitle,
    description: site.seo.socialDescription,
    locale: "en_ZW",
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.socialTitle,
    description: site.seo.socialDescription,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0e0f" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: site.name,
  url: site.url,
  description: site.seo.description,
  image: `${site.url}/opengraph-image.jpg`,
  telephone: contact.phoneDisplay,
  email: contact.email,
  address: { "@type": "PostalAddress", addressLocality: "Bulawayo", addressCountry: "ZW" },
  servesCuisine: "Desserts",
};

// Without JavaScript, show everything in its final position instead of the animation start state.
const noScriptCss =
  "[data-appear],[data-reveal]{opacity:1!important;transform:none!important}" +
  "[data-base]{transform:var(--cb-base)!important}";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <noscript>
          <style>{noScriptCss}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
