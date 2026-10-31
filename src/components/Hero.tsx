import { useLayoutEffect, useRef } from "react";
import { heroLinks, tagline } from "../content";
import { addTask } from "../lib/engine";
import { useMotion } from "../lib/motion";
import { onScroll } from "../lib/scroll";
import { safeSet, safeGet } from "../lib/storage";
import { wordmarks } from "../lib/wordmark";
import Ambient from "./Ambient";
import Wordmark, { WordmarkHandle } from "./Wordmark";

const BOOT = [
  "> init portfolio --user adrian",
  "> loading experience.......... ok",
  "> loading projects............ ok",
];
const KEYS = ["wide", "stack"] as const;

// Timeline in ms. Whole sequence ends under 2.4s. Click or any key skips it.
const BOOT_START = 200;
const BOOT_STEP = 150; // each line starts a little after the one before it
const PER_CHAR = 18;
const COLLAPSE_AT = 1100;
const COLLAPSE_MS = 100;
const ART_AT = 1200; // wordmark scramble starts
const TAG_AFTER = 700; // tagline and links come in this long after the wordmark starts
const TAG_MS = 450;

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export default function Hero() {
  const { motionOn } = useMotion();
  const hero = useRef<HTMLElement>(null);
  const boot = useRef<HTMLDivElement>(null);
  const bootText = useRef<HTMLSpanElement>(null);
  const art = useRef<HTMLDivElement>(null);
  const tag = useRef<HTMLSpanElement>(null);
  const marks = useRef<Record<string, WordmarkHandle | null>>({});

  // Parallax: the wordmark moves at 0.15 of scroll speed. Scrubbed, no easing.
  useLayoutEffect(() => {
    const el = art.current;
    if (!el) return;
    if (!motionOn) {
      el.style.transform = "";
      return;
    }
    const off = onScroll(() => {
      const y = window.scrollY;
      if (y > (hero.current?.offsetHeight ?? 800) * 1.5) return;
      el.style.transform = `translate3d(0, ${(y * 0.15).toFixed(1)}px, 0)`;
    });
    return () => {
      off();
      el.style.transform = "";
    };
  }, [motionOn]);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const bootEl = boot.current;
    const bootTextEl = bootText.current;
    const tagEl = tag.current;
    if (!bootEl || !bootTextEl || !tagEl) return;

    const showFinal = () => {
      bootEl.style.display = "none";
      for (const k of KEYS) marks.current[k]?.paint(Infinity);
      tagEl.textContent = tagline;
      root.dataset.boot = "done";
    };

    if (!motionOn) {
      showFinal();
      return;
    }

    const visited = safeGet("session", "booted") === "1";
    const artAt = visited ? 0 : ART_AT;
    const tagAt = artAt + TAG_AFTER;
    const end = tagAt + TAG_MS;

    // The wordmark variant that is on screen right now.
    const key = KEYS.find((k) => {
      const el = marks.current[k]?.el;
      return el && getComputedStyle(el).display !== "none";
    });
    const mark = key ? marks.current[key] : null;

    // Tagline keeps its space while typing: shown part + hidden rest.
    const shown = document.createElement("span");
    const rest = document.createElement("span");
    rest.className = "fx-rest";
    tagEl.replaceChildren(shown, rest);

    bootEl.style.display = visited ? "none" : "";
    root.dataset.boot = "pending";
    let lastTag = -1;

    const paint = (t: number) => {
      if (!visited) {
        const lines: string[] = [];
        BOOT.forEach((line, i) => {
          const start = BOOT_START + i * BOOT_STEP;
          if (t >= start) lines.push(line.slice(0, clamp(Math.floor((t - start) / PER_CHAR), 0, line.length)));
        });
        bootTextEl.textContent = lines.join("\n");
        const p = clamp((t - COLLAPSE_AT) / COLLAPSE_MS, 0, 1);
        bootEl.style.opacity = String(1 - p);
        bootEl.style.transform = `translateY(${-p * 100}%)`;
      }

      mark?.paint(t - artAt);

      const n = t < tagAt ? 0 : Math.floor(clamp((t - tagAt) / TAG_MS, 0, 1) * tagline.length);
      if (n !== lastTag) {
        lastTag = n;
        shown.textContent = tagline.slice(0, n);
        rest.textContent = tagline.slice(n);
      }

      if (t >= tagAt) root.dataset.boot = "done";
    };

    let skipped = false;
    const skip = () => {
      skipped = true;
    };
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);

    const begin = performance.now();
    paint(-1);
    const stop = addTask((now) => {
      const t = skipped ? Infinity : now - begin;
      paint(t);
      if (t >= end) {
        safeSet("session", "booted", "1");
        showFinal();
        return true;
      }
      return false;
    });

    return () => {
      stop();
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      showFinal();
      bootEl.style.display = "";
      bootEl.style.opacity = "";
      bootEl.style.transform = "";
    };
  }, [motionOn]);

  return (
    <section id="top" ref={hero} className="hero">
      <Ambient />

      <div className="boot" ref={boot} aria-hidden="true">
        <pre>
          <span ref={bootText} />
          <span className="cursor">▌</span>
        </pre>
      </div>

      <h1 className="sr-only">Adrian Hero Adona</h1>
      <div className="art" ref={art} aria-hidden="true">
        {KEYS.map((k) => (
          <Wordmark
            key={k}
            name={k}
            data={wordmarks[k]}
            ref={(h) => {
              marks.current[k] = h;
            }}
          />
        ))}
      </div>

      <p className="tag">
        <span className="sr-only">{tagline}</span>
        <span ref={tag} aria-hidden="true">
          {tagline}
        </span>
      </p>

      <p className="hero-links">
        {heroLinks.map((l) => (
          <a
            key={l.label}
            className="lnk"
            href={l.href}
            {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
            {...(l.download ? { download: true } : {})}
          >
            {l.label}
            <span className="ext" aria-hidden="true">
              ↗
            </span>
          </a>
        ))}
      </p>
    </section>
  );
}
