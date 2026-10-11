import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/animations/motion";
import { identity } from "@/data/site";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Deliberately short opening curtain (~1.1s).
 * Skipped entirely for reduced-motion visitors.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(!reduced);

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }
    document.body.style.overflow = "hidden";
    const close = window.setTimeout(() => setOpen(false), 1050);
    const release = window.setTimeout(() => {
      document.body.style.overflow = "";
      onDone();
    }, 1500);
    return () => {
      window.clearTimeout(close);
      window.clearTimeout(release);
      document.body.style.overflow = "";
    };
  }, [reduced, onDone]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-obsidian"
          exit={{ y: "-100%", transition: { duration: 0.9, ease: EASE } }}
        >
          <div className="glow-blue pointer-events-none absolute h-[40vmax] w-[40vmax] opacity-60" />
          <motion.span
            className="wordmark relative text-5xl text-ivory sm:text-6xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {identity.monogram}
          </motion.span>
          <div className="relative mt-6 h-px w-40 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              style={{ transformOrigin: "left" }}
              transition={{ duration: 1, ease: EASE }}
            />
          </div>
          <motion.span
            className="label relative mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Loading experience
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
