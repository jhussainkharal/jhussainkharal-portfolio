import { identity } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative border-t border-white/8 px-5 py-10 sm:px-8">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="wordmark text-lg text-ivory">{identity.brand}</p>
          <p className="mt-2 text-sm text-ash">{identity.fullName}</p>
          <p className="text-sm text-dim">{identity.title}</p>
          <p className="text-sm text-dim">{identity.location}</p>
        </div>

        <div className="flex flex-col gap-2 md:items-end">
          <a
            href={`mailto:${identity.email}`}
            className="text-sm break-all text-ash transition-colors hover:text-ivory"
          >
            {identity.email}
          </a>
          <a
            href={identity.instagram.url}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm text-ash transition-colors hover:text-ivory"
          >
            Instagram / @{identity.instagram.handle}
          </a>
          <a
            href={identity.github.url}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm text-ash transition-colors hover:text-ivory"
          >
            GitHub / @{identity.github.handle}
          </a>
          <a
            href={identity.linkedin.url}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm text-ash transition-colors hover:text-ivory"
          >
            LinkedIn / @{identity.linkedin.handle}
          </a>
          <p className="label mt-3">
            © {new Date().getFullYear()} {identity.brand}
          </p>
        </div>
      </div>
    </footer>
  );
}
