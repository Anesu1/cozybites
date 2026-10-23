import type { CSSProperties } from "react";
import type { SiteImage } from "@/content/site";

/** Framer's absolutely-positioned background image wrapper. */
export function FramerImage({
  image,
  sizes,
  fit = "cover",
  position = "center",
  priority = false,
}: {
  image: SiteImage;
  sizes: string;
  fit?: CSSProperties["objectFit"];
  position?: string;
  priority?: boolean;
}) {
  const srcSet = image.widths.map((w) => `${image.base}-${w}.webp ${w}w`).join(",");
  const largest = image.widths[image.widths.length - 1];
  return (
    <div
      style={{ position: "absolute", borderRadius: "inherit", inset: 0 }}
      data-framer-background-image-wrapper="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized WebP variants */}
      <img
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        width={image.width}
        height={image.height}
        sizes={sizes}
        srcSet={srcSet}
        src={`${image.base}-${largest}.webp`}
        alt={image.alt}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          borderRadius: "inherit",
          objectPosition: position,
          objectFit: fit,
        }}
      />
    </div>
  );
}
