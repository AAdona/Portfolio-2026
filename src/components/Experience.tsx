const jobs = [
  {
    company: "Upward Next Inc.",
    role: "Frontend Engineer",
    period: "Mar 2022 to Nov 2025",
    location: "Makati City",
    summary: "Built and maintained WordPress sites and custom CMS platforms for Japanese clients.",
    points: [
      "Built custom WordPress themes and plugins for more than 10 live client sites, and cut page load times through asset optimization and lazy loading.",
      "Led frontend architecture decisions on CMS platforms, working with Japanese managers and UI designers.",
      "Built responsive, cross-browser layouts from Figma and XD designs using HTML, CSS/SCSS, JavaScript and TypeScript.",
      "Tested on iOS, Android, Chrome, Safari and Firefox before every client deployment.",
      "Used Git feature branches alongside the backend and design teams.",
    ],
  },
  {
    company: "Freelance",
    role: "Full stack CMS and frontend developer",
    period: "2021 to present",
    location: "Remote",
    summary: "Small web projects, prototype to responsive layout conversions, and custom database platforms.",
    points: [
      "Build client websites from scratch with HTML, CSS, JavaScript, PHP and modern frameworks.",
      "Build custom WordPress themes using ACF Pro and custom fields.",
      "Run Lighthouse audits, compress assets and tune mobile responsiveness.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-3xl border-t border-line px-6 py-16">
      <h2 className="mb-10 text-2xl font-semibold tracking-tight">Experience</h2>
      <ol className="space-y-14">
        {jobs.map((job) => (
          <li key={job.company} className="grid gap-2 md:grid-cols-[11rem_1fr] md:gap-8">
            <p className="text-sm text-muted">{job.period}</p>
            <div>
              <h3 className="font-medium">
                {job.role}, {job.company}
              </h3>
              <p className="mt-1 text-sm text-muted">{job.location}</p>
              <p className="mt-4 text-body">{job.summary}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-body marker:text-muted">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
