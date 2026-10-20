import { motion } from "framer-motion";
import { EASE, viewportOnce } from "@/animations/motion";
import { Magnetic } from "@/components/Magnetic";
import { MaskText } from "@/components/Reveal";
import { contact, identity } from "@/data/site";

const channels = [
  {
    label: "EMAIL",
    value: identity.email,
    href: `mailto:${identity.email}`,
    external: false,
  },
  {
    label: "INSTAGRAM",
    value: `@${identity.instagram.handle}`,
    href: identity.instagram.url,
    external: true,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-5 pt-28 pb-20 sm:px-8 md:pt-40 md:pb-28"
      aria-label="Contact"
    >
      <div
        aria-hidden
        className="glow-blue pointer-events-none absolute bottom-[-30%] left-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 opacity-60"
      />

      <div className="relative mx-auto w-full max-w-[1500px]">
        <h2>
          <MaskText
            lines={contact.heading}
            className="font-display text-[clamp(2.6rem,9vw,9rem)] leading-[0.92] text-ivory"
          />
        </h2>

        <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <motion.p
            className="max-w-md text-base leading-relaxed text-ash md:text-[17px]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {contact.support}
          </motion.p>

          <Magnetic strength={18}>
            <motion.a
              href={`mailto:${identity.email}`}
              data-cursor="hover"
              className="group glass inline-flex items-center gap-5 rounded-full py-5 pr-6 pl-8 transition-colors duration-500 hover:border-accent/50"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <span className="wordmark text-xl text-ivory sm:text-2xl">
                LET'S TALK
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/90 text-base text-white transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </motion.a>
          </Magnetic>
        </div>

        {/* Channels */}
        <ul className="mt-16 border-t border-white/10 md:mt-24">
          {channels.map((channel, i) => (
            <motion.li
              key={channel.label}
              className="border-b border-white/10"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: i * 0.1, duration: 0.8, ease: EASE }}
            >
              <a
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noreferrer noopener" : undefined}
                className="group relative flex items-center justify-between gap-5 overflow-hidden py-7 md:py-10"
              >
                {/* Blue wash on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-accent/14 to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100"
                />
                <span className="relative flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-7">
                  <span className="label w-28">{channel.label}</span>
                  <span className="text-lg break-all text-ivory transition-transform duration-500 group-hover:translate-x-1 sm:text-2xl md:text-3xl">
                    {channel.value}
                  </span>
                </span>
                <span className="relative font-mono text-sm text-dim transition-all duration-500 group-hover:translate-x-1 group-hover:text-accent-soft">
                  ↗
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
