import { FeaturedTreats } from "@/components/FeaturedTreats";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MotionRuntime } from "@/components/MotionRuntime";
import { OrderDialog } from "@/components/OrderDialog";
import { OurBaking } from "@/components/OurBaking";
import { OurStory } from "@/components/OurStory";

// Root classes come from the Framer export: they scope the design tokens and text presets in framer.css.
const FRAMER_ROOT =
  "framer-B15ZU framer-aHUSv framer-VTYBd framer-WJlhy framer-iCbkG framer-kRWhb framer-oQS4J framer-5SdxE framer-yzx0F framer-72rtr7";

export default function Home() {
  return (
    <div id="main">
      <div data-framer-root="" className={FRAMER_ROOT} style={{ minHeight: "100vh", width: "auto" }}>
        <Hero />
        <main className="contents">
          <FeaturedTreats />
          <OurStory />
          <OurBaking />
        </main>
        <Footer />
        <OrderDialog />
      </div>
      <MotionRuntime />
    </div>
  );
}
