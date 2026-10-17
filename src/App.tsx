import { useCallback, useState } from "react";
import { MotionConfig } from "framer-motion";
import { Cursor } from "@/components/Cursor";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { Preloader } from "@/components/Preloader";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { Hero } from "@/sections/Hero";
import { Services } from "@/sections/Services";
import { Welcome } from "@/sections/Welcome";
import { Work } from "@/sections/Work";

export function App() {
  const [ready, setReady] = useState(false);
  useSmoothScroll();

  const handleReady = useCallback(() => setReady(true), []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain relative min-h-screen bg-noir text-white">
        <Preloader onDone={handleReady} />
        <Cursor />

        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:bg-white focus:px-5 focus:py-2 focus:text-sm focus:text-noir"
        >
          Skip to work
        </a>

        <Nav />

        <main>
          <Hero ready={ready} />
          <Marquee
            items={[
              "Web Design",
              "AI Creative",
              "E-Commerce",
              "Motion",
              "Development",
            ]}
          />
          <Welcome />
          <Work />
          <Services />
          <About />
          <Contact />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
