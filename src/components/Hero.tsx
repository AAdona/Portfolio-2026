import { motion } from "motion/react";
import { ArrowDown, Code2, Cpu, Grid, Sparkles } from "lucide-react";

interface HeroProps {
  onViewProjects: () => void;
  onContactMe: () => void;
}

export default function Hero({ onViewProjects, onContactMe }: HeroProps) {
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
          {/* Badge */}
          <motion.div 
            variants={itemVars}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0c0c0c] border border-white/10 rounded-none text-[10px] font-mono tracking-widest text-white/75 uppercase"
          >
            <Sparkles className="w-3 h-3 text-white/50" />
            <span>AVAILABLE_FOR_CONTRACTS_2026</span>
          </motion.div>

          {/* Heading */}
          <div className="space-y-2">
            <motion.p 
              variants={itemVars}
              className="text-[10px] font-mono text-zinc-500 tracking-[0.25em] uppercase block"
            >
              // FRONTEND DEVELOPER
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
            className="text-sm md:text-base text-zinc-400 max-w-xl font-sans font-normal leading-relaxed"
          >
            Building modern, high-performance websites with WordPress, custom CMS solutions, and engaging web interactions.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVars}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button
              onClick={onViewProjects}
              data-cursor="view_projects"
              className="px-8 py-4 bg-white text-black hover:bg-white/90 rounded-none font-mono font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer"
            >
              View Projects
            </button>
            <button
              onClick={onContactMe}
              data-cursor="contact_now"
              className="px-8 py-4 bg-transparent hover:bg-white/5 border border-white/15 hover:border-white/30 text-white rounded-none font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer"
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
              <span className="text-[9px] font-mono text-zinc-400 tracking-[0.2em] uppercase">TECH_NODE_MONITOR //</span>
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
                    <span className="text-xs font-mono text-zinc-300 font-bold">REACT_FRONTEND</span>
                  </div>
                  <span className="font-mono text-[9px] tracking-wider text-zinc-500">INTERACTIVE</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[9px] font-mono bg-black/60 px-2 py-0.5 rounded-none text-zinc-400 border border-white/5">Vite</span>
                  <span className="text-[9px] font-mono bg-black/60 px-2 py-0.5 rounded-none text-zinc-400 border border-white/5">TypeScript</span>
                  <span className="text-[9px] font-mono bg-black/60 px-2 py-0.5 rounded-none text-zinc-400 border border-white/5">TailwindCss</span>
                </div>
                {/* Simulated activity pulses */}
                <div className="absolute right-3 bottom-3 w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              {/* WordPress Node block */}
              <div className="p-4 bg-black/40 border border-white/5 rounded-none space-y-2 relative hover:border-white/20 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-zinc-400" />
                    <span className="text-xs font-mono text-zinc-300 font-bold">WORDPRESS_CMS</span>
                  </div>
                  <span className="font-mono text-[9px] text-zinc-500 tracking-wider">CUSTOM_BUILDS</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[9px] font-mono bg-black/60 px-2 py-0.5 rounded-none text-zinc-400 border border-white/5">Custom_Themes</span>
                  <span className="text-[9px] font-mono bg-black/60 px-2 py-0.5 rounded-none text-zinc-400 border border-white/5">ACF_Pro</span>
                  <span className="text-[9px] font-mono bg-black/60 px-2 py-0.5 rounded-none text-zinc-400 border border-white/5">REST_API</span>
                </div>
                <div className="absolute right-3 bottom-3 w-1.5 h-1.5 rounded-full bg-zinc-600 animate-ping" />
              </div>

              {/* Performance Node */}
              <div className="p-4 bg-black/40 border border-white/5 rounded-none flex items-center justify-between relative hover:border-white/20 transition-all">
                <div className="flex items-center gap-2">
                  <Grid className="w-4 h-4 text-zinc-400" />
                  <span className="text-xs font-mono text-zinc-300 font-bold">LIGHTHOUSE_SCORE</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <div className="h-1 w-12 bg-zinc-900 rounded-none overflow-hidden border border-white/5">
                    <div className="h-full bg-white w-[98%]" />
                  </div>
                  <span className="text-xs font-bold text-white">98%</span>
                </div>
              </div>
            </div>

            {/* Simulated file path footer */}
            <div className="flex items-center justify-between text-[9px] font-mono text-zinc-600 border-t border-white/10 pt-3">
              <span>ROOT/PORTFOLIO/ENGINE.SH</span>
              <span>RUN_OK</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Promping scroll bottom label */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-500 hover:text-white transition duration-300 font-mono select-none">
        <span className="text-[10px] tracking-[0.25em] uppercase">Scroll_to_discover</span>
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
