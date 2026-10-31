import { useRef } from "react";
import { useInView } from "../hooks/useInView";
import FX from "./FX";

interface Props {
  text: string;
  level?: 2 | 3;
}

// "## experience". The words scramble into place once, when 20% is visible.
export default function SectionTitle({ text, level = 2 }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const seen = useInView(ref, { threshold: 0.2 });
  const Tag = level === 2 ? "h2" : "h3";

  return (
    <Tag ref={ref} className={level === 2 ? "h2" : "h3"}>
      <span className="hash" aria-hidden="true">
        {level === 2 ? "##" : "###"}
      </span>
      <FX text={text} mode="scramble" play={seen} range={[250, 500]} />
    </Tag>
  );
}
