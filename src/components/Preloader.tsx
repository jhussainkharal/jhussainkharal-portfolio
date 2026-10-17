import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { identity } from "@/data/site";

/**
 * Short noir opening curtain (~1.4s).
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setGone(true), 1400);
    const t2 = setTimeout(onDone, 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-noir"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeOut" } }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-6xl tracking-wide text-white md:text-7xl"
          >
            {identity.monogram}
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 h-[3px] w-44 origin-left bg-cobalt"
          />
          <div className="label mt-5 text-dim">Web Designer / AI Creative</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
