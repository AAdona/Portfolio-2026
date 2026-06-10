import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hoveredType, setHoveredType] = useState<string | null>(null);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 30, stiffness: 450, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("[data-cursor]");
      if (interactive) {
        const cursorVal = interactive.getAttribute("data-cursor");
        setHoveredType(cursorVal);
      } else {
        setHoveredType(null);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, visible]);

  if (!visible) return null;

  return (
    <>
      {/* Outer Glow Follower */}
      <motion.div
        id="custom-cursor-glow"
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-brand-orange/40 pointer-events-none z-50 mix-blend-screen hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: hoveredType ? 2.5 : 1,
          backgroundColor: hoveredType === "pointer" ? "rgba(255, 95, 56, 0.15)" : "transparent",
          borderColor: hoveredType ? "#ff5f38" : "rgba(255, 95, 56, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Inner Dot */}
      <motion.div
        id="custom-cursor-dot"
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-brand-orange pointer-events-none z-50 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          scale: hoveredType ? 0 : 1,
        }}
      />

      {/* Text Indicator when hovering project or specific cta */}
      {hoveredType && hoveredType !== "pointer" && (
        <motion.div
          id="custom-cursor-label"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className="fixed top-0 left-0 px-2 py-1 bg-brand-orange text-brand-dark text-[10px] font-mono font-black tracking-widest rounded uppercase pointer-events-none z-55 -translate-x-1/2 translate-y-4 hidden md:block"
          style={{
            x: cursorX,
            y: cursorY,
          }}
        >
          {hoveredType}
        </motion.div>
      )}
    </>
  );
}
