const GLYPHS = "!<>-_\\/[]{}=+*^?#";

export const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

// Per character lock time. Characters settle from left to right within each line.
export function lockTimes(text: string, min: number, max: number): number[] {
  const lines = text.split("\n");
  const width = Math.max(1, ...lines.map((line) => line.length));
  const out: number[] = [];
  lines.forEach((line, index) => {
    for (let col = 0; col < line.length; col++) {
      out.push(min + (col / width) * (max - min));
    }
    if (index < lines.length - 1) out.push(0);
  });
  return out;
}

export function scrambled(text: string, locks: number[], elapsed: number): string {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    out += char === " " || char === "\n" || elapsed >= locks[i] ? char : randomGlyph();
  }
  return out;
}

const LOOKALIKES: Record<string, string> = { o: "0", e: "3", i: "1", a: "4", s: "5", l: "1", t: "7" };

// Swaps one letter for a lookalike. Used for the short hover glitch on project titles.
export function glitchOnce(text: string): string {
  const candidates: number[] = [];
  for (let i = 0; i < text.length; i++) {
    if (LOOKALIKES[text[i].toLowerCase()]) candidates.push(i);
  }
  if (candidates.length === 0) return text;
  const at = candidates[Math.floor(Math.random() * candidates.length)];
  return text.slice(0, at) + LOOKALIKES[text[at].toLowerCase()] + text.slice(at + 1);
}
