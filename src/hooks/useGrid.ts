import { RefObject, useLayoutEffect, useState } from "react";

export interface Grid {
  cols: number; // whole characters that fit in the element
  ch: number; // width of one character in px
  row: number; // height of one row in px (1.65em)
}

// Measures the character grid of an element in its own font, so text frames
// can be built to fit exactly. Re-measures on resize and when fonts load.
export function useGrid(ref: RefObject<HTMLElement | null>): Grid {
  const [grid, setGrid] = useState<Grid>({ cols: 0, ch: 0, row: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const probe = document.createElement("span");
    probe.setAttribute("aria-hidden", "true");
    probe.style.cssText =
      "position:absolute;left:0;top:0;display:block;width:10ch;height:1.65em;visibility:hidden;pointer-events:none;";
    el.appendChild(probe);

    const measure = () => {
      const p = probe.getBoundingClientRect();
      const e = el.getBoundingClientRect();
      const ch = p.width / 10;
      if (!ch) return;
      const cols = Math.floor(e.width / ch + 1e-3);
      setGrid((prev) =>
        prev.cols === cols && Math.abs(prev.ch - ch) < 0.01 && Math.abs(prev.row - p.height) < 0.01
          ? prev
          : { cols, ch, row: p.height }
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const fonts = document.fonts;
    fonts?.ready.then(measure);
    fonts?.addEventListener?.("loadingdone", measure);

    return () => {
      ro.disconnect();
      fonts?.removeEventListener?.("loadingdone", measure);
      probe.remove();
    };
  }, [ref]);

  return grid;
}
