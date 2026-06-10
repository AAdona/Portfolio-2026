import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedProjects from "./components/FeaturedProjects";
import Contact from "./components/Contact";
import { ArrowUp, Clock, Github, Linkedin, Mail } from "lucide-react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Synchronize to environment time: 2026-06-10T04:16:35Z
    const parsedDate = new Date("2026-06-10T04:16:35Z");
    
    const updateTime = () => {
      // Advance by one second of local running runtime
      parsedDate.setSeconds(parsedDate.getSeconds() + 1);
      setCurrentTime(
        parsedDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "UTC"
        }) + " UTC"
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // Sticky header offset height
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
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen bg-[#050505] overflow-hidden flex flex-col justify-between"
        >
          {/* Custom Follower Cursor */}
          <CustomCursor />

          {/* Sticky glassmorphism header */}
          <Navbar />

          {/* Core content sections */}
          <main className="flex-grow">
            <Hero 
              onViewProjects={() => scrollToSection("projects")} 
              onContactMe={() => scrollToSection("contact")} 
            />
            <FeaturedProjects />
            <Contact />
          </main>

          {/* Premium Agency Footer */}
          <footer className="bg-black border-t border-white/10 py-16 px-6 relative z-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
              
              {/* Mark branding (Cols 1 to 4) */}
              <div className="md:col-span-4 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-none bg-white flex items-center justify-center font-mono font-bold text-black text-xs">
                    P
                  </span>
                  <span className="font-sans font-medium text-xs tracking-[0.25em] uppercase text-white">
                    PERSONAL_PORTFOLIO
                  </span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed max-w-sm font-sans">
                  Designing secure architectural WordPress plugins, low-asset responsive frontend components, and lightweight custom visual animation timelines. Reach out for collaborations.
                </p>
                
                {/* Active Clock widget */}
                <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500">
                  <Clock className="w-3.5 h-3.5 text-white animate-pulse" />
                  <span>SYS_TIME: {currentTime}</span>
                </div>
              </div>

              {/* Sitemap Links (Cols 5 to 8) */}
              <div className="md:col-span-4 space-y-4">
                <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest leading-none">
                  SITEMAP_INDEX //
                </h4>
                <ul className="space-y-2.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                  <li>
                    <button onClick={() => scrollToSection("hero")} data-cursor="pointer" className="hover:text-white transition-colors">
                      [01] HOME
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToSection("projects")} data-cursor="pointer" className="hover:text-white transition-colors">
                      [02] PROJECTS
                    </button>
                  </li>
                  <li>
                    <button onClick={() => scrollToSection("contact")} data-cursor="pointer" className="hover:text-white transition-colors">
                      [03] CONTACT &amp; DOSSIER
                    </button>
                  </li>
                </ul>
              </div>

              {/* Contacts/Footer CTAs (Cols 9 to 12) */}
              <div className="md:col-span-4 space-y-4">
                <h4 className="text-[10px] font-mono text-zinc-450 uppercase tracking-widest leading-none">
                  CONNECTED_NETWORKS //
                </h4>
                <p className="text-xs text-zinc-500 leading-relaxed font-sans max-w-sm font-light">
                  Available for contracts worldwide. High quality, custom frameworks matching Figma standards.
                </p>
                <div className="flex gap-2">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noreferrer"
                    data-cursor="pointer"
                    className="p-2.5 bg-black border border-white/10 rounded-none hover:border-white text-zinc-500 hover:text-white transition-all"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noreferrer"
                    data-cursor="pointer"
                    className="p-2.5 bg-black border border-white/10 rounded-none hover:border-white text-zinc-500 hover:text-white transition-all"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                  <a 
                    href="mailto:keepcalm0023@gmail.com" 
                    data-cursor="pointer" 
                    className="p-2.5 bg-black border border-white/10 rounded-none hover:border-white text-zinc-500 hover:text-white transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

            {/* Copyright stamp */}
            <div className="max-w-7xl mx-auto pt-8 mt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[9px] text-zinc-650 uppercase">
              <span>&copy; {new Date().getFullYear()} PORTFOLIO_BUILDER. ALL RIGHTS RESERVED.</span>
              <span>EST_STABLE_VERSION // SECURE_SOCKET</span>
            </div>
          </footer>

          {/* Scroll to Top floating widget */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                data-cursor="pointer"
                className="fixed bottom-6 right-6 z-40 p-3 bg-black border border-white text-white rounded-none shadow-lg hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
              </motion.button>
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </>
  );
}
