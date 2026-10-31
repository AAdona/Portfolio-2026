import { useRef } from "react";
import { useGrid } from "../hooks/useGrid";
import { useInView } from "../hooks/useInView";

export type DividerVariant = "plain" | "ticks" | "bar" | "dots";

// Built from text characters to fill the width of the column exactly.
export function buildDivider(variant: DividerVariant, cols: number): string {
  if (cols < 1) return "";
  switch (variant) {
    case "plain":
      return "─".repeat(cols);
    case "ticks": {
      let s = "├";
      for (let i = 1; i < cols - 1; i++) s += i % 7 === 0 ? "┼" : "─";
      return cols > 1 ? s + "┤" : s;
    }
    case "bar": {
      // Short on purpose. The rest of the row stays empty.
      const n = Math.min(cols, 30);
      return n < 8 ? "█".repeat(n) : "░▒▓" + "█".repeat(n - 6) + "▓▒░";
    }
    case "dots": {
      let s = "";
      for (let i = 0; i < cols; i++) s += i % 2 === 0 ? "·" : " ";
      return s;
    }
  }
}

export default function Divider({ variant }: { variant: DividerVariant }) {
  const ref = useRef<HTMLDivElement>(null);
  const { cols } = useGrid(ref);
  const seen = useInView(ref, { threshold: 0.5 });

  return (
    <div ref={ref} className={`divider${seen ? " in" : ""}`} aria-hidden="true">
      <span>{buildDivider(variant, cols)}</span>
    </div>
  );
}
