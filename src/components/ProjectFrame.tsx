import { useCallback, useEffect, useRef } from "react";
import { Project } from "../content";
import { useGrid } from "../hooks/useGrid";
import { useInView } from "../hooks/useInView";
import { imageToAscii, whenIdle } from "../lib/ascii";
import { addTask } from "../lib/engine";
import { glitchOnce } from "../lib/fx";
import { useMotion } from "../lib/motion";

const DASH = "─".repeat(240);
const BARS = "│\n".repeat(40);

interface Props {
  project: Project;
  wide: boolean; // alternates: full width, then 8 of 12 columns
}

// A project in a frame made of box-drawing characters.
// Hover (or tap on touch) turns the screenshot into ASCII, one row at a time.
export default function ProjectFrame({ project, wide }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const pre = useRef<HTMLPreElement>(null);
  const title = useRef<HTMLSpanElement>(null);
  const { motionOn } = useMotion();
  const { cols } = useGrid(wrap);
  const seen = useInView(wrap, { threshold: 0.15 });

  const st = useRef({ built: "", shown: 0, open: false, pointer: "mouse", glitching: false });
  const cancel = useRef<(() => void) | null>(null);

  // Cell size is 6x12 px on desktop and 8x16 px on phones. Read from CSS.
  const build = useCallback((): HTMLElement[] => {
    const p = pre.current;
    const b = box.current;
    const im = img.current;
    if (!p || !b || !im || !im.naturalWidth) return [];
    const rect = b.getBoundingClientRect();
    const cs = getComputedStyle(p);
    const cellW = parseFloat(cs.fontSize) * 0.6;
    const cellH = parseFloat(cs.lineHeight);
    const c = Math.ceil(rect.width / cellW);
    const r = Math.ceil(rect.height / cellH);
    const key = `${c}x${r}`;
    if (st.current.built !== key) {
      const lines = imageToAscii(im, { cols: c, rows: r, width: rect.width, height: rect.height });
      p.replaceChildren(
        ...lines.map((line) => {
          const span = document.createElement("span");
          span.textContent = line || " ";
          return span;
        })
      );
      st.current.built = key;
      st.current.shown = 0;
    }
    return Array.from(p.children) as HTMLElement[];
  }, []);

  // Convert once, while the browser is idle, as soon as the frame has been seen.
  useEffect(() => {
    if (!seen) return;
    let dead = false;
    const im = img.current;
    const run = () => {
      if (!dead) build();
    };
    whenIdle(() => {
      if (im?.complete) run();
      else im?.addEventListener("load", run, { once: true });
    });
    return () => {
      dead = true;
    };
  }, [seen, build]);

  const show = (rows: HTMLElement[], n: number) => {
    rows.forEach((row, i) => row.classList.toggle("on", i < n));
    st.current.shown = n;
  };

  const go = (open: boolean) => {
    const s = st.current;
    if (s.open === open) return;
    const rows = build();
    if (rows.length === 0) return;
    s.open = open;
    cancel.current?.();
    if (!motionOn) {
      show(rows, open ? rows.length : 0);
      return;
    }
    const from = s.shown;
    const start = performance.now();
    const target = open ? rows.length : 0;
    cancel.current = addTask((now) => {
      const k = Math.floor((now - start) / 12) + 1; // 12ms per row
      const n = open ? Math.min(rows.length, from + k) : Math.max(0, from - k);
      show(rows, n);
      return n === target;
    });
  };

  // Title shifts one glyph for a moment, then settles. Under 150ms.
  const glitch = () => {
    const el = title.current;
    if (!motionOn || !el || st.current.glitching) return;
    st.current.glitching = true;
    el.textContent = glitchOnce(project.title);
    window.setTimeout(() => {
      el.textContent = project.title;
      st.current.glitching = false;
    }, 110);
  };

  return (
    <div ref={wrap} className={`pf-wrap${wide ? "" : " w8"}`}>
      <div className={`pf${seen ? " in" : ""}`} style={cols ? { width: `${cols}ch` } : undefined}>
        <div className="pf-in">
          {/* top edge */}
          <span className="e-t" aria-hidden="true">
            ┌
          </span>
          <div className="pf-top e-t">
            <span aria-hidden="true">─ </span>
            <a className="title lnk" href={project.url} target="_blank" rel="noreferrer" onPointerEnter={glitch}>
              <span className="sr-only">{project.title}</span>
              <span ref={title} aria-hidden="true">
                {project.title}
              </span>
              <span className="ext" aria-hidden="true">
                ↗
              </span>
            </a>
            <span className="fill" aria-hidden="true">
              {DASH}
            </span>
            <span className="year">{project.year}</span>
            <span aria-hidden="true"> ─</span>
          </div>
          <span className="e-r" aria-hidden="true">
            ┐
          </span>

          {/* screenshot */}
          <span className="vb e-l" aria-hidden="true">
            <span>{BARS}</span>
          </span>
          <div
            ref={box}
            className="pf-img"
            onPointerDown={(e) => {
              st.current.pointer = e.pointerType;
            }}
            onPointerEnter={(e) => e.pointerType !== "touch" && go(true)}
            onPointerLeave={(e) => e.pointerType !== "touch" && go(false)}
            onClick={() => st.current.pointer === "touch" && go(!st.current.open)}
          >
            <img
              ref={img}
              src={project.image}
              alt={project.alt}
              width={project.width}
              height={project.height}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
            <pre ref={pre} className="ascii" aria-hidden="true" />
          </div>
          <span className="vb e-r" aria-hidden="true">
            <span>{BARS}</span>
          </span>

          {/* divider between image and text */}
          <span className="e-l" aria-hidden="true">
            ├
          </span>
          <span className="pf-sepfill e-b" aria-hidden="true">
            {DASH}
          </span>
          <span className="e-r" aria-hidden="true">
            ┤
          </span>

          {/* text */}
          <span className="vb e-l" aria-hidden="true">
            <span>{BARS}</span>
          </span>
          <div className="pf-text">
            <p>{project.description}</p>
            <p className="tags">
              {project.tags.map((tag) => (
                <span key={tag}>[{tag}]</span>
              ))}
            </p>
          </div>
          <span className="vb e-r" aria-hidden="true">
            <span>{BARS}</span>
          </span>

          {/* bottom edge */}
          <span className="e-l" aria-hidden="true">
            └
          </span>
          <span className="pf-botfill e-b" aria-hidden="true">
            {DASH}
          </span>
          <span className="e-b" aria-hidden="true">
            ┘
          </span>
        </div>
      </div>
    </div>
  );
}
