/**
 * Noir marquee strip — oversized condensed type scrolling infinitely.
 */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line bg-noir py-5 md:py-7">
      <div className="animate-marquee flex w-max items-center gap-8 pr-8">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-8" aria-hidden={half === 1}>
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center gap-8">
                <span className="font-display text-4xl whitespace-nowrap text-white/90 md:text-6xl">
                  {item}
                </span>
                <span className="h-3 w-3 rotate-45 bg-cobalt" aria-hidden />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
