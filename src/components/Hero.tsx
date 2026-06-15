import { motion } from "motion/react";
import { ArrowDown, Code2, Cpu, Grid, Sparkles } from "lucide-react";

interface HeroProps {
  onViewWork: () => void;
  onContactMe: () => void;
}

export default function Hero({ onViewWork, onContactMe }: HeroProps) {
  // Stagger wrapper for initial page load entry
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-brand-dark pt-24 px-6"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none mask-radial" />
      <div className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-orange-600/5 blur-[120px] pointer-events-none mask-radial" />

      {/* Hero content blocks */}
      <motion.div 
        variants={containerVars}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
      >
        {/* Left column: Text Content */}
        <div className="lg:col-span-7 text-left space-y-6">
          {/* Heading */}
          <div className="space-y-4">
            <motion.p 
              variants={itemVars}
              className="text-xs md:text-sm font-sans text-zinc-400 font-semibold tracking-wider uppercase block"
            >
              Frontend Developer
            </motion.p>
            <motion.h1 
              variants={itemVars}
              className="text-4xl md:text-6xl xl:text-7xl font-sans font-light tracking-tight text-white leading-[1.05] uppercase"
            >
              Adrian <br />
              <span className="font-serif italic font-normal text-zinc-300">Hero</span> <br />
              <span className="font-sans font-semibold tracking-tight text-white">
                Adona.
              </span>
            </motion.h1>
          </div>
 
          {/* Subtext */}
          <motion.p 
            variants={itemVars}
            className="text-base md:text-lg text-zinc-350 max-w-xl font-sans font-normal leading-relaxed"
          >
            Building modern, high-performance websites with WordPress, custom CMS solutions, and engaging web interactions.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVars}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button
              onClick={onViewWork}
              data-cursor="view_work"
              className="px-10 py-4.5 bg-white text-black hover:bg-white/90 rounded-none font-mono font-bold text-xs md:text-sm uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer"
            >
              View Work
            </button>
            <button
              onClick={onContactMe}
              data-cursor="contact_now"
              className="px-10 py-4.5 bg-transparent hover:bg-white/5 border border-white/15 hover:border-white/30 text-white rounded-none font-mono text-xs md:text-sm uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer"
            >
              Contact Me
            </button>
          </motion.div>
        </div>

        {/* Right column: Interactive Visual Showcase */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
          className="lg:col-span-5 relative flex justify-center items-center"
        >
          {/* Custom Wireframe Bento Node Box */}
          <div className="w-full max-w-[420px] rounded-none bg-[#0c0c0c] border border-white/10 p-6 space-y-6 relative group overflow-hidden shadow-2xl shadow-black/80">
            {/* Glossy visual glow banner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none group-hover:bg-white/10 transition-all duration-500" />
            
            {/* Header tab */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-sans text-zinc-300 font-semibold tracking-wider uppercase">Active Stack</span>
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-zinc-800" />
                <span className="w-2 h-2 rounded-full bg-zinc-800 animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-white" />
              </div>
            </div>

            {/* Key Skills Node Grid */}
            <div className="space-y-4">
              {/* React Node block */}
              <div className="p-4 bg-black/40 border border-white/5 rounded-none space-y-2 relative hover:border-white/20 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-white" />
                    <span className="text-sm font-sans text-zinc-200 font-bold">React Frontend</span>
                  </div>
                  <span className="font-sans text-xs tracking-wider text-zinc-400 font-medium">Interactive</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-xs font-sans bg-black px-2.5 py-1 rounded-none text-zinc-300 border border-white/10">Vite</span>
                  <span className="text-xs font-sans bg-black px-2.5 py-1 rounded-none text-zinc-300 border border-white/10">TypeScript</span>
                  <span className="text-xs font-sans bg-black px-2.5 py-1 rounded-none text-zinc-300 border border-white/10">Tailwind CSS</span>
                </div>
              </div>

              {/* WordPress Node block */}
              <div className="p-4 bg-black/40 border border-white/5 rounded-none space-y-2 relative hover:border-white/20 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-zinc-400" />
                    <span className="text-sm font-sans text-zinc-200 font-bold">WordPress CMS</span>
                  </div>
                  <span className="font-sans text-xs text-zinc-400 tracking-wider font-medium">Custom Builds</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-xs font-sans bg-black px-2.5 py-1 rounded-none text-zinc-300 border border-white/10">Custom Themes</span>
                  <span className="text-xs font-sans bg-black px-2.5 py-1 rounded-none text-zinc-300 border border-white/10">ACF Pro</span>
                  <span className="text-xs font-sans bg-black px-2.5 py-1 rounded-none text-zinc-300 border border-white/10">REST API</span>
                </div>
              </div>

              {/* Performance Node */}
              <div className="p-4 bg-black/40 border border-white/5 rounded-none flex items-center justify-between relative hover:border-white/20 transition-all">
                <div className="flex items-center gap-2">
                  <Grid className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm font-sans text-zinc-200 font-bold">Lighthouse Score</span>
                </div>
                <div className="flex items-center gap-2 font-sans">
                  <div className="h-1 w-12 bg-zinc-900 rounded-none overflow-hidden border border-white/5">
                    <div className="h-full bg-white w-[98%]" />
                  </div>
                  <span className="text-sm font-bold text-white">98%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Promping scroll bottom label */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-400 hover:text-white transition duration-300 font-mono select-none">
        <span className="text-xs tracking-[0.25em] uppercase font-semibold">Scroll_to_discover</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown className="w-4 h-4 text-white" />
        </motion.div>
      </div>
    </section>
  );
}
