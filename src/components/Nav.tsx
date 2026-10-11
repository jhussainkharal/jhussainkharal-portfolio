import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { EASE } from "@/animations/motion";
import { identity, navItems } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/utils/cn";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ids = useMemo(() => navItems.map((i) => i.href.slice(1)), []);
  const active = useActiveSection(ids);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + allow ESC while the full-screen menu is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* Reading progress — a single hair of blue light */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[65] h-px w-full origin-left bg-accent/70"
        style={{ scaleX: progress }}
      />

      <header className="fixed inset-x-0 top-0 z-[64] px-4 pt-4 sm:px-6 sm:pt-6">
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto flex max-w-[1500px] items-center justify-between rounded-full px-5 py-3 transition-all duration-500 sm:px-6",
            scrolled || open ? "glass-dim" : "border border-transparent",
          )}
        >
          <a
            href="#top"
            className="group flex items-baseline gap-2"
            aria-label={`${identity.brand} — back to top`}
          >
            <span className="wordmark hidden text-[13px] tracking-[0.05em] text-ivory lg:block">
              {identity.brand}
            </span>
            <span className="wordmark text-[15px] text-ivory lg:hidden">
              {identity.monogram}
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-accent transition-opacity duration-500 group-hover:opacity-40 lg:block" />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={cn(
                      "relative rounded-full px-3.5 py-1.5 font-mono text-[10.5px] tracking-[0.2em] transition-colors duration-300",
                      isActive
                        ? "text-ivory"
                        : "text-ash hover:text-ivory",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/[0.07] ring-1 ring-white/10"
                        transition={{ duration: 0.5, ease: EASE }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href="#contact"
            className="hidden rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-mono text-[10.5px] tracking-[0.2em] text-accent-soft transition-colors duration-300 hover:bg-accent/20 hover:text-ivory xl:block"
          >
            LET'S TALK
          </a>

          {/* Mobile trigger */}
          <button
            type="button"
            className="flex items-center gap-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="font-mono text-[10px] tracking-[0.22em] text-ash">
              {open ? "CLOSE" : "MENU"}
            </span>
            <span className="relative block h-3 w-5">
              <span
                className={cn(
                  "absolute left-0 block h-px w-full bg-ivory transition-all duration-300",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-px w-full bg-ivory transition-all duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* Full-screen cinematic mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[63] flex flex-col justify-between bg-obsidian/95 px-6 pt-28 pb-10 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="glow-blue pointer-events-none absolute -top-20 -right-24 h-[60vw] w-[60vw]" />
            <ul className="relative space-y-1">
              {navItems.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-1.5 font-display text-[clamp(2.2rem,10vw,4.5rem)] leading-[1.1] text-ivory"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ delay: 0.06 * i, duration: 0.7, ease: EASE }}
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="relative space-y-1">
              <div className="hairline mb-5" />
              <p className="label">{identity.location}</p>
              <a
                href={`mailto:${identity.email}`}
                className="block text-sm text-ash transition-colors hover:text-ivory"
              >
                {identity.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
