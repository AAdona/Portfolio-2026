import { client, personal } from "../content";
import Divider from "./Divider";
import ProjectFrame from "./ProjectFrame";
import SectionTitle from "./SectionTitle";

// Order: adi-convert first (newest), then client work. Frames alternate between
// full width and 8 of 12 columns so the list does not read as a uniform grid.
export default function Projects() {
  return (
    <section id="projects" className="sec">
      <Divider variant="ticks" />
      <SectionTitle text="projects" />

      <SectionTitle text="personal" level={3} />
      {personal.map((p, i) => (
        <ProjectFrame key={p.title} project={p} wide={i % 2 === 0} />
      ))}

      <SectionTitle text="client work" level={3} />
      {client.map((p, i) => (
        <ProjectFrame key={p.title} project={p} wide={(i + personal.length) % 2 === 0} />
      ))}
    </section>
  );
}
