import { useCallback, useEffect, useRef } from "react";
import { Project } from "../content";
import { useInView } from "../hooks/useInView";
import { RAMP, imageToAscii, whenIdle } from "../lib/ascii";
import { addTask } from "../lib/engine";
import { glitchOnce } from "../lib/fx";
import { useMotion } from "../lib/motion";

const SVG_NS = "http://www.w3.org/2000/svg";
const XML_NS = "http://www.w3.org/XML/1998/namespace";

// One character cell of the ASCII picture, in SVG units. The picture is a fixed grid that is
// scaled to the frame, so it looks the same at every width. Phones get a coarser grid.
const CW = 6;
const CH = 12;
const gridCols = (width: number) => (width >= 520 ? 120 : 72);

interface Props {
  project: Project;
  wide: boolean; // alternates: full width, then 8 of 12 columns
}

interface State {
  built: string;
  shown: number;
  open: boolean;
  pointer: string;
  glitching: boolean;
}

// One row of the picture: a background strip that hides the screenshot, and the characters.
// Runs of characters with the same brightness share one tspan, which carries the colour.
function buildRow(line: string, r: number, cols: number): SVGGElement {
  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("class", "row");

  const bg = document.createElementNS(SVG_NS, "rect");
  bg.setAttribute("class", "bg");
  bg.setAttribute("x", "0");
  bg.setAttribute("y", String(r * CH));
  bg.setAttribute("width", String(cols * CW));
  bg.setAttribute("height", String(CH));
  g.append(bg);

  const runs: { level: number; text: string }[] = [];
  for (const ch of line) {
    const level = RAMP.indexOf(ch);
    const last = runs[runs.length - 1];
    if (level <= 0) {
      if (last) last.text += " ";
      else runs.push({ level: 0, text: " " });
    } else if (last && (last.level === level || last.level === 0)) {
      last.level = level;
      last.text += ch;
    } else {
      runs.push({ level, text: ch });
    }
  }

  if (runs.some((run) => run.level > 0)) {
    const text = document.createElementNS(SVG_NS, "text");
    text.setAttributeNS(XML_NS, "xml:space", "preserve");
    text.setAttribute("x", "0");
    text.setAttribute("y", String(r * CH + CH * 0.8));
    text.setAttribute("textLength", String(cols * CW));
    text.setAttribute("lengthAdjust", "spacing");
    for (const run of runs) {
      const span = document.createElementNS(SVG_NS, "tspan");
      if (run.level > 0) span.setAttribute("class", `l${run.level}`);
      span.textContent = run.text;
      text.append(span);
    }
    g.append(text);
  }
  return g;
}

function show(state: State, rows: Element[], n: number) {
  rows.forEach((row, i) => row.classList.toggle("on", i < n));
  state.shown = n;
}

// A project in a frame drawn in SVG. Hover (or tap on touch) turns the screenshot into ASCII,
// one row at a time.
export default function ProjectFrame({ project, wide }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const asc = useRef<SVGSVGElement>(null);
  const title = useRef<HTMLSpanElement>(null);
  const { motionOn } = useMotion();
  const seen = useInView(wrap, { threshold: 0.15 });

  const st = useRef<State>({ built: "", shown: 0, open: false, pointer: "mouse", glitching: false });
  const cancel = useRef<(() => void) | null>(null);

  const build = useCallback((): Element[] => {
    const svg = asc.current;
    const b = box.current;
    const im = img.current;
    if (!svg || !b || !im || !im.naturalWidth) return [];
    const width = b.getBoundingClientRect().width;
    if (!width) return [];
    const cols = gridCols(width);
    const rows = Math.max(1, Math.round((cols * CW * im.naturalHeight) / (im.naturalWidth * CH)));
    const key = `${cols}x${rows}`;
    if (st.current.built !== key) {
      const lines = imageToAscii(im, { cols, rows, width: cols * CW, height: rows * CH });
      svg.setAttribute("viewBox", `0 0 ${cols * CW} ${rows * CH}`);
      svg.replaceChildren(...lines.map((line, r) => buildRow(line, r, cols)));
      st.current.built = key;
      st.current.shown = 0;
    }
    return Array.from(svg.children);
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

  // The picture is scaled with the frame. It is only rebuilt when the width crosses into the
  // other grid size, for example when a phone is turned sideways.
  useEffect(() => {
    const b = box.current;
    if (!b) return;
    const ro = new ResizeObserver(() => {
      const s = st.current;
      const width = b.getBoundingClientRect().width;
      if (!s.built || !width || s.built.startsWith(`${gridCols(width)}x`)) return;
      s.built = "";
      if (s.open) {
        const rows = build();
        show(s, rows, rows.length);
      }
    });
    ro.observe(b);
    return () => ro.disconnect();
  }, [build]);

  const go = (open: boolean) => {
    const s = st.current;
    if (s.open === open) return;
    const rows = build();
    if (rows.length === 0) return;
    s.open = open;
    cancel.current?.();
    if (!motionOn) {
      show(s, rows, open ? rows.length : 0);
      return;
    }
    const from = s.shown;
    const start = performance.now();
    const target = open ? rows.length : 0;
    cancel.current = addTask((now) => {
      const k = Math.floor((now - start) / 12) + 1; // 12ms per row
      const n = open ? Math.min(rows.length, from + k) : Math.max(0, from - k);
      show(s, rows, n);
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
      <div className={`pf${seen ? " in" : ""}`}>
        {/* the outline draws itself clockwise from the top left corner */}
        <svg className="pf-box" aria-hidden="true" focusable="false">
          <rect x="0.5" y="0.5" width="100%" height="100%" />
        </svg>

        <div className="pf-head">
          <a className="title lnk" href={project.url} target="_blank" rel="noreferrer" onPointerEnter={glitch}>
            <span className="sr-only">{project.title}</span>
            <span ref={title} aria-hidden="true">
              {project.title}
            </span>
            <span className="ext" aria-hidden="true">
              ↗
            </span>
          </a>
          <span className="year">{project.year}</span>
        </div>

        <div
          ref={box}
          className="pf-img"
          style={{ aspectRatio: `${project.width} / ${project.height}` }}
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
          <svg ref={asc} className="ascii" preserveAspectRatio="none" aria-hidden="true" focusable="false" />
        </div>

        <svg className="pf-sep" aria-hidden="true" focusable="false">
          <line x1="0" y1="0.5" x2="100%" y2="0.5" />
        </svg>

        <div className="pf-text">
          <p>{project.description}</p>
          <p className="tags">
            {project.tags.map((tag) => (
              <span key={tag}>[{tag}]</span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
