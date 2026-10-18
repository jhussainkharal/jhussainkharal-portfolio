import { useEffect, useRef } from "react";

/**
 * Cursor-driven 3D portrait.
 * A pre-rendered 360° frame sequence is scrubbed by the cursor's
 * horizontal position across the WHOLE viewport (not just the photo),
 * with idle auto-rotation and touch support for mobile.
 */
const modules = import.meta.glob<string>("/src/assets/rotation/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});
const FRAMES: string[] = Object.keys(modules)
  .sort()
  .map((k) => modules[k]);

export function RotatingPortrait({ className = "" }: { className?: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const target = useRef(0.5);
  const current = useRef(0.5);
  const auto = useRef(true);
  const idleTimer = useRef<number | null>(null);

  useEffect(() => {
    // Preload all frames up front for butter-smooth scrubbing.
    FRAMES.forEach((src) => {
      const im = new Image();
      im.src = src;
    });

    const poke = (clientX: number) => {
      auto.current = false;
      target.current = Math.min(Math.max(clientX / window.innerWidth, 0), 1);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => {
        auto.current = true;
      }, 2500);
    };

    const onMouse = (e: MouseEvent) => poke(e.clientX);
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) poke(e.touches[0].clientX);
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (auto.current) {
        target.current = (target.current + dt * 0.045) % 1;
      }
      // Snappier easing so the portrait tracks the cursor tightly.
      current.current += (target.current - current.current) * 0.14;
      const idx =
        Math.floor(current.current * FRAMES.length) % FRAMES.length;
      const el = imgRef.current;
      if (el) {
        const next = FRAMES[idx];
        if (el.dataset.i !== String(idx)) {
          el.dataset.i = String(idx);
          el.src = next;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {FRAMES.length > 0 && (
        <img
          ref={imgRef}
          src={FRAMES[0]}
          alt="Rotating 3D portrait of Rai Jawad Hussain Kharal"
          className="h-full w-full object-cover"
          draggable={false}
        />
      )}
      {/* Cinematic edge blend into the black stage */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.75) 100%)",
        }}
      />
    </div>
  );
}
