import { useCallback, useState } from "react";
import { MotionConfig } from "framer-motion";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { Preloader } from "@/components/Preloader";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { About } from "@/sections/About";
import { AILab } from "@/sections/AILab";
import { Capabilities } from "@/sections/Capabilities";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { Hero } from "@/sections/Hero";
import { Intro } from "@/sections/Intro";
import { Story } from "@/sections/Story";
import { WhatIBuild } from "@/sections/WhatIBuild";
import { Work } from "@/sections/Work";

export function App() {
  const [ready, setReady] = useState(false);
  useSmoothScroll();

  const handleReady = useCallback(() => setReady(true), []);

  return (
    // reducedMotion="user" lets Framer honour the OS preference automatically:
    // transforms are skipped, opacity-only changes remain.
    <MotionConfig reducedMotion="user">
    <div className="grain relative min-h-screen bg-obsidian text-ivory">
      <Preloader onDone={handleReady} />
      <Cursor />

      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:rounded-full focus:bg-ivory focus:px-5 focus:py-2 focus:text-sm focus:text-obsidian"
      >
        Skip to work
      </a>

      <Nav />

      <main>
        <Hero ready={ready} />
        <Intro />
        <WhatIBuild />
        <Work />
        <AILab />
        <Capabilities />
        <Story />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
    </MotionConfig>
  );
}

export default App;
