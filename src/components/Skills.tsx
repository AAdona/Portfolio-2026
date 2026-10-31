import { CSSProperties, useRef } from "react";
import { skillTree } from "../content";
import { useInView } from "../hooks/useInView";
import Divider from "./Divider";
import SectionTitle from "./SectionTitle";

const row = (i: number) => ({ "--i": i }) as CSSProperties;

// A directory tree. Real nested lists, with the branch characters hidden from screen readers.
// Rows appear one at a time, 60ms apart.
export default function Skills() {
  const ref = useRef<HTMLUListElement>(null);
  const seen = useInView(ref, { threshold: 0.3 });
  let n = 0;

  return (
    <section id="skills" className="sec">
      <Divider variant="bar" />
      <SectionTitle text="skills" />
      <ul ref={ref} className={`tree${seen ? " in" : ""}`}>
        <li>
          <p className="row" style={row(n++)}>
            <span className="dir">{skillTree.root}</span>
          </p>
          <ul>
            {skillTree.groups.map((group, gi) => {
              const lastGroup = gi === skillTree.groups.length - 1;
              return (
                <li key={group.name}>
                  <p className="row" style={row(n++)}>
                    <span className="pre" aria-hidden="true">
                      {lastGroup ? "└── " : "├── "}
                    </span>
                    <span className="dir">{group.name}</span>
                  </p>
                  <ul>
                    {group.items.map((item, ii) => {
                      const lastItem = ii === group.items.length - 1;
                      return (
                        <li key={item} className="row" style={row(n++)}>
                          <span className="pre" aria-hidden="true">
                            {(lastGroup ? "    " : "│   ") + (lastItem ? "└── " : "├── ")}
                          </span>
                          <span>{item}</span>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </section>
  );
}
