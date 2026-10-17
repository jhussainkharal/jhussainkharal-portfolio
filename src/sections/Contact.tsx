import { motion } from "framer-motion";
import { EASE, viewportOnce } from "@/animations/motion";
import { MaskText } from "@/components/Reveal";
import { contact, identity } from "@/data/site";

/**
 * Contact — giant noir CTA.
 */
export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-noir px-5 py-28 md:px-10 md:py-44">
      <div className="glow-cobalt pointer-events-none absolute top-1/2 left-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 opacity-70" />
      <div className="relative mx-auto max-w-[1400px] text-center">
        <motion.p
          className="label mb-8 text-cobalt-bright"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
        >
          04 — Contact
        </motion.p>
        <h2 className="font-display text-[13vw] leading-[0.95] text-white md:text-[8vw]">
          {contact.heading.map((line, i) => (
            <MaskText key={line} delay={i * 0.08}>
              {line}
            </MaskText>
          ))}
        </h2>
        <motion.p
          className="mx-auto mt-8 max-w-xl leading-relaxed text-ash"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        >
          {contact.support}
        </motion.p>
        <motion.div
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
        >
          <a
            href={`mailto:${identity.email}`}
            className="group relative overflow-hidden bg-cobalt px-10 py-4"
          >
            <span className="label relative z-10 text-white">Send Email ↗</span>
            <span className="absolute inset-0 origin-left scale-x-0 bg-cobalt-deep transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </a>
          <a
            href={identity.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="label border border-line px-10 py-4 text-ash transition-colors duration-300 hover:border-cobalt-bright hover:text-white"
          >
            Instagram ↗
          </a>
        </motion.div>
        <motion.p
          className="label mt-10 text-dim"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {identity.email}
        </motion.p>
      </div>
    </section>
  );
}
