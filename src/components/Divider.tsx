import { useId, useRef } from "react";
import { useInView } from "../hooks/useInView";

export type DividerVariant = "plain" | "ticks" | "bar" | "dots";

// Drawn in SVG, so they fill any width with no measuring and no resize handling.
// The ticks and dots are patterns with a fixed pitch. The bar is a short stepped block.
const BAR_STEPS = [0.25, 0.5, 0.75, ...Array<number>(22).fill(1), 0.75, 0.5, 0.25];

export default function Divider({ variant }: { variant: DividerVariant }) {
  const ref = useRef<SVGSVGElement>(null);
  const seen = useInView(ref, { threshold: 0.5 });
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const cls = `divider d-${variant}${seen ? " in" : ""}`;

  if (variant === "bar") {
    const step = 9;
    const w = BAR_STEPS.length * step;
    return (
      <svg ref={ref} className={cls} viewBox={`0 0 ${w} 26`} aria-hidden="true" focusable="false">
        {BAR_STEPS.map((o, i) => (
          <rect key={i} x={i * step} y="8" width={step} height="10" opacity={o} />
        ))}
      </svg>
    );
  }

  return (
    <svg ref={ref} className={cls} width="100%" height="26" aria-hidden="true" focusable="false">
      {variant === "plain" && <line x1="0" y1="13" x2="100%" y2="13" />}
      {variant === "ticks" && (
        <>
          <defs>
            <pattern id={`t${id}`} width="42" height="26" patternUnits="userSpaceOnUse">
              <line x1="0.5" y1="9" x2="0.5" y2="17" />
            </pattern>
          </defs>
          <line x1="0" y1="13" x2="100%" y2="13" />
          <rect x="0" y="0" width="100%" height="26" fill={`url(#t${id})`} stroke="none" />
          <line x1="0.5" y1="6" x2="0.5" y2="20" />
        </>
      )}
      {variant === "dots" && (
        <>
          <defs>
            <pattern id={`d${id}`} width="12" height="26" patternUnits="userSpaceOnUse">
              <rect x="0" y="12" width="2" height="2" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="26" fill={`url(#d${id})`} stroke="none" />
        </>
      )}
    </svg>
  );
}
