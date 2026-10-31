import { forwardRef, useId, useImperativeHandle, useRef } from "react";
import { scrambleLine } from "../lib/fx";
import { CH, CW, Wordmark as WordmarkData } from "../lib/wordmark";

export interface WordmarkHandle {
  el: SVGSVGElement | null;
  // te is milliseconds since the wordmark started. Below 0 it is blank, from 600 on it is final.
  // Characters resolve from left to right between 300 and 600.
  paint: (te: number) => void;
}

interface Props {
  name: "wide" | "stack";
  data: WordmarkData;
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

// The wordmark as SVG geometry. It scales with its container as one unit, so it cannot wrap
// or clip. Scrambling is a second layer of glyphs that is cut away from left to right
// while the real art is revealed.
const Wordmark = forwardRef<WordmarkHandle, Props>(function Wordmark({ name, data }, ref) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const svg = useRef<SVGSVGElement>(null);
  const finalClip = useRef<SVGRectElement>(null);
  const scrClip = useRef<SVGRectElement>(null);
  const scrLayer = useRef<SVGGElement>(null);
  const rows = useRef<(SVGTextElement | null)[]>([]);

  useImperativeHandle(
    ref,
    () => ({
      el: svg.current,
      paint(te: number) {
        const fc = finalClip.current;
        const sc = scrClip.current;
        const layer = scrLayer.current;
        if (!fc || !sc || !layer) return;
        const done = te >= 600;
        const x = te < 0 ? 0 : done ? data.w : clamp((te - 300) / 300, 0, 1) * data.w;
        fc.setAttribute("width", String(x));
        sc.setAttribute("x", String(x));
        sc.setAttribute("width", String(Math.max(0, data.w - x)));
        const scrambling = te >= 0 && !done;
        layer.style.visibility = scrambling ? "visible" : "hidden";
        if (scrambling) {
          const fromCol = Math.floor(x / CW);
          data.lines.forEach((line, i) => {
            const t = rows.current[i];
            if (t) t.textContent = scrambleLine(line, fromCol);
          });
        }
      },
    }),
    [data]
  );

  return (
    <svg
      ref={svg}
      className={`wm wm-${name}`}
      viewBox={`0 0 ${data.w} ${data.h}`}
      style={{ maxWidth: `${data.cols * 12}px` }}
      preserveAspectRatio="xMinYMin meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`wmf${uid}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={data.h}>
          <stop offset="0" style={{ stopColor: "var(--g8)" }} />
          <stop offset="0.45" style={{ stopColor: "var(--accent)" }} />
          <stop offset="1" style={{ stopColor: "var(--g5)" }} />
        </linearGradient>
        <clipPath id={`wmc${uid}`}>
          <rect ref={finalClip} x="0" y="0" width={data.w} height={data.h} />
        </clipPath>
        <clipPath id={`wms${uid}`}>
          <rect ref={scrClip} x={data.w} y="0" width="0" height={data.h} />
        </clipPath>
      </defs>

      <g clipPath={`url(#wmc${uid})`}>
        <path className="wm-shadow" d={data.shadow} />
        <path d={data.face} fill={`url(#wmf${uid})`} />
      </g>

      <g ref={scrLayer} className="wm-scr" clipPath={`url(#wms${uid})`} style={{ visibility: "hidden" }}>
        {data.lines.map((line, i) =>
          line.trim() ? (
            <text
              key={i}
              ref={(el) => {
                rows.current[i] = el;
              }}
              x="0"
              y={i * CH + CH * 0.8}
              textLength={data.w}
              lengthAdjust="spacing"
            >
              {line}
            </text>
          ) : null
        )}
      </g>
    </svg>
  );
});

export default Wordmark;
