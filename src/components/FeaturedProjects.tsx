import { Project } from "../types";

const clientWork: Project[] = [
  {
    title: "My Home",
    url: "https://www.myhome-co.com/",
    year: "2024",
    description:
      "Custom WordPress theme for a real estate site, with regional property search built on ACF Pro.",
    tags: ["WordPress", "PUG", "CSS/SCSS", "TypeScript", "Git"],
    image: "/images/myhome.png",
    alt: "Screenshot of the My Home website",
  },
  {
    title: "Aidec Plus",
    url: "https://aidecplus.com/",
    year: "2023",
    description:
      "Furniture design and manufacturing site on a custom WordPress block theme, with lazy-loaded product images.",
    tags: ["WordPress", "Block theme", "CSS/SCSS", "PUG", "TypeScript", "Git"],
    image: "/images/aidec.png",
    alt: "Screenshot of the Aidec Plus website",
  },
  {
    title: "PTRUCK",
    url: "https://www.ptruck.co.jp/",
    year: "2023",
    description:
      "Vehicle fleet database site on WordPress, with custom query filters for searching the inventory.",
    tags: ["WordPress", "Custom queries", "CSS/SCSS"],
    image: "/images/ptruck.png",
    alt: "Screenshot of the PTRUCK website",
  },
];

const personal: Project[] = [
  {
    title: "adi-convert",
    url: "https://adi-convert.vercel.app/",
    year: "2026",
    description:
      "Image converter and compressor that runs in the browser, using a custom canvas engine to keep file sizes small.",
    tags: ["React", "Tailwind", "Canvas API", "Web Workers", "Vite", "Vercel"],
    image: "/images/adi-convert.png",
    alt: "Screenshot of adi-convert",
  },
];

function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="grid gap-6 md:grid-cols-2 md:gap-8">
      <a href={project.url} target="_blank" rel="noreferrer" className="block">
        <img
          src={project.image}
          alt={project.alt}
          loading="lazy"
          className="aspect-[16/10] w-full rounded border border-line object-cover object-top"
        />
      </a>
      <div>
        <h4 className="font-medium">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-line underline-offset-4 transition-colors hover:decoration-fg"
          >
            {project.title}
          </a>
          <span className="ml-3 text-sm font-normal text-muted">{project.year}</span>
        </h4>
        <p className="mt-3 text-body">{project.description}</p>
        <p className="mt-4 text-sm text-muted">{project.tags.join(", ")}</p>
      </div>
    </article>
  );
}

function Group({ title, projects }: { title: string; projects: Project[] }) {
  return (
    <div>
      <h3 className="mb-6 text-sm text-muted">{title}</h3>
      <div className="space-y-12">
        {projects.map((project) => (
          <ProjectRow key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  return (
    <section id="work" className="mx-auto max-w-3xl border-t border-line px-6 py-16">
      <h2 className="mb-10 text-2xl font-semibold tracking-tight">Projects</h2>
      <div className="space-y-16">
        <Group title="Client work" projects={clientWork} />
        <Group title="Personal" projects={personal} />
      </div>
    </section>
  );
}
