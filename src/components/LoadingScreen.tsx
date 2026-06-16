import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface LoadingScreenProps {
  onComplete: () => void;
  key?: string;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);

  const stages = [
    "INITIALIZING_WORKSPACE",
    "CUSTOM_WORDPRESS_ENGINE",
    "INTERACTIVE_ANIMATION_LAYERS",
    "OPTIMIZING_LIGHTHOUSE_SCORE",
    "LAUNCHING_PORTFOLIO"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        const increment = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress > stageIndex * 20 && stageIndex < stages.length - 1) {
      setStageIndex((prev) => prev + 1);
    }
  }, [progress, stageIndex]);

  return (
    <motion.div
      id="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100%", 
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-brand-dark p-8 md:p-16 select-none"
    >
      {/* Background grids */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      {/* Decorative top-most indicator */}
      <div className="flex items-center justify-between text-xs font-mono tracking-widest text-brand-text-muted">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-ping" />
          ADONA_PORTFOLIO_V2.0
        </span>
        <span>SYS_STATUS: ACTIVE</span>
      </div>

      {/* Centerpiece typography */}
      <div className="my-auto max-w-4xl">
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[10px] font-mono text-white/50 tracking-[0.3em] uppercase mb-4"
          >
            {stages[stageIndex]}
          </motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 150 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-7xl font-serif font-normal tracking-tight text-white uppercase leading-[1.1]"
          >
            Crafting Digital<br />
            <span className="text-zinc-500 font-serif italic font-light lowercase">masterpieces.</span>
          </motion.h1>
        </div>
      </div>

      {/* Progress alignment */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-t border-zinc-800/60 pt-8 font-mono">
        <div className="max-w-xs text-xs text-brand-text-muted leading-relaxed">
          Pixel-perfect frontend development paired with custom enterprise CMS solutions. 
        </div>
        
        {/* Progress block */}
        <div className="flex items-baseline gap-2 self-end">
          <span className="text-sm text-brand-orange">LST_</span>
          <span className="text-7xl md:text-9xl font-extrabold font-sans text-brand-beige leading-none select-all">
            {String(progress).padStart(3, "0")}
          </span>
          <span className="text-2xl font-bold font-sans text-brand-text-muted">%</span>
        </div>
      </div>

      {/* Bottom sliding meter */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-brand-orange transition-all duration-100" style={{ width: `${progress}%` }} />
    </motion.div>
  );
}
