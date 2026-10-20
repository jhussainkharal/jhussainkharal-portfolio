import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { EASE } from "@/animations/motion";
import { identity } from "@/data/site";
import { useFinePointer } from "@/hooks/usePointerDevice";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Live local clock for Hafizabad (PKT) — a small honest detail. */
function useLocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Karachi",
        }).format(new Date()),
      );
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const time = useLocalTime();

  // Scroll-away: the title sinks and dims as the story begins.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Ambient light follows the pointer, slowly.
  const lightX = useSpring(0, { stiffness: 40, damping: 20 });
  const lightY = useSpring(0, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (!fine || reduced) return;
    const onMove = (e: MouseEvent) => {
      lightX.set((e.clientX / window.innerWidth - 0.5) * 120);
      lightY.set((e.clientY / window.innerHeight - 0.5) * 80);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [fine, reduced, lightX, lightY]);

  const show = ready ? "visible" : "hidden";
  const letters = identity.brand.split("");

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-10 sm:px-8"
      aria-label="Introduction"
    >
      {/* Atmospheric light */}
      <motion.div
        aria-hidden
        className="glow-blue pointer-events-none absolute top-[-10%] left-1/2 h-[90vmax] w-[90vmax] -translate-x-1/2 opacity-70"
        style={{ x: lightX, y: lightY }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(61,123,255,0.10),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-obsidian to-transparent"
      />

      <motion.div style={{ y, opacity }} className="relative">
        {/* Eyebrow */}
        <motion.div
          className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2"
          initial="hidden"
          animate={show}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.1, duration: 0.9 } },
          }}
        >
          <span className="label">Portfolio — {new Date().getFullYear()}</span>
          <span className="hidden h-px w-16 bg-white/15 sm:block" />
          <span className="label">{identity.location}</span>
        </motion.div>

        {/* Wordmark — per-letter masked reveal */}
        <h1 className="sr-only">
          {identity.brand} — {identity.title}
        </h1>
        <div
          aria-hidden
          className="relative flex overflow-hidden pb-[0.04em] leading-[0.84]"
        >
          {letters.map((char, i) => (
            <motion.span
              key={i}
              className="wordmark inline-block text-[clamp(1.9rem,9.7vw,10.5rem)] text-ivory"
              initial={{ y: "100%", opacity: 0 }}
              animate={
                ready
                  ? { y: "0%", opacity: 1 }
                  : { y: "100%", opacity: 0 }
              }
              transition={{
                duration: 1.1,
                ease: EASE,
                delay: 0.08 + i * 0.028,
              }}
            >
              {char}
            </motion.span>
          ))}
          {/* Slow light sweep across the wordmark */}
          {!reduced && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/12 to-transparent"
              initial={{ x: "-120%" }}
              animate={ready ? { x: "320%" } : {}}
              transition={{ delay: 1.1, duration: 1.8, ease: EASE }}
            />
          )}
        </div>

        {/* Title + statement */}
        <div className="mt-8 flex flex-col gap-8 border-t border-white/8 pt-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            className="font-mono text-[11px] tracking-[0.28em] text-accent-soft sm:text-xs"
            initial={{ opacity: 0, y: 14 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.9, ease: EASE }}
          >
            WEB DESIGNER / AI CREATIVE
          </motion.p>

          <motion.p
            className="max-w-xl text-lg leading-relaxed text-ash sm:text-xl md:text-right"
            initial={{ opacity: 0, y: 14 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.85, duration: 1, ease: EASE }}
          >
            {identity.statement}
          </motion.p>
        </div>

        {/* Footer rail */}
        <motion.div
          className="mt-10 flex items-end justify-between gap-6"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 1.1, duration: 1 }}
        >
          <a
            href="#intro"
            className="group flex items-center gap-3"
            aria-label="Scroll to the introduction"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-accent/60">
              <motion.span
                className="block h-2.5 w-2.5 border-r border-b border-ivory"
                style={{ rotate: 45 }}
                animate={reduced ? {} : { y: [-2, 2, -2] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
            <span className="label transition-colors group-hover:text-ivory">
              Scroll
            </span>
          </a>
          <span className="label hidden sm:block">
            {time && `${time} PKT`}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
