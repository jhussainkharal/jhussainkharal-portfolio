import { identity } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-noir px-5 py-10 md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <a href="#top" className="font-display text-2xl tracking-wide text-cobalt-bright">
          {identity.monogram}
        </a>
        <p className="label text-dim">
          © 2026 {identity.brand} — {identity.location}
        </p>
        <a href="#top" className="label text-dim transition-colors hover:text-white">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
