const links = [
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-8">
      <a href="#top" className="whitespace-nowrap font-medium">
        Adrian Hero Adona
      </a>
      <nav className="flex gap-4 text-sm text-muted sm:gap-6">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="transition-colors hover:text-fg">
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
