export const RAMP = " .:-=+*#%@";
const cache = new Map<string, string[]>();

export interface AsciiSpec {
  cols: number;
  rows: number;
  width: number;
  height: number;
}

// Samples an image on a canvas and maps brightness to characters.
// The crop matches object-fit: cover with the top edge pinned, like the real image.
export function imageToAscii(img: HTMLImageElement, spec: AsciiSpec): string[] {
  const key = `${img.currentSrc || img.src}|${spec.cols}x${spec.rows}|${spec.width}x${spec.height}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  if (!iw || !ih || spec.cols < 1 || spec.rows < 1) return [];

  const scale = Math.max(spec.width / iw, spec.height / ih);
  const sw = spec.width / scale;
  const sh = spec.height / scale;
  const sx = (iw - sw) / 2;

  const canvas = document.createElement("canvas");
  canvas.width = spec.cols;
  canvas.height = spec.rows;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, sx, 0, sw, sh, 0, 0, spec.cols, spec.rows);
  const { data } = ctx.getImageData(0, 0, spec.cols, spec.rows);

  // Brightness per cell. A mostly white screenshot would turn into a solid wall of dense
  // characters, so for light images the ramp is flipped: the page background stays empty and
  // the content is what gets drawn. Contrast is then stretched between the 2nd and 98th
  // percentile so small details survive.
  const count = spec.cols * spec.rows;
  const lum = new Float32Array(count);
  let sum = 0;
  for (let k = 0; k < count; k++) {
    const i = k * 4;
    lum[k] = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
    sum += lum[k];
  }
  if (sum / count > 0.5) {
    for (let k = 0; k < count; k++) lum[k] = 1 - lum[k];
  }
  const sorted = Float32Array.from(lum).sort();
  const lo = sorted[Math.floor(count * 0.02)];
  const hi = sorted[Math.min(count - 1, Math.floor(count * 0.98))];
  const span = hi - lo || 1;

  const rows: string[] = [];
  for (let y = 0; y < spec.rows; y++) {
    let line = "";
    for (let x = 0; x < spec.cols; x++) {
      const v = Math.min(1, Math.max(0, (lum[y * spec.cols + x] - lo) / span));
      line += RAMP[Math.min(RAMP.length - 1, Math.floor(v * RAMP.length))];
    }
    rows.push(line);
  }
  cache.set(key, rows);
  return rows;
}

export function whenIdle(fn: () => void): void {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(() => fn(), { timeout: 1500 });
  } else {
    window.setTimeout(fn, 200);
  }
}
