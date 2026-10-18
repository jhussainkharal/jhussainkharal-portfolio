import { motion } from "framer-motion";
import { identity } from "@/data/site";
import { SecretReveal } from "@/components/SecretReveal";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Noir hero — clean full-viewport dark stage.
 * Secret-reveal portrait floating on black with a whisper of cobalt glow.
 * No panel, no ring — the photo melts into the dark.
 */
export function Hero({ ready }: { ready: boolean }) {
  return (
    <section id="top" className="relative flex min-h-svh flex-col overflow-hidden bg-noir">
      {/* Whisper of cobalt glow behind the portrait */}
      <motion.div
        aria-hidden
        className="glow-cobalt pointer-events-none absolute top-1/2 left-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 opacity-50"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 0.5 } : {}}
        transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
      />

      {/* Secret Reveal portrait */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, y: 40 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
      >
        <SecretReveal className="h-[52vh] w-[68vw] max-w-[360px] md:h-[66vh] md:w-[48vh] md:max-w-none" />
      </motion.div>

      {/* Cinematic vignette */}
      <div className="vignette pointer-events-none absolute inset-0" />

      {/* Bottom-left text block */}
      <motion.div
        className="absolute bottom-24 left-5 md:bottom-12 md:left-10"
        initial={{ opacity: 0, y: 24 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
      >
        <div className="mb-4 h-[3px] w-10 bg-cobalt-bright" />
        <p className="label mb-3 text-cobalt-bright">{identity.title}</p>
        <h1 className="font-display text-[13vw] leading-[0.92] text-white md:text-[7.5vw]">
          RAI JAWAD
          <br />
          HUSSAIN KHARAL
        </h1>
        <div className="label mt-5 flex gap-6 text-dim">
          <a
            href={identity.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-white"
          >
            Instagram
          </a>
          <a
            href={`mailto:${identity.email}`}
            className="transition-colors hover:text-white"
          >
            Email
          </a>
        </div>
      </motion.div>

      {/* Bottom-right */}
      <motion.div
        className="absolute right-5 bottom-8 left-5 flex items-end justify-between md:right-10 md:bottom-12 md:left-auto md:block md:text-right"
        initial={{ opacity: 0, y: 24 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
      >
        <a
          href="#work"
          className="label text-cobalt-bright transition-colors hover:text-white"
        >
          View Work ↗
        </a>
        <p className="label mt-0 text-dim/70 md:mt-4">
          © 2026 {identity.brand}. All rights reserved.
        </p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="label text-dim">Scroll</span>
        <motion.span
          className="block h-10 w-px bg-gradient-to-b from-cobalt-bright to-transparent"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
