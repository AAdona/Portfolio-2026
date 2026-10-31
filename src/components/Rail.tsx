import { useEffect, useRef, useState } from "react";
import { onScroll } from "../lib/scroll";

const SECTIONS = [
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "skills", label: "skills" },
  { id: "contact", label: "contact" },
];

const RULE = "─".repeat(26);
const LONG_RULE = "─".repeat(180);

// Sticky left rail on desktop, top bar on small screens.
export default function Rail() {
  const prog = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState("");

  useEffect(
    () =>
      onScroll(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        const n = Math.round(p * 10);
        if (prog.current) {
          prog.current.textContent = `[${"■".repeat(n)}${"□".repeat(10 - n)}] ${String(Math.round(p * 100)).padStart(3, " ")}%`;
        }
        let current = "";
        for (const s of SECTIONS) {
          const el = document.getElementById(s.id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = s.id;
        }
        setActive(current);
      }),
    []
  );

  return (
    <header className="rail">
      <a href="#top" className="brand lnk">
        adrian hero adona
      </a>
      <span className="prog" ref={prog} aria-hidden="true" />
      <span className="rule r1" aria-hidden="true">
        {RULE}
      </span>
      <nav aria-label="Sections">
        <ul>
          {SECTIONS.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className={active === s.id ? "on" : undefined} aria-current={active === s.id ? "location" : undefined}>
                <span className="num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <span className="rule r2" aria-hidden="true">
        {RULE}
      </span>
      <span className="rule r3" aria-hidden="true">
        {LONG_RULE}
      </span>
    </header>
  );
}
