import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  const navLinks = [
    { id: "hero", label: "Home" },
    { id: "experience", label: "Experience" },
    { id: "work", label: "Work" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Scrolled state
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Detect active section
      for (const section of navLinks) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If section covers top-to-middle of screen
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div 
        id="scroll-progress-indicator"
        className="fixed top-0 left-0 right-0 h-[2px] bg-zinc-900 z-50 pointer-events-none"
      >
        <div 
          className="h-full bg-white transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Primary Sticky Header */}
      <header
        id="site-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? "bg-[#050505]/95 backdrop-blur-md border-b border-white/10 py-4" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Personal Mark */}
          <button
            onClick={() => scrollTo("hero")}
            data-cursor="pointer"
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <span className="w-8 h-8 rounded-none bg-white flex items-center justify-center font-serif font-normal italic text-black text-lg transition-transform group-hover:scale-105">
              p
            </span>
            <div>
              <span className="font-sans font-medium text-xs tracking-[0.2em] block text-white">
                PORTFOLIO
              </span>
              <span className="text-[9px] font-mono text-zinc-500 block uppercase tracking-widest leading-none">
                BUILD_SYS.V2
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center bg-[#0c0c0c] border border-white/10 p-1 rounded-none backdrop-blur-md">
            {navLinks.map((link) => {
              const active = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  data-cursor="pointer"
                  className={`px-4 py-1.5 rounded-none text-[10px] font-mono tracking-widest transition-all uppercase ${
                    active 
                      ? "bg-white text-black font-semibold" 
                      : "text-zinc-500 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Header Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => scrollTo("contact")}
              data-cursor="pointer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-none bg-[#0c0c0c] hover:bg-white hover:text-black text-[10px] font-mono tracking-[0.2em] text-white border border-white/10 hover:border-white transition-all duration-300"
            >
              HIRE_ME <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 z-35 lg:hidden bg-[#050505]/98 backdrop-blur-xl border-b border-white/10 p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.2em] block border-b border-white/10 pb-2">
                NAV_INDEX
              </span>
              <nav className="flex flex-col gap-3">
                {navLinks.map((link, idx) => {
                  const active = activeSection === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => scrollTo(link.id)}
                      className={`text-left text-2xl font-serif font-light tracking-tight uppercase flex items-baseline gap-4 transition-all ${
                        active ? "text-white italic translate-x-2" : "text-zinc-600 hover:text-zinc-200"
                      }`}
                    >
                      <span className="text-xs font-mono text-zinc-700">0{idx + 1}.</span>
                      {link.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="border-t border-white/10 mt-8 pt-6 flex flex-col gap-4">
              <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                SOCIALS // NETWORK
              </span>
              <div className="flex gap-4">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2.5 bg-black/40 border border-white/10 rounded-none text-zinc-400 hover:text-white hover:border-white transition"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2.5 bg-black/40 border border-white/10 rounded-none text-zinc-400 hover:text-white hover:border-white transition"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="mailto:keepcalm0023@gmail.com" 
                  className="p-2.5 bg-black/40 border border-white/10 rounded-none text-zinc-400 hover:text-white hover:border-white transition"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
