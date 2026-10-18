import { useEffect, useRef } from "react";
import binaryImg from "@/assets/portrait-binary-sticker.png";
import cleanImg from "@/assets/portrait-clean-sticker.png";

type TrailPoint = { x: number; y: number; t: number };

/**
 * Secret Reveal — cursor paints a hidden binary/digital version of the
 * portrait into view through the top layer, with a soft fading trail.
 *
 * Two stacked canvases:
 *  - bottom: binary portrait clipped to the clean silhouette (static) —
 *    it can never ghost around the edges in the idle state.
 *  - top: clean portrait with cursor-punched holes (animated).
 * The holes only erase the top canvas, revealing the binary beneath.
 *
 * The trail is interpolated per-frame (no gaps on fast moves) and eased
 * for a buttery feel.
 */
export function SecretReveal({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLCanvasElement>(null);
  const underRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const topCanvas = topRef.current;
    const underCanvas = underRef.current;
    if (!wrap || !topCanvas || !underCanvas) return;
    const ctx = topCanvas.getContext("2d");
    const uctx = underCanvas.getContext("2d");
    if (!ctx || !uctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const top = new Image(); // clean portrait (visible)
    const under = new Image(); // binary portrait (revealed)
    const trail: TrailPoint[] = [];
    const pointer = { x: 0, y: 0, active: false };
    const smooth = { x: 0, y: 0, init: false };
    let interacted = false;
    let sweepTimer: number | null = null;
    let loaded = 0;
    let underReady = false;

    /** Draw an image with object-fit: cover semantics onto a context. */
    const drawCover = (
      c: CanvasRenderingContext2D,
      img: HTMLImageElement,
      W: number,
      H: number
    ) => {
      const ir = img.width / img.height;
      const cr = W / H;
      let dw = W;
      let dh = H;
      if (ir > cr) dw = H * ir;
      else dh = W / ir;
      c.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
    };

    /** Paint the static bottom layer: binary clipped to clean silhouette. */
    const paintUnder = () => {
      const W = underCanvas.width;
      const H = underCanvas.height;
      uctx.clearRect(0, 0, W, H);
      uctx.globalCompositeOperation = "source-over";
      drawCover(uctx, under, W, H);
      uctx.globalCompositeOperation = "destination-in";
      drawCover(uctx, top, W, H);
      underReady = true;
    };

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      const W = Math.max(1, Math.round(r.width * dpr));
      const H = Math.max(1, Math.round(r.height * dpr));
      topCanvas.width = W;
      topCanvas.height = H;
      underCanvas.width = W;
      underCanvas.height = H;
      underReady = false;
      if (loaded === 2) paintUnder();
    };
    resize();
    window.addEventListener("resize", resize);

    const toLocal = (clientX: number, clientY: number) => {
      const r = wrap.getBoundingClientRect();
      return { x: clientX - r.left, y: clientY - r.top };
    };

    const onMove = (e: PointerEvent) => {
      const p = toLocal(e.clientX, e.clientY);
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.active = true;
      interacted = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    wrap.addEventListener("pointermove", onMove, { passive: true });
    wrap.addEventListener("pointerleave", onLeave, { passive: true });

    // Intro sweep — teaches the interaction once, then never again.
    if (!reduced) {
      const begin = performance.now() + 700;
      const sweep = () => {
        if (interacted || !running) return;
        const p = (performance.now() - begin) / 2000;
        if (p >= 1) {
          pointer.active = false;
          return;
        }
        const r = wrap.getBoundingClientRect();
        pointer.x = r.width * p;
        pointer.y = r.height * 0.42;
        pointer.active = true;
        if (!smooth.init) {
          smooth.x = pointer.x;
          smooth.y = pointer.y;
          smooth.init = true;
        }
        sweepTimer = window.setTimeout(sweep, 16);
      };
      sweepTimer = window.setTimeout(sweep, 700);
    }

    const visible = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running) {
          last = performance.now();
          raf = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.05 }
    );
    visible.observe(wrap);

    let last = performance.now();
    const HOLE_R = 135; // css px — bigger, softer
    const FADE_MS = 2200; // longer lingering trail

    const drawHole = (x: number, y: number, alpha: number) => {
      const r = HOLE_R * dpr;
      const g = ctx.createRadialGradient(x * dpr, y * dpr, 0, x * dpr, y * dpr, r);
      g.addColorStop(0, `rgba(0,0,0,${0.9 * alpha})`);
      g.addColorStop(0.45, `rgba(0,0,0,${0.5 * alpha})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x * dpr, y * dpr, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const tick = (now: number) => {
      if (!running) return;
      last = now;

      // Ease the render cursor toward the real one — buttery, gap-free.
      if (!smooth.init) {
        smooth.x = pointer.x;
        smooth.y = pointer.y;
        smooth.init = true;
      }
      smooth.x += (pointer.x - smooth.x) * 0.35;
      smooth.y += (pointer.y - smooth.y) * 0.35;
      if (pointer.active) {
        trail.push({ x: smooth.x, y: smooth.y, t: now });
        if (trail.length > 90) trail.shift();
      }

      const W = topCanvas.width;
      const H = topCanvas.height;
      ctx.clearRect(0, 0, W, H);

      // Clean portrait on the top canvas…
      ctx.globalCompositeOperation = "source-over";
      drawCover(ctx, top, W, H);

      // …then punch soft holes through it alone, revealing the binary
      // canvas stacked underneath.
      ctx.globalCompositeOperation = "destination-out";
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        const age = now - p.t;
        if (age > FADE_MS) {
          trail.splice(i, 1);
          continue;
        }
        // Ease alpha for a silky fade rather than linear.
        const k = 1 - age / FADE_MS;
        drawHole(p.x, p.y, k * k);
      }

      raf = requestAnimationFrame(tick);
    };

    const onLoad = () => {
      loaded += 1;
      if (loaded === 2) {
        paintUnder();
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    top.onload = onLoad;
    under.onload = onLoad;
    top.src = cleanImg;
    under.src = binaryImg;

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      visible.disconnect();
      window.removeEventListener("resize", resize);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      if (sweepTimer) window.clearTimeout(sweepTimer);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <canvas ref={underRef} className="absolute inset-0 h-full w-full" />
      <canvas ref={topRef} className="absolute inset-0 h-full w-full" />
      <span className="sr-only">
        Interactive portrait of Rai Jawad Hussain Kharal — move your cursor over
        it to reveal the digital version
      </span>
    </div>
  );
}
