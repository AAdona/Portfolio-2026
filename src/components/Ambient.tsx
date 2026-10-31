import { useEffect, useRef } from "react";
import { addTask } from "../lib/engine";
import { useMotion } from "../lib/motion";

const CHARS = [".", ":", "+", "·"];

interface Particle {
  x: number;
  y: number;
  v: number;
  c: string;
}

// The one ambient effect: a sparse field of characters drifting up at 6% opacity.
// It stops when the tab is hidden or the hero is off screen.
export default function Ambient() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { motionOn } = useMotion();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !motionOn) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const size = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = '14px "JetBrains Mono", monospace';
      ctx.textBaseline = "top";
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(canvas);

    const parts: Particle[] = Array.from({ length: 44 }, () => ({
      x: Math.random(),
      y: Math.random(),
      v: 6 + Math.random() * 10,
      c: CHARS[Math.floor(Math.random() * CHARS.length)],
    }));

    let stop: (() => void) | null = null;
    let last = 0;
    let inView = true;

    const draw = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(199, 211, 202, 0.06)";
      for (const p of parts) {
        p.y -= (p.v * dt) / Math.max(h, 1);
        if (p.y < -0.05) {
          p.y = 1.02;
          p.x = Math.random();
        }
        ctx.fillText(p.c, p.x * w, p.y * h);
      }
      return false;
    };

    const update = () => {
      const run = inView && !document.hidden;
      if (run && !stop) {
        last = 0;
        stop = addTask(draw);
      } else if (!run && stop) {
        stop();
        stop = null;
      }
    };

    const io = new IntersectionObserver((entries) => {
      inView = entries[0]?.isIntersecting ?? true;
      update();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", update);
    update();

    return () => {
      stop?.();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", update);
      ctx.clearRect(0, 0, w, h);
    };
  }, [motionOn]);

  return <canvas ref={ref} className="ambient" aria-hidden="true" />;
}
