import { useEffect, useRef, useState } from "react";
import { addTask } from "../lib/engine";
import { lockTimes, scrambled } from "../lib/fx";
import { useMotion } from "../lib/motion";

interface Props {
  text: string;
  mode: "type" | "scramble";
  play: boolean; // starts when true
  delay?: number;
  msPerChar?: number;
  maxMs?: number; // no effect runs longer than this
  range?: [number, number]; // scramble: first and last lock time
  instant?: boolean;
  className?: string;
}

// Types or scrambles text in. The layout never moves: the part not yet shown stays
// in the flow as hidden text. When finished it becomes one plain text node, so
// screen readers and copy and paste see normal text.
export default function FX({
  text,
  mode,
  play,
  delay = 0,
  msPerChar = 14,
  maxMs = 900,
  range = [250, 500],
  instant = false,
  className,
}: Props) {
  const { motionOn } = useMotion();
  const [done, setDone] = useState(false);
  const plain = instant || !motionOn || done;
  const shown = useRef<HTMLSpanElement>(null);
  const rest = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (plain) return;
    const a = shown.current;
    const b = rest.current;
    if (!a || !b) return;

    const set = (head: string, tail: string) => {
      if (a.textContent !== head) a.textContent = head;
      if (b.textContent !== tail) b.textContent = tail;
    };

    if (!play) {
      set("", text);
      return;
    }

    const start = performance.now() + delay;

    if (mode === "type") {
      const total = Math.min(text.length * msPerChar, maxMs);
      return addTask((now) => {
        const t = now - start;
        if (t < 0) return false;
        const n = total <= 0 ? text.length : Math.min(text.length, Math.floor((t / total) * text.length));
        set(text.slice(0, n), text.slice(n));
        if (n >= text.length) {
          setDone(true);
          return true;
        }
        return false;
      });
    }

    const locks = lockTimes(text, range[0], range[1]);
    let last = -999;
    return addTask((now) => {
      const t = now - start;
      if (t < 0) return false;
      if (t >= range[1]) {
        setDone(true);
        return true;
      }
      if (t - last >= 45) {
        last = t;
        set(scrambled(text, locks, t), "");
      }
      return false;
    });
  }, [plain, play, mode, text, delay, msPerChar, maxMs, range[0], range[1]]);

  if (plain) return <span className={className}>{text}</span>;

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        <span ref={shown} />
        <span ref={rest} className="fx-rest">
          {text}
        </span>
      </span>
    </span>
  );
}
