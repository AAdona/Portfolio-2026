// All copy lives here. Same wording as before, only restyled.

export const tagline =
  "Frontend and WordPress developer based in Manila, Philippines. I build custom themes, plugins and interfaces with PHP, JavaScript and TypeScript.";

export const heroLinks = [
  { label: "email", href: "mailto:adrianheroadona@gmail.com", external: false },
  { label: "github", href: "https://github.com/AAdona", external: true },
  { label: "linkedin", href: "https://linkedin.com/in/ahadona", external: true },
  { label: "resume", href: "/CV-ADONA.pdf", external: true, download: true },
];

export interface Job {
  id: string;
  period: string;
  periodSpoken: string;
  current: boolean;
  role: string;
  where: string;
  summary: string;
  points: string[];
}

export const jobs: Job[] = [
  {
    id: "upward-next",
    period: "2022-03 → 2025-11",
    periodSpoken: "March 2022 to November 2025",
    current: false,
    role: "Frontend Engineer, Upward Next Inc.",
    where: "Makati City",
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
    id: "freelance",
    period: "2021 → now",
    periodSpoken: "2021 to present",
    current: true,
    role: "Full stack CMS and frontend developer",
    where: "Remote, Freelance",
    summary: "Small web projects, prototype to responsive layout conversions, and custom database platforms.",
    points: [
      "Build client websites from scratch with HTML, CSS, JavaScript, PHP and modern frameworks.",
      "Build custom WordPress themes using ACF Pro and custom fields.",
      "Run Lighthouse audits, compress assets and tune mobile responsiveness.",
    ],
  },
];

export interface Project {
  title: string;
  url: string;
  year: string;
  description: string;
  tags: string[];
  image: string;
  width: number;
  height: number;
  alt: string;
}

export const personal: Project[] = [
  {
    title: "adi-convert",
    url: "https://adi-convert.vercel.app/",
    year: "2026",
    description:
      "Image converter and compressor that runs in the browser, using a custom canvas engine to keep file sizes small.",
    tags: ["React", "Tailwind", "Canvas API", "Web Workers", "Vite", "Vercel"],
    image: "/images/adi-convert.webp",
    width: 1348,
    height: 782,
    alt: "Screenshot of adi-convert, with a drop area for images",
  },
];

export const client: Project[] = [
  {
    title: "My Home",
    url: "https://www.myhome-co.com/",
    year: "2024",
    description: "Custom WordPress theme for a real estate site, with regional property search built on ACF Pro.",
    tags: ["WordPress", "PUG", "CSS/SCSS", "TypeScript", "Git"],
    image: "/images/myhome.webp",
    width: 1400,
    height: 681,
    alt: "Screenshot of the My Home website",
  },
  {
    title: "Aidec Plus",
    url: "https://aidecplus.com/",
    year: "2023",
    description:
      "Furniture design and manufacturing site on a custom WordPress block theme, with lazy-loaded product images.",
    tags: ["WordPress", "Block theme", "CSS/SCSS", "PUG", "TypeScript", "Git"],
    image: "/images/aidec.webp",
    width: 1400,
    height: 694,
    alt: "Screenshot of the Aidec Plus website",
  },
  {
    title: "PTRUCK",
    url: "https://www.ptruck.co.jp/",
    year: "2023",
    description: "Vehicle fleet database site on WordPress, with custom query filters for searching the inventory.",
    tags: ["WordPress", "Custom queries", "CSS/SCSS"],
    image: "/images/ptruck.webp",
    width: 1400,
    height: 691,
    alt: "Screenshot of the PTRUCK website",
  },
];

export const skillTree = {
  root: "skills/",
  groups: [
    { name: "languages/", items: ["PHP", "JavaScript", "TypeScript, HTML, CSS, SCSS"] },
    { name: "platforms/", items: ["WordPress, ACF Pro, React, Tailwind CSS, GSAP"] },
    { name: "tools/", items: ["Git, Vercel, Figma, Adobe XD"] },
  ],
};

export const contact = {
  email: "adrianheroadona@gmail.com",
  linkedin: "https://linkedin.com/in/ahadona",
  formId: "mpqebzzd",
};
