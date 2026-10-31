import { useRef } from "react";
import { Job, jobs } from "../content";
import { useInView } from "../hooks/useInView";
import Divider from "./Divider";
import FX from "./FX";
import SectionTitle from "./SectionTitle";

// Each entry types in line by line. The date column goes first.
// Stagger is 80ms per line and never more than 600ms for the whole entry.
const stagger = (line: number) => Math.min(line * 80, 560);

function Entry({ job }: { job: Job }) {
  const ref = useRef<HTMLLIElement>(null);
  const play = useInView(ref, { threshold: 0.15 });

  return (
    <li ref={ref} className="entry">
      <div className="when">
        <span className="sr-only">{job.periodSpoken}</span>
        <span aria-hidden="true">
          <FX text={job.period} mode="type" play={play} delay={stagger(0)} />
        </span>
        {job.current && (
          <span className="cur" role="img" aria-label="current role">
            [*]
          </span>
        )}
      </div>

      <div className="what">
        <p className="role-line">
          <span className="role">
            <FX text={job.role} mode="type" play={play} delay={stagger(1)} />
          </span>
          <span className="where">
            <FX text={job.where} mode="type" play={play} delay={stagger(1)} />
          </span>
        </p>
        <p className="summary">
          <FX text={job.summary} mode="type" play={play} delay={stagger(2)} />
        </p>
        <ul className="points">
          {job.points.map((point, i) => (
            <li key={point}>
              <span className="gt" aria-hidden="true">
                &gt;
              </span>
              <span>
                <FX text={point} mode="type" play={play} delay={stagger(i + 3)} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="sec">
      <Divider variant="plain" />
      <SectionTitle text="experience" />
      <ol className="log">
        {jobs.map((job) => (
          <Entry key={job.id} job={job} />
        ))}
      </ol>
    </section>
  );
}
