const groups = [
  { label: "Languages", items: "PHP, JavaScript, TypeScript, HTML, CSS, SCSS" },
  { label: "Platforms and libraries", items: "WordPress, ACF Pro, React, Tailwind CSS, GSAP" },
  { label: "Tools", items: "Git, Vercel, Figma, Adobe XD" },
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-3xl border-t border-line px-6 py-16">
      <h2 className="mb-10 text-2xl font-semibold tracking-tight">Skills</h2>
      <dl className="space-y-4">
        {groups.map((group) => (
          <div key={group.label} className="grid gap-1 md:grid-cols-[11rem_1fr] md:gap-8">
            <dt className="text-sm text-muted">{group.label}</dt>
            <dd className="text-body">{group.items}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
