import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedProjects from "./components/FeaturedProjects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import { ArrowUp } from "lucide-react";

export default function App() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("hasLoaded") !== "true";
    }
    return true;
  });
  const [showScrollTop, setShowScrollTop] = useState(false);

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
          <LoadingScreen key="loader" onComplete={() => {
            setIsLoading(false);
            sessionStorage.setItem("hasLoaded", "true");
          }} />
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
              onViewWork={() => scrollToSection("work")} 
              onContactMe={() => scrollToSection("contact")} 
            />
            <Experience />
            <FeaturedProjects />
            <Contact />
          </main>

          {/* Simple, Human-Readable-Design Footer */}
          <footer className="bg-black border-t border-white/10 py-12 px-6 relative z-10 text-center text-xs text-zinc-500 font-sans">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <span>&copy; {new Date().getFullYear()} Adrian Hero Adona. All rights reserved.</span>
              <span className="text-[10px] tracking-wider uppercase text-zinc-650">Portfolio 2026</span>
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
      <SpeedInsights />
    </>
  );
}
