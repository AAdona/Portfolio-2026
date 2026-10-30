const linkClass =
  "underline decoration-line underline-offset-4 transition-colors hover:decoration-fg";

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-3xl px-6 pb-20 pt-12 md:pt-20">
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Adrian Hero Adona</h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">
        Frontend and WordPress developer based in Manila, Philippines. I build custom themes,
        plugins and interfaces with PHP, JavaScript and TypeScript.
      </p>
      <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <a href="mailto:adrianheroadona@gmail.com" className={linkClass}>
          Email
        </a>
        <a href="https://github.com/AAdona" target="_blank" rel="noreferrer" className={linkClass}>
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/ahadona"
          target="_blank"
          rel="noreferrer"
          className={linkClass}
        >
          LinkedIn
        </a>
        <a href="/CV-ADONA.pdf" download className={linkClass}>
          Resume
        </a>
      </p>
    </section>
  );
}
