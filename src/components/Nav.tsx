import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { identity } from "@/data/site";
import { cn } from "@/utils/cn";

const links = [
  { label: "WORK", href: "#work" },
  { label: "SERVICES", href: "#services" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

/**
 * Noir fixed navbar — cobalt wordmark left, small-caps links right,
 * cobalt hamburger on mobile. Matches the reference reel's top bar.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[70] transition-all duration-500",
          scrolled || open ? "bg-noir/85 backdrop-blur-md" : "bg-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10 md:py-5"
        >
          <a href="#top" aria-label={`${identity.brand} — back to top`}>
            <span className="font-display text-2xl tracking-wide text-cobalt-bright md:text-3xl">
              {identity.monogram}
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {links.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="label text-ash transition-colors duration-300 hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile trigger — cobalt hamburger like the reference */}
          <button
            type="button"
            className="flex flex-col items-end gap-[7px] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn(
                  "block h-[2px] bg-cobalt-bright transition-all duration-300",
                  i === 0 && "w-7",
                  i === 1 && "w-5",
                  i === 2 && "w-7",
                  open && i === 0 && "w-7 translate-y-[9px] rotate-45",
                  open && i === 1 && "w-7 opacity-0",
                  open && i === 2 && "w-7 -translate-y-[9px] -rotate-45"
                )}
              />
            ))}
          </button>
        </nav>
        <div className="hairline opacity-60" />
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[69] flex flex-col justify-center bg-noir/97 px-8 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="glow-cobalt pointer-events-none absolute top-1/3 left-1/2 h-[80vw] w-[80vw] -translate-x-1/2 -translate-y-1/2" />
            <ul className="relative space-y-2">
              {links.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display block py-2 text-6xl text-white"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{
                      delay: 0.05 * i,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="relative mt-10">
              <div className="hairline mb-5" />
              <p className="label text-dim">{identity.location}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
