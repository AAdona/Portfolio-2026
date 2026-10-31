import { createContext, ReactNode, useCallback, useContext, useLayoutEffect, useMemo, useState } from "react";
import { safeGet, safeSet } from "./storage";

interface MotionContext {
  motionOn: boolean;
  toggle: () => void;
}

const Ctx = createContext<MotionContext>({ motionOn: true, toggle: () => {} });

// A stored choice wins. Otherwise follow the operating system setting.
export function readInitialMotion(): boolean {
  const stored = safeGet("local", "motion");
  if (stored === "on") return true;
  if (stored === "off") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const [motionOn, setMotionOn] = useState(readInitialMotion);

  useLayoutEffect(() => {
    document.documentElement.dataset.motion = motionOn ? "on" : "off";
  }, [motionOn]);

  const toggle = useCallback(() => {
    setMotionOn((current) => {
      const next = !current;
      safeSet("local", "motion", next ? "on" : "off");
      return next;
    });
  }, []);

  const value = useMemo(() => ({ motionOn, toggle }), [motionOn, toggle]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useMotion = () => useContext(Ctx);
